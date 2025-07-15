import { SupabaseClient } from "@supabase/supabase-js";

import { NewKiwi, MyKiwi } from "../types";
import {
  extractFilePathFromUrl,
  fileToEpubInfo,
  generateUniqueFileName,
} from "../utils";

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

  async createSampleKiwi(userId: string): Promise<void> {
    const { error } = await this.supabase.rpc("create_sample_kiwi", {
      p_user_id: userId,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async deleteKiwi(kiwiId: string): Promise<void> {
    // 키위 삭제와 epub 정리를 안전하게 처리하는 함수 호출
    const { data, error } = await this.supabase.rpc(
      "delete_kiwi_with_cleanup",
      {
        p_kiwi_id: kiwiId,
      },
    );

    if (error) {
      throw new Error(error.message);
    }

    if (!data || !data.success) {
      throw new Error("키위 삭제에 실패했습니다.");
    }

    // epub이 삭제되었다면 관련 파일들도 삭제
    if (data.deleted_epub) {
      try {
        // epub 파일 삭제
        if (data.epub_file_url) {
          const epubPath = extractFilePathFromUrl(data.epub_file_url, "epub");
          if (epubPath) {
            await this.deleteEpub(epubPath);
          }
        }

        // cover image 파일 삭제
        if (data.cover_image_url) {
          const coverImagePath = extractFilePathFromUrl(
            data.cover_image_url,
            "cover",
          );
          if (coverImagePath) {
            await this.deleteCoverImage(coverImagePath);
          }
        }
      } catch (fileDeleteError) {
        console.error("파일 삭제 중 오류 발생:", fileDeleteError);
        // 파일 삭제 실패는 키위 삭제 성공을 막지 않음
      }
    }
  }

  async deleteParticipant(participantId: string): Promise<void> {
    const { error } = await this.supabase
      .from("participants")
      .delete()
      .eq("id", participantId);
    if (error) {
      throw new Error(error.message);
    }
  }

  async deleteUserKiwi(userId: string, kiwiId: string): Promise<void> {
    const { error } = await this.supabase
      .from("user_kiwis")
      .delete()
      .eq("user_id", userId)
      .eq("kiwi_id", kiwiId);
    if (error) {
      throw new Error(error.message);
    }
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
