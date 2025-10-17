import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || (import.meta.env.SUPABASE_URL as string);
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || (import.meta.env.SUPABASE_SERVICE_ROLE_KEY as string);

if (!supabaseUrl || !supabaseKey) {
  console.warn("[Supabase] Missing SUPABASE_URL or client key (anon/service role)");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});