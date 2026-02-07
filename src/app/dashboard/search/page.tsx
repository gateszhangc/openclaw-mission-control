"use client";

import { useMemo, useState } from "react";

type Hit = { file?: string; line?: number; text?: string; raw?: string };

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const canSearch = useMemo(() => q.trim().length > 0, [q]);

  async function run() {
    if (!canSearch) return;
    setLoading(true);
    setErr("");
    setHits([]);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=50`, { cache: "no-store" });
      const j = await res.json();
      if (!j.ok) throw new Error(j.detail || j.error || "Failed");
      setHits(j.hits || []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 style={{ margin: 0 }}>Global search</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        MVP keyword search powered by <code>ripgrep</code> across OpenClaw workspace/memory/logs.
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search term…"
          style={{ flex: 1, padding: "8px 10px" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
          }}
        />
        <button onClick={run} disabled={!canSearch || loading}>
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      {err ? <pre style={{ marginTop: 12, whiteSpace: "pre-wrap", color: "crimson" }}>{err}</pre> : null}

      <div style={{ marginTop: 12 }}>
        {hits.length ? (
          <ul style={{ paddingLeft: 18 }}>
            {hits.map((h, idx) => (
              <li key={idx} style={{ marginBottom: 10 }}>
                {h.file ? (
                  <div>
                    <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, opacity: 0.8 }}>
                      {h.file}:{h.line}
                    </div>
                    <div style={{ whiteSpace: "pre-wrap" }}>{h.text}</div>
                  </div>
                ) : (
                  <div style={{ whiteSpace: "pre-wrap" }}>{h.raw}</div>
                )}
              </li>
            ))}
          </ul>
        ) : loading ? null : (
          <div style={{ opacity: 0.7 }}>No results.</div>
        )}
      </div>
    </div>
  );
}
