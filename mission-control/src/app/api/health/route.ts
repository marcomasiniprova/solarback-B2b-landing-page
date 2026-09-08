import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export function GET() {
  return NextResponse.json({
    ok: true,
    ts: new Date().toISOString(),
    supabase_read: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    supabase_write: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.INGEST_KEY),
    storage_write: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    ingest: Boolean(process.env.INGEST_KEY),
    decide_pin: Boolean(process.env.DECIDE_PIN),
  });
}
