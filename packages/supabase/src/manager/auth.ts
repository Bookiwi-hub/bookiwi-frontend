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
}

export default SupabaseAuth;
