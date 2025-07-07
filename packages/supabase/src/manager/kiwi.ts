import { SupabaseClient } from "@supabase/supabase-js";

import {
  SAMPLE_KIWI_INFO,
  sampleComments,
  sampleHighlights,
  sampleParticipants,
} from "../constants/sample";
import {
  EpubTable,
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
    const epubUrl = await this.uploadAndGetEpubUrl(newKiwi.file);
    const coverImageUrl = await this.uploadAndGetCoverImageUrl(coverImage);

    const epub: EpubTable = await this.postEpub({
      file: epubUrl,
      locations,
      cover_image: coverImageUrl,
      title,
      author,
      publisher,
      nav,
    });

    const createdKiwi: KiwiTable = await this.postKiwi({
      name: newKiwi.name,
      description: newKiwi.description,
      detail_description: newKiwi.detailDescription,
      max_participants: newKiwi.maxParticipants,
      password: newKiwi.password,
      epub_id: epub.id,
    });

    await this.postUserKiwi({
      user_id: newKiwi.userId,
      kiwi_id: createdKiwi.id,
      admin: true,
      participated: false,
      is_active: true,
    });

    return { shareCode: createdKiwi.share_code };
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

  private async postEpub(epub: Omit<EpubTable, "id">) {
    const { data, error } = await this.supabase
      .from("epubs")
      .insert(epub)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
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
  ): Promise<string | null> {
    if (!coverImage) return null;

    const coverImageData = await this.uploadCoverImage(coverImage);
    const coverImagePath = coverImageData.path;

    const { data } = this.supabase.storage
      .from("cover")
      .getPublicUrl(coverImagePath);

    return data.publicUrl;
  }

  private async uploadAndGetEpubUrl(epub: File) {
    const epubData = await this.uploadEpub(epub);
    const epubPath = epubData.path;
    const { data } = this.supabase.storage.from("epub").getPublicUrl(epubPath);
    return data.publicUrl;
  }
}

export default SupabaseKiwi;
