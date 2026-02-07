import { NextResponse } from "next/server";
import { execFileAsync } from "@/lib/shell";

export async function GET() {
  // Local-only MVP: requires openclaw CLI on the host.
  const r = await execFileAsync("openclaw", ["cron", "list"], { timeoutMs: 20000 });
  if (r.exitCode !== 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "openclaw cron list failed",
        detail: r.stderr || r.stdout,
        hint: "Run this app on the OpenClaw host (or add a remote API).",
      },
      { status: 501 }
    );
  }

  // `openclaw cron list` is human output; prefer tool/API, but for MVP we parse via cron tool in the future.
  // For now: return raw text.
  return NextResponse.json({ ok: true, raw: r.stdout });
}
