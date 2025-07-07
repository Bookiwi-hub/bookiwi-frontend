import { SupabaseClient } from "@supabase/supabase-js";

import {
  SAMPLE_KIWI_INFO,
  sampleComments,
  sampleHighlights,
  sampleParticipants,
} from "../constants/sample";
import {
  KiwiTable,
  UserKiwiTable,
  ParticipantTable,
  HighlightTable,
  CommentTable,
} from "../types/database";
import { MyKiwi, User } from "../types/response";
import { fileToEpubInfo } from "../utils/epubjs";
import { generateUniqueFileName } from "../utils/file";

interface NewKiwi {
  userId: string;
  name: string;
  description: string;
  detailDescription: string;
  maxParticipants: number;
  password: string | null;
  file: File;
}

class SupabaseKiwi {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async createKiwi(newKiwi: NewKiwi): Promise<{ shareCode: string }> {
    const epubInfo = await fileToEpubInfo(newKiwi.file);
    const { locations, nav, title, author, publisher, coverImage } = epubInfo;
    const { url: epubUrl, path: epubPath } = await this.uploadAndGetEpubUrl(
      newKiwi.file,
    );
    const { url: coverImageUrl, path: coverImagePath } =
      await this.uploadAndGetCoverImageUrl(coverImage);

    const { data, error } = await this.supabase.rpc("create_kiwi", {
      // Required parameters
      p_epub_file: epubUrl,
      p_epub_locations: locations,
      p_kiwi_name: newKiwi.name,
      p_user_id: newKiwi.userId,
      // Optional parameters
      p_epub_cover_image: coverImageUrl,
      p_epub_title: title,
      p_epub_author: author,
      p_epub_publisher: publisher,
      p_epub_nav: nav,
      p_kiwi_description: newKiwi.description,
      p_kiwi_detail_description: newKiwi.detailDescription,
      p_kiwi_max_participants: newKiwi.maxParticipants,
      p_kiwi_password: newKiwi.password,
    });

    if (error) {
      try {
        await this.deleteEpub(epubPath);
        if (coverImagePath) {
          await this.deleteCoverImage(coverImagePath);
        }
      } catch (deleteError) {
        console.error("Error deleting files:", deleteError);
      }
      throw new Error(error.message);
    }

    const result = data[0];
    return { shareCode: result.share_code };
  }

  async getMyKiwis(userId: string): Promise<MyKiwi[]> {
    const { data, error } = await this.supabase
      .from("my_kiwis_view")
      .select(
        `
        id,
        name,
        description,
        detailDescription,
        maxParticipants,
        password,
        shareCode,
        createdAt,
        admin,
        bookMetadata,
        participants
      `,
      )
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching kiwis:", error);
      throw error;
    }

    if (!data) return [];

    return data as MyKiwi[];
  }

  async createSampleKiwi(user: User): Promise<void> {
    const createdKiwi: KiwiTable = await this.postKiwi(SAMPLE_KIWI_INFO);
    await this.postUserKiwi({
      user_id: user.id,
      kiwi_id: createdKiwi.id,
      admin: true,
      participated: false,
      is_active: true,
    });

    const participantsWithKiwiId = sampleParticipants.map((participant) => ({
      ...participant,
      kiwi_id: createdKiwi.id,
    }));
    const createdParticipants = await this.postParticipants(
      participantsWithKiwiId,
    );

    const highlightsWithIds = sampleHighlights.map((highlight, index) => ({
      ...highlight,
      kiwi_id: createdKiwi.id,
      participant_id: createdParticipants[index].id,
    }));
    const createdHighlights = await this.postHighlights(highlightsWithIds);

    const commentsWithIds = sampleComments.map((comment, index) => ({
      ...comment,
      highlight_id: createdHighlights[Math.floor(index / 2)].id, // 각 highlight당 2개의 댓글
      participant_id: createdParticipants[index % 2].id, // 교대로 참가자 할당
    }));
    await this.postComments(commentsWithIds);
  }

  private async uploadEpub(file: File) {
    const uniqueFileName = generateUniqueFileName(file.name);
    const { data, error } = await this.supabase.storage
      .from("epub")
      .upload(uniqueFileName, file);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  private async uploadCoverImage(file: File) {
    const uniqueFileName = generateUniqueFileName(file.name);
    const { data, error } = await this.supabase.storage
      .from("cover")
      .upload(uniqueFileName, file);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  private async postKiwi(
    kiwi: Omit<KiwiTable, "id" | "created_at" | "share_code">,
  ) {
    const { data, error } = await this.supabase
      .from("kiwis")
      .insert(kiwi)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }

  private async postUserKiwi(userKiwi: Omit<UserKiwiTable, "joined_at">) {
    const { data, error } = await this.supabase
      .from("user_kiwis")
      .insert(userKiwi)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }

  private async postParticipant(participant: Omit<ParticipantTable, "id">) {
    const { data, error } = await this.supabase
      .from("participants")
      .insert(participant)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }

  private async postParticipants(participants: Omit<ParticipantTable, "id">[]) {
    const { data, error } = await this.supabase
      .from("participants")
      .insert(participants)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  private async postHighlights(
    highlights: Omit<HighlightTable, "id" | "created_at" | "updated_at">[],
  ) {
    const { data, error } = await this.supabase
      .from("highlights")
      .insert(highlights)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  private async postComments(
    comments: Omit<CommentTable, "id" | "created_at" | "updated_at">[],
  ) {
    const { data, error } = await this.supabase
      .from("comments")
      .insert(comments)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  private async uploadAndGetCoverImageUrl(
    coverImage: File | null,
  ): Promise<{ url: string | null; path: string | null }> {
    if (!coverImage) {
      return { url: null, path: null };
    }
    const coverImageData = await this.uploadCoverImage(coverImage);
    const coverImagePath = coverImageData.path;

    const { data } = this.supabase.storage
      .from("cover")
      .getPublicUrl(coverImagePath);

    return { url: data.publicUrl, path: coverImagePath };
  }

  private async uploadAndGetEpubUrl(
    epub: File,
  ): Promise<{ url: string; path: string }> {
    const epubData = await this.uploadEpub(epub);
    const epubPath = epubData.path;
    const { data } = this.supabase.storage.from("epub").getPublicUrl(epubPath);
    return { url: data.publicUrl, path: epubPath };
  }

  private async deleteEpub(path: string) {
    const { error } = await this.supabase.storage.from("epub").remove([path]);
    if (error) {
      throw new Error(error.message);
    }
  }

  private async deleteCoverImage(path: string) {
    const { error } = await this.supabase.storage.from("cover").remove([path]);
    if (error) {
      throw new Error(error.message);
    }
  }
}

export default SupabaseKiwi;
