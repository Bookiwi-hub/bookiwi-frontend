import {
  SignInWithOAuthCredentials,
  SupabaseClient,
} from "@supabase/supabase-js";

import { User } from "../types";

class SupabaseAuth {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async signInWithKakao(
    options?: Omit<SignInWithOAuthCredentials, "provider">,
  ) {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "kakao",
      ...options,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async signInWithGoogle(
    options?: Omit<SignInWithOAuthCredentials, "provider">,
  ) {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
      ...options,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();
    console.log(data);

    if (!data.user) return null;
    const { id } = data.user;
    const { email, name, avatar_url: profileImage } = data.user.user_metadata;

    return {
      id,
      email,
      name,
      profileImage,
    };
  }

  async isLoggedIn() {
    try {
      const { data, error } = await this.supabase.auth.getUser();
      if (error) {
        return false;
      }
      return data.user !== null;
    } catch {
      return false;
    }
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }
}

export default SupabaseAuth;
