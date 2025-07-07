import { createClient, SupabaseClient } from "@supabase/supabase-js";

import SupabaseAuth from "./auth";
import SupabaseKiwi from "./kiwi";

class SupabaseManager {
  private supabase: SupabaseClient;

  auth: SupabaseAuth;

  kiwi: SupabaseKiwi;

  constructor(supabaseUrl: string, supabaseAnonKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
    this.auth = new SupabaseAuth(this.supabase);
    this.kiwi = new SupabaseKiwi(this.supabase);
  }

  getClient() {
    return this.supabase;
  }
}

export default SupabaseManager;
