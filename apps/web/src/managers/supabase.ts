import { SupabaseManager } from "@bookiwi/supabase";

const supabaseManager = new SupabaseManager(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default supabaseManager;
