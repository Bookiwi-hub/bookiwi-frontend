/* eslint-disable @typescript-eslint/naming-convention */
import supabaseManager from "./supabase";

import { User } from "#/types/user";

class UserManager {
  private currentUser: User | null = null;

  private isTempUser: boolean = false;

  loginAsGuest(user: User) {
    this.isTempUser = true;
    this.currentUser = user;
  }

  logoutAsGuest() {
    this.isTempUser = false;
    this.currentUser = null;
  }

  isGuest() {
    return this.isTempUser;
  }

  async isLoggedIn() {
    if (this.isTempUser) {
      return true;
    }
    try {
      const { user } = await supabaseManager.auth.getUser();
      const { email, user_name, avatar_url } = user.user_metadata;
      this.currentUser = {
        id: user.id,
        email,
        name: user_name,
        profileImage: avatar_url,
      };
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

  async logout() {
    if (this.isTempUser) {
      this.logoutAsGuest();
    } else {
      await supabaseManager.auth.signOut();
      this.currentUser = null;
    }
  }
}

const userManager = new UserManager();

export default userManager;
