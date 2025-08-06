import { SupabaseClient } from "@supabase/supabase-js";

import {
  NewHighlight,
  NewParticipant,
  Bookmark,
  GetKiwiReaderResponse,
  Participant,
  Highlight,
  Comment,
  NewComment,
} from "../types";
import { camelToSnakeKeys, snakeToCamelKeys } from "../utils";

class SupabaseReader {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  // 키위 리더
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

  // 하이라이트 작업들
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

  async getHighlights(kiwiId: string): Promise<Highlight[]> {
    const { data, error } = await this.supabase
      .from("kiwi_highlights_view")
      .select("*")
      .eq("kiwiId", kiwiId);

    if (error || !data) {
      throw new Error(error?.message || "Failed to get highlights");
    }

    return data;
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
    return { id };
  }

  subscribeToHighlights(
    kiwiId: string,
    sectionHref: string,
    {
      onInsert,
      onDelete,
    }: {
      onInsert?: (highlight: any) => void;
      onDelete?: (highlight: any) => void;
    },
  ) {
    const channel = this.supabase
      .channel(`kiwi-${kiwiId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "highlights",
          filter: `kiwi_id=eq.${kiwiId}`,
        },
        (payload) => {
          const highlight = payload.new;
          if (highlight.section_href === sectionHref) {
            onInsert?.(highlight);
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "highlights",
          filter: `kiwi_id=eq.${kiwiId}`,
        },
        (payload) => {
          const highlight = payload.old;
          if (highlight.section_href === sectionHref) {
            onDelete?.(highlight);
          }
        },
      )
      .subscribe();

    return channel;
  }

  // 참가자 작업
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
      .insert(participant)
      .select()
      .single();

    if (error) {
      throw new Error(error?.message || "Failed to post participant");
    }
  }

  // 코멘트 작업들

  async getHighlightComments(highlightId: string): Promise<Comment[]> {
    const { data, error } = await this.supabase
      .from("highlight_comments_view")
      .select("*")
      .eq("highlightId", highlightId)
      .order("createdAt", { ascending: true });

    if (error || !data) {
      throw new Error(error?.message || "Failed to get highlight comment");
    }

    return data;
  }

  async addHighlightComment(comment: NewComment): Promise<{ id: string }> {
    const snakeComment = camelToSnakeKeys(comment);
    const { data, error } = await this.supabase
      .from("comments")
      .insert(snakeComment)
      .select()
      .single();

    if (error) {
      throw new Error(error?.message || "Failed to add highlight comment");
    }
    return { id: data.id };
  }

  // 북마크 작업들
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

  async addBookmark(bookmark: Bookmark) {
    const snakeBookmark = camelToSnakeKeys(bookmark);
    const { error } = await this.supabase
      .from("bookmarks")
      .insert(snakeBookmark);

    if (error) {
      throw new Error(error?.message || "Failed to add bookmark");
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
