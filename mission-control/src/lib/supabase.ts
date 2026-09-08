import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** true se la dashboard ha le chiavi pubbliche per leggere il DB */
export const hasSupabase = Boolean(url && anon);

/** Crea un client sullo schema dedicato `mc` (tipo inferito, così TS non pretende "public"). */
function createMcClient(u: string, key: string) {
  return createClient(u, key, {
    db: { schema: "mc" },
    auth: { persistSession: false, autoRefreshToken: false },
    realtime: { params: { eventsPerSecond: 5 } },
  });
}
export type McClient = ReturnType<typeof createMcClient>;

let browser: McClient | null = null;

/** Client di lettura (anon, RLS attiva). */
export function supabaseBrowser(): McClient | null {
  if (!hasSupabase) return null;
  if (!browser) browser = createMcClient(url as string, anon as string);
  return browser;
}

/** Client di scrittura (service role, bypassa RLS). SOLO lato server (/api/*). */
export function supabaseAdmin(): McClient | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createMcClient(url, key);
}

/** Client di sola lettura lato server (anon) quando manca la service key. */
export function supabaseReader(): McClient | null {
  if (!url || !anon) return null;
  return createMcClient(url, anon);
}
