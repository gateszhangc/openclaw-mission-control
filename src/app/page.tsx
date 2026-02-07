import Link from "next/link";

export default function Home() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 16px" }}>
      <h1 style={{ margin: 0 }}>OpenClaw Mission Control</h1>
      <p style={{ marginTop: 10, opacity: 0.8 }}>
        A lightweight dashboard for OpenClaw: Activity feed, Cron calendar, and Global search.
      </p>

      <div style={{ marginTop: 16 }}>
        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            background: "black",
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Open dashboard
        </Link>
      </div>

      <hr style={{ margin: "22px 0" }} />

      <h2 style={{ marginTop: 0 }}>How it works (MVP)</h2>
      <ul>
        <li>
          Calendar: calls <code>openclaw cron list</code> locally.
        </li>
        <li>
          Search: uses <code>rg</code> over <code>~/.openclaw</code> folders.
        </li>
        <li>
          Activity: reads a local JSONL file (demo).
        </li>
      </ul>

      <p style={{ opacity: 0.75, fontSize: 12 }}>
        Note: For Vercel, you’ll need a remote API to your OpenClaw host (this MVP expects local access).
      </p>
    </div>
  );
}
