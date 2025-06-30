/* eslint-disable @typescript-eslint/naming-convention */
import supabaseManager from "./supabase";

import { User } from "#/types/user";

class UserManager {
  private currentUser: User | null = null;

  async isLoggedIn() {
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
    await supabaseManager.auth.signOut();
    this.currentUser = null;
  }
}

const userManager = new UserManager();

export default userManager;
