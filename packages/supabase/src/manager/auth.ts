import { SupabaseClient } from "@supabase/supabase-js";

class SupabaseAuth {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async signInWithKakao() {
    const result = await this.supabase.auth.signInWithOAuth({
      provider: "kakao",
    });
    return result;
  }
}

export default SupabaseAuth;
