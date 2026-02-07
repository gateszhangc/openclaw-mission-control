import Link from "next/link";
import type { ReactNode } from "react";

const nav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/activity", label: "Activity" },
  { href: "/dashboard/calendar", label: "Calendar" },
  { href: "/dashboard/search", label: "Global search" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
      <header style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: "none" }}>
          OpenClaw Mission Control
        </Link>
        <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {nav.map((i) => (
            <Link key={i.href} href={i.href} style={{ textDecoration: "none" }}>
              {i.label}
            </Link>
          ))}
        </nav>
      </header>
      <main style={{ marginTop: 20 }}>{children}</main>
      <footer style={{ marginTop: 32, opacity: 0.7, fontSize: 12 }}>
        Tip: deploy this UI anywhere, but cron/search integrations require access to your OpenClaw host.
      </footer>
    </div>
  );
}
