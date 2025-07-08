import { SupabaseClient } from "@supabase/supabase-js";

import { GetKiwiReaderResponse } from "../types/response";

class SupabaseReader {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getKiwiReader(kiwiId: string): Promise<GetKiwiReaderResponse | null> {
    const { data, error } = await this.supabase
      .from("kiwi_reader_view")
      .select("kiwi, epub, participants, annotations")
      .eq("kiwi_id", kiwiId)
      .single();

    if (error || !data) {
      throw new Error(error?.message || "Failed to get kiwi reader");
    }

    return {
      kiwi: data.kiwi,
      epub: data.epub,
      participants: data.participants,
      annotations: data.annotations,
    };
  }
}

export default SupabaseReader;
