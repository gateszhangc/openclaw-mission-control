"use client";

import { useEffect, useState } from "react";

type Event = {
  ts: string;
  type: string;
  summary: string;
  meta?: unknown;
};

export default function ActivityPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [err, setErr] = useState<string>("");

  async function load() {
    setErr("");
    try {
      const res = await fetch("/api/activity", { cache: "no-store" });
      const j = await res.json();
      if (!j.ok) throw new Error(j.detail || j.error || "Failed");
      setEvents(j.events || []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setErr(msg);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 style={{ margin: 0 }}>Activity feed</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        MVP event log (JSONL). Next step: wire events from deploy/cron/search.
      </p>

      <button onClick={load}>Refresh</button>
      {err ? <pre style={{ marginTop: 12, whiteSpace: "pre-wrap", color: "crimson" }}>{err}</pre> : null}

      <div style={{ marginTop: 12 }}>
        {events.length ? (
          <ul style={{ paddingLeft: 18 }}>
            {events.map((ev, idx) => (
              <li key={idx} style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, opacity: 0.75 }}>{ev.ts} · {ev.type}</div>
                <div>{ev.summary}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ opacity: 0.7 }}>No events yet.</div>
        )}
      </div>
    </div>
  );
}
