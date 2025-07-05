import { SupabaseClient } from "@supabase/supabase-js";

import { EpubTable, KiwiTable, UserKiwiTable } from "../types/database";
import { Kiwi } from "../types/response";
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

  async createKiwi(newKiwi: NewKiwi): Promise<Kiwi> {
    const epubData = await this.uploadEpub(newKiwi.file);
    const epubInfo = await fileToEpubInfo(newKiwi.file);

    const { locations, nav, title, author, publisher, coverImage } = epubInfo;

    const coverImagePath = coverImage
      ? (await this.uploadCoverImage(coverImage))?.path
      : null;

    const epub: EpubTable = await this.postEpub({
      file: epubData.path,
      locations,
      cover_image: coverImagePath,
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

    const kiwi: Kiwi = {
      id: createdKiwi.id,
      name: createdKiwi.name,
      description: createdKiwi.description,
      detailDescription: createdKiwi.detail_description,
      maxParticipants: createdKiwi.max_participants,
      password: createdKiwi.password,
      shareCode: createdKiwi.share_code,
      createdAt: createdKiwi.created_at,
      coverImage: epub.cover_image,
      bookMetadata: {
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

  // async getKiwis(userId: string): Promise<Kiwi[]> {
  //   const { data, error } = await this.supabase
  //     .from("user_kiwis")
  //     .select(
  //       `
  //       kiwis!inner(
  //         *,
  //         epubs!inner(
  //           cover_image,
  //           title,
  //           author,
  //           publisher,
  //           nav
  //         )
  //       )
  //     `,
  //     ) // 관계 테이블 join
  //     .eq("user_id", userId)
  //     .eq("is_active", true); // 필요시 active 필터링

  //   if (error) {
  //     throw new Error(error.message);
  //   }
  //   if (
  //     !data ||
  //     data.length === 0 ||
  //     !data[0] ||
  //     !data[0].kiwis ||
  //     data[0].kiwis.length === 0
  //   ) {
  //     return [];
  //   }

  //   const userKiwis = data[0].kiwis;
  //   const kiwis: Kiwi[] = userKiwis.map((userKiwi) => {
  //     const { kiwi, epubs } = userKiwi;
  //     const { cover_image: coverImage, title, author, publisher, nav } = epubs;
  //     const {
  //       id,
  //       name,
  //       description,
  //       detail_description: detailDescription,
  //       max_participants: maxParticipants,
  //       password,
  //       share_code: shareCode,
  //       created_at: createdAt,
  //       admin_id: adminId,
  //     } = kiwi;
  //     return {
  //       id,
  //       name,
  //       description,
  //       detailDescription,
  //       maxParticipants,
  //       password,
  //       shareCode,
  //       createdAt,
  //       coverImage,
  //       bookMetadata: {
  //         title,
  //         author,
  //         publisher,
  //         nav,
  //       },
  //       adminId,
  //       participants: [],
  //     };
  //   });

  //   return kiwis;
  // }

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
}

export default SupabaseKiwi;
