import {
  SignInWithOAuthCredentials,
  SupabaseClient,
} from "@supabase/supabase-js";

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

  async getUser() {
    const { data, error } = await this.supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }
    return data;
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
