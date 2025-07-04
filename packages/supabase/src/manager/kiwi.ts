import { SupabaseClient } from "@supabase/supabase-js";

import { Epub, Kiwi } from "../types";
import { fileToEpubInfo } from "../utils/epubjs";

interface NewKiwi {
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

  async createKiwi(newKiwi: NewKiwi) {
    const epubData = await this.uploadEpub(newKiwi.file);
    const epubInfo = await fileToEpubInfo(newKiwi.file);

    const { locations, nav, title, author, publisher, coverImage } = epubInfo;

    const coverImagePath = coverImage
      ? (await this.uploadCoverImage(coverImage))?.path
      : null;

    const epub: Epub = await this.postEpub({
      file: epubData.path,
      locations,
      cover_image: coverImagePath,
      title,
      author,
      publisher,
      nav,
    });

    const kiwi: Kiwi = await this.postKiwi({
      name: newKiwi.name,
      description: newKiwi.description,
      detail_description: newKiwi.detailDescription,
      max_participants: newKiwi.maxParticipants,
      password: newKiwi.password,
      epub_id: epub.id,
    });

    return { kiwi, epub };
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

  private async postEpub(epub: Omit<Epub, "id">) {
    const { data, error } = await this.supabase
      .from("epubs")
      .insert(epub)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }

  private async postKiwi(kiwi: Omit<Kiwi, "id" | "created_at" | "share_code">) {
    const { data, error } = await this.supabase
      .from("kiwis")
      .insert(kiwi)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
}

export default SupabaseKiwi;
