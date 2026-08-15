import "server-only";

import { createClient } from "@supabase/supabase-js";

function requireServerEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`missing_server_env:${name}`);
  return value;
}

const serverClientOptions = {
  auth: {
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: false,
  },
} as const;

export function createSupabasePublicServerClient() {
  return createClient(
    requireServerEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireServerEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    serverClientOptions,
  );
}

export function createSupabaseAdminClient() {
  return createClient(
    requireServerEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireServerEnv("SUPABASE_SERVICE_ROLE_KEY"),
    serverClientOptions,
  );
}
