/* eslint-disable @typescript-eslint/naming-convention */
import { User } from "@bookiwi/supabase/types/response";

import supabaseManager from "./supabase";

class UserManager {
  private currentUser: User | null = null;

  private isTempUser: boolean = false;

  loginAsTempUser(user: User) {
    this.isTempUser = true;
    this.currentUser = user;
  }

  logoutAsTempUser() {
    this.isTempUser = false;
    this.currentUser = null;
  }

  async isLoggedIn() {
    if (this.isTempUser) {
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

  async logout() {
    if (this.isTempUser) {
      this.logoutAsTempUser();
    } else {
      await supabaseManager.auth.signOut();
      this.currentUser = null;
    }
  }
}

const userManager = new UserManager();

export default userManager;
