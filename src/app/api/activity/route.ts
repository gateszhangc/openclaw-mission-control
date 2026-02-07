import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const JSONL_PATH = process.env.ACTIVITY_JSONL_PATH || path.resolve(process.cwd(), "data", "activity.jsonl");

export async function GET() {
  let events: unknown[] = [];
  try {
    if (fs.existsSync(JSONL_PATH)) {
      const txt = fs.readFileSync(JSONL_PATH, "utf8");
      events = txt
        .split("\n")
        .filter(Boolean)
        .slice(-200)
        .map((l) => {
          try {
            return JSON.parse(l) as unknown;
          } catch {
            return { ts: new Date().toISOString(), type: "parse_error", summary: l } as unknown;
          }
        })
        .reverse();
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: "failed to read activity", detail: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true, events });
}
