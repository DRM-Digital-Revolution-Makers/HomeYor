import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("[Supabase] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});