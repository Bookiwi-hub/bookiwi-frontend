/* eslint-disable @typescript-eslint/naming-convention */
import {
  Bookmark,
  Comment,
  Highlight,
  Participant,
  User,
} from "@bookiwi/supabase/types";

import supabaseManager from "./supabase";

class UserManager {
  private currentUser: User | null = null;

  private isGuestMode: boolean = false;

  private guestParticipant: Participant | null = null;

  private guestBookmarks: Bookmark[] = [];

  private guestHighlights: Highlight[] = [];

  private guestComments: Comment[] = [];

  loginAsGuestMode(user: User) {
    this.isGuestMode = true;
    this.currentUser = user;
  }

  logoutAsGuestMode() {
    this.isGuestMode = false;
    this.currentUser = null;
    this.guestParticipant = null;
    this.guestBookmarks = [];
    this.guestHighlights = [];
    this.guestComments = [];
  }

  setGuestParticipant(participant: Participant) {
    this.guestParticipant = participant;
  }

  getGuestParticipant() {
    return this.guestParticipant;
  }

  setGuestBookmarks(bookmarks: Bookmark[]) {
    this.guestBookmarks = bookmarks;
  }

  getGuestBookmarks() {
    return this.guestBookmarks;
  }

  setGuestHighlights(highlights: Highlight[]) {
    this.guestHighlights = highlights;
  }

  getGuestHighlights() {
    return this.guestHighlights;
  }

  setGuestComments(comments: Comment[]) {
    this.guestComments = comments;
  }

  getGuestComments() {
    return this.guestComments;
  }

  async isLoggedIn() {
    if (this.isGuestMode) {
      return true;
    }
    try {
      this.currentUser = await supabaseManager.auth.getUser();
      return true;
    } catch {
      return false;
    }
  }

  get user() {
    return this.currentUser;
  }

  get userId() {
    return this.currentUser?.id;
  }

  get isGuest() {
    return this.isGuestMode;
  }

  async logout() {
    if (this.isGuestMode) {
      this.logoutAsGuestMode();
    } else {
      await supabaseManager.auth.signOut();
      this.currentUser = null;
    }
  }
}

const userManager = new UserManager();

export default userManager;
