import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
/** Azioni esterne irreversibili (pubblicare) le fa il backend su approvazione. Publisher non ancora collegato. */
export function POST() {
  return NextResponse.json({ ok: false, error: "Publisher non ancora collegato (OmniSocials). Le bozze approvate restano in dashboard." }, { status: 501 });
}
