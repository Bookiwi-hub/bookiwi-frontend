import { createClient, SupabaseClient } from "@supabase/supabase-js";

import SupabaseAuth from "./auth";
import SupabaseKiwi from "./kiwi";
import SupabaseReader from "./reader";

class SupabaseManager {
  private supabase: SupabaseClient;

  auth: SupabaseAuth;

  kiwi: SupabaseKiwi;

  reader: SupabaseReader;

  constructor(supabaseUrl: string, supabaseAnonKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
    this.auth = new SupabaseAuth(this.supabase);
    this.kiwi = new SupabaseKiwi(this.supabase);
    this.reader = new SupabaseReader(this.supabase);
  }

  getClient() {
    return this.supabase;
  }
}

export default SupabaseManager;
