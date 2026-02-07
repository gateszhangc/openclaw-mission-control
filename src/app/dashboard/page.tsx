import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ margin: 0 }}>Mission Control</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        MVP dashboard for: Activity feed, Calendar (cron), and Global search.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 16 }}>
        <Card title="Activity feed" href="/dashboard/activity" desc="Audit what happened (deploys, cron, messages)." />
        <Card title="Calendar" href="/dashboard/calendar" desc="View and manage scheduled cron jobs." />
        <Card title="Global search" href="/dashboard/search" desc="Search workspace/memory/logs (rg-based)." />
      </div>

      <hr style={{ margin: "24px 0" }} />

      <h2 style={{ marginTop: 0 }}>Setup</h2>
      <ul>
        <li>
          Local mode: requires <code>openclaw</code> CLI available in PATH.
        </li>
        <li>
          For Vercel: you’ll need a remote API layer (or run this on the OpenClaw host).
        </li>
      </ul>
      <p>
        Start here: <Link href="/dashboard/calendar">Calendar</Link>.
      </p>
    </div>
  );
}

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 10,
        padding: 14,
        textDecoration: "none",
        display: "block",
      }}
    >
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 6, opacity: 0.75, fontSize: 13 }}>{desc}</div>
    </Link>
  );
}
