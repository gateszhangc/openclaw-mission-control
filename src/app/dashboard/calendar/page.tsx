"use client";

import { useEffect, useState } from "react";

export default function CalendarPage() {
  const [raw, setRaw] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/cron/jobs", { cache: "no-store" });
      const j = await res.json();
      if (!j.ok) throw new Error(j.detail || j.error || "Failed");
      setRaw(j.raw || "");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 style={{ margin: 0 }}>Calendar (Cron jobs)</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        MVP view. For now we show raw output of <code>openclaw cron list</code>. Next step: return structured JSON.
      </p>

      <button onClick={load} disabled={loading}>
        {loading ? "Loading…" : "Refresh"}
      </button>

      {err ? (
        <pre style={{ marginTop: 12, padding: 12, border: "1px solid rgba(255,0,0,0.3)", borderRadius: 8, whiteSpace: "pre-wrap" }}>{err}</pre>
      ) : null}

      <pre style={{ marginTop: 12, padding: 12, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, whiteSpace: "pre-wrap" }}>
        {raw || (loading ? "" : "(empty)")}
      </pre>
    </div>
  );
}
