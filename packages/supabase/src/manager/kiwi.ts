import { SupabaseClient } from "@supabase/supabase-js";

import { EpubTable, KiwiTable, UserKiwiTable } from "../types/database";
import { MyKiwi } from "../types/response";
import { fileToEpubInfo } from "../utils/epubjs";

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

  async createKiwi(newKiwi: NewKiwi): Promise<MyKiwi> {
    const epubData = await this.uploadEpub(newKiwi.file);
    const epubInfo = await fileToEpubInfo(newKiwi.file);

    const { locations, nav, title, author, publisher, coverImage } = epubInfo;

    const coverImageUrl = await this.uploadAndGetCoverImageUrl(coverImage);

    const epub: EpubTable = await this.postEpub({
      file: epubData.path,
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

    const kiwi: MyKiwi = {
      id: createdKiwi.id,
      name: createdKiwi.name,
      description: createdKiwi.description,
      detailDescription: createdKiwi.detail_description,
      maxParticipants: createdKiwi.max_participants,
      password: createdKiwi.password,
      shareCode: createdKiwi.share_code,
      createdAt: createdKiwi.created_at,
      bookMetadata: {
        coverImage: epub.cover_image,
        title: epub.title,
        author: epub.author,
        publisher: epub.publisher,
        nav: epub.nav,
      },
      adminId: newKiwi.userId,
      participants: [],
    };

    return kiwi;
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
        adminId,
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

  private async uploadEpub(file: File) {
    const { data, error } = await this.supabase.storage
      .from("epub")
      .upload(file.name, file);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  private async uploadCoverImage(file: File) {
    const { data, error } = await this.supabase.storage
      .from("cover")
      .upload(file.name, file);
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

  private async uploadAndGetCoverImageUrl(
    coverImage: File | null,
  ): Promise<string | null> {
    if (!coverImage) return null;

    const coverImagePath = (await this.uploadCoverImage(coverImage))?.path;

    console.log(coverImagePath, "coverImagePath");

    if (!coverImagePath) return null;

    const coverImageUrl = this.supabase.storage
      .from("cover")
      .getPublicUrl(coverImagePath).data.publicUrl;

    console.log(coverImageUrl, "coverImageUrl");

    return coverImageUrl;
  }
}

export default SupabaseKiwi;
