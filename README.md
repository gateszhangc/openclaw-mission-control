# OpenClaw Mission Control

Mission Control Dashboard (MVP) for OpenClaw:

- **Activity feed** (JSONL event log)
- **Calendar** (cron jobs)
- **Global search** (keyword search via ripgrep)

## Local dev

```bash
npm install
npm run dev
```

Open:
- http://localhost:3000
- http://localhost:3000/dashboard

## Requirements (MVP)

This MVP assumes it is running **on the same machine** as your OpenClaw Gateway and state:

- `openclaw` CLI available in PATH (for `/api/cron/jobs`)
- `rg` (ripgrep) available in PATH (for `/api/search`)

On macOS:

```bash
brew install ripgrep
```

## Activity feed

By default it reads:

- `./data/activity.jsonl`

You can override via env:

- `ACTIVITY_JSONL_PATH=/path/to/activity.jsonl`

## Deploy (Vercel)

Vercel deployments **do not** have access to your local `~/.openclaw` state or `openclaw` CLI.

If you want this UI hosted on Vercel, add a separate remote API that can securely talk to your OpenClaw host
(e.g. via Tailscale + authenticated API), then update the dashboard to call that API instead of local exec.
