import { SupabaseClient } from "@supabase/supabase-js";

import {
  NewHighlight,
  NewParticipant,
  Bookmark,
  GetKiwiReaderResponse,
  Participant,
  Highlight,
} from "../types";
import { camelToSnakeKeys, snakeToCamelKeys } from "../utils/base";

class SupabaseReader {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getKiwiReader(kiwiId: string): Promise<GetKiwiReaderResponse> {
    const { data, error } = await this.supabase
      .from("kiwi_reader_view")
      .select("kiwi, epub, participants")
      .eq("kiwi_id", kiwiId)
      .single();

    if (error || !data) {
      throw new Error(error?.message || "Failed to get kiwi reader");
    }

    return {
      kiwi: data.kiwi,
      epub: data.epub,
      participants: data.participants,
    };
  }

  async getSectionHighlights(
    kiwiId: string,
    sectionHref: string,
  ): Promise<Highlight[]> {
    const { data, error } = await this.supabase
      .from("kiwi_highlights_view")
      .select("*")
      .eq("kiwiId", kiwiId)
      .eq("sectionHref", sectionHref);

    if (error || !data) {
      throw new Error(error?.message || "Failed to get section highlights");
    }

    return data;
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

    const bookmarks = data.map((bookmark) => snakeToCamelKeys(bookmark));
    return bookmarks as Bookmark[];
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

  async addBookmark(bookmark: Bookmark) {
    const snakeBookmark = camelToSnakeKeys(bookmark);
    const { error } = await this.supabase
      .from("bookmarks")
      .insert(snakeBookmark);

    if (error) {
      throw new Error(error?.message || "Failed to add bookmark");
    }
  }

  async addHighlight(highlight: NewHighlight): Promise<{ id: string }> {
    const snakeHighlight = camelToSnakeKeys(highlight);
    const { data, error } = await this.supabase
      .from("highlights")
      .insert(snakeHighlight)
      .select()
      .single();

    if (error) {
      throw new Error(error?.message || "Failed to add highlight");
    }
    return { id: data.id };
  }

  async removeHighlight(id: string) {
    const { error } = await this.supabase
      .from("highlights")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error?.message || "Failed to remove highlight");
    }
  }

  async removeBookmark({
    participantId,
    cfiStart,
    cfiEnd,
  }: {
    participantId: string;
    cfiStart: string;
    cfiEnd: string;
  }) {
    const { error } = await this.supabase
      .from("bookmarks")
      .delete()
      .eq("participant_id", participantId)
      .eq("cfi_start", cfiStart)
      .eq("cfi_end", cfiEnd);

    if (error) {
      throw new Error(error?.message || "Failed to remove bookmark");
    }
  }
}

export default SupabaseReader;
