import { NextResponse } from "next/server";
import { execFileAsync } from "@/lib/shell";

const DEFAULT_PATHS = [
  "/Users/a1-6/.openclaw/workspace",
  "/Users/a1-6/.openclaw/memory",
  "/Users/a1-6/.openclaw/logs",
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (!q) return NextResponse.json({ ok: true, q, hits: [] });

  const limit = Math.max(1, Math.min(200, Number(url.searchParams.get("limit") || 50)));

  // Use rg for speed. In Vercel, rg likely isn't present.
  const args = ["-n", "--no-heading", "--smart-case", "--max-count", String(limit), q, ...DEFAULT_PATHS];
  const r = await execFileAsync("rg", args, { timeoutMs: 20000 });

  if (r.exitCode !== 0 && !r.stdout) {
    return NextResponse.json(
      {
        ok: false,
        error: "ripgrep not available or search failed",
        detail: r.stderr || r.stdout,
        hint: "Run locally on the OpenClaw host (install rg), or build a remote search API.",
      },
      { status: 501 }
    );
  }

  const hits = r.stdout
    .split("\n")
    .filter(Boolean)
    .slice(0, limit)
    .map((line) => {
      // format: file:line:match
      const m = line.match(/^(.*?):(\d+):(.*)$/);
      if (!m) return { raw: line };
      return { file: m[1], line: Number(m[2]), text: m[3] };
    });

  return NextResponse.json({ ok: true, q, hits });
}
