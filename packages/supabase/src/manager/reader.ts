import { SupabaseClient } from "@supabase/supabase-js";

import {
  Bookmark,
  GetKiwiReaderResponse,
  Participant,
} from "../types/response";
import { camelToSnakeKeys } from "../utils/base";

interface NewParticipant {
  kiwiId: string;
  userId: string;
  name: string;
  profileImage: string | null;
  color: string;
}

class SupabaseReader {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getKiwiReader(kiwiId: string): Promise<GetKiwiReaderResponse> {
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

  async addParticipant(newParticipant: NewParticipant) {
    const { kiwiId, userId, name, profileImage, color } = newParticipant;
    const participant = {
      kiwi_id: kiwiId,
      user_id: userId,
      name,
      profile_image: profileImage,
      color,
    };

    const { error } = await this.supabase
      .from("participants")
      .insert(participant);

    if (error) {
      throw new Error(error?.message || "Failed to post participant");
    }
  }

  async getBookmarks(participantId: string): Promise<Bookmark[]> {
    const { data, error } = await this.supabase
      .from("bookmarks")
      .select("*")
      .eq("participant_id", participantId);

    if (error || !data) {
      throw new Error(error?.message || "Failed to get bookmarks");
    }
    if (data.length === 0) {
      return [];
    }

    return data;
  }

  async updateParticipant(participantId: string, fields: Partial<Participant>) {
    const snakeFields = camelToSnakeKeys(fields);
    const { error } = await this.supabase
      .from("participants")
      .update(snakeFields)
      .eq("id", participantId);

    if (error) {
      throw new Error(error?.message || "Failed to update participant");
    }
  }
}

export default SupabaseReader;
