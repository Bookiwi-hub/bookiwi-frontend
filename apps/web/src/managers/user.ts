/* eslint-disable @typescript-eslint/naming-convention */
import { User } from "@bookiwi/supabase/types";

import supabaseManager from "./supabase";

class UserManager {
  private currentUser: User | null = null;

  private readonly GUEST_SESSION_KEY = "bookiwi_guest_user";

  loginAsGuestMode(user: User) {
    sessionStorage.setItem(this.GUEST_SESSION_KEY, JSON.stringify(user));
    this.currentUser = user;
  }

  private logoutAsGuestMode() {
    sessionStorage.removeItem(this.GUEST_SESSION_KEY);
    this.currentUser = null;
  }

  private getGuestFromSession(): User | null {
    try {
      const guestData = sessionStorage.getItem(this.GUEST_SESSION_KEY);
      return guestData ? JSON.parse(guestData) : null;
    } catch {
      return null;
    }
  }

  async isLoggedIn() {
    // 먼저 세션에서 게스트 정보 확인
    const guestUser = this.getGuestFromSession();
    if (guestUser) {
      this.currentUser = guestUser;
      return true;
    }

    // 게스트가 아니면 일반 사용자 인증 확인
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
    return !!this.getGuestFromSession();
  }

  async logout() {
    const guestUser = this.getGuestFromSession();
    if (guestUser) {
      this.logoutAsGuestMode();
    } else {
      await supabaseManager.auth.signOut();
      this.currentUser = null;
    }
  }
}

const userManager = new UserManager();

export default userManager;
