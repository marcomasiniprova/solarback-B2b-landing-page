import { NextResponse } from "next/server";
import { supabaseReader } from "@/lib/supabase";
import { fetchSnapshot } from "@/lib/snapshot";
export const dynamic = "force-dynamic";

/** Stato pubblico della dashboard (stessi dati leggibili con la anon key), servito same-origin. */
export async function GET() {
  const sb = supabaseReader();
  if (!sb) return NextResponse.json({ ok: false, error: "Supabase non configurato" }, { status: 503 });
  try {
    const snapshot = await fetchSnapshot(sb);
    return NextResponse.json({ ok: true, ts: new Date().toISOString(), snapshot }, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
