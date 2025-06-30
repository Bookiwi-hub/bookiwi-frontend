import { createClient, SupabaseClient } from "@supabase/supabase-js";

import SupabaseAuth from "./auth";

class SupabaseManager {
  private supabase: SupabaseClient;

  auth: SupabaseAuth;

  constructor(supabaseUrl: string, supabaseAnonKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
    this.auth = new SupabaseAuth(this.supabase);
  }

  getClient() {
    return this.supabase;
  }
}

export default SupabaseManager;
