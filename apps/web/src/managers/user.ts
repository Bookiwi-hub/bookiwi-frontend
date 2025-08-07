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

  logoutAsGuestMode() {
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

  async isLoggedInAsGuest() {
    const guestUser = this.getGuestFromSession();
    if (guestUser) {
      this.currentUser = guestUser;
      return true;
    }
    return false;
  }

  async isLoggedInAsUser() {
    const user = await supabaseManager.auth.getUser();
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  async isLoggedIn() {
    // 먼저 세션에서 게스트 정보 확인
    const isGuest = await this.isLoggedInAsGuest();
    if (isGuest) return true;

    // 게스트가 아니면 일반 사용자 인증 확인
    const isUser = await this.isLoggedInAsUser();
    return isUser;
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
