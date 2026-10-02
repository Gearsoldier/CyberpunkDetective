# GEARZ OSINT Detective

**A cyberpunk investigation game built around simulated evidence, short reports, and progressive learning.**

Work through 25 story-driven cases, connect clues with in-game OSINT tools, and build a detective profile with XP, levels, and achievements. The project combines a React interface with an Express API and PostgreSQL-backed accounts and progress.

> **Project status:** Educational prototype. Investigation data is simulated, and report scores come from a server-side heuristic. The active game does not use an LLM to grade reports or investigate real targets.

[Quick start](#quick-start) · [Gameplay](#gameplay) · [Architecture](#architecture) · [Limitations](#current-limitations) · [Design guide](design_guidelines.md)

## Gameplay

- **25 campaign missions** defined in `client/src/lib/missions.ts`, with briefings, hints, expected findings, and level requirements
- **Beginner and Expert modes**, with different hints and an Expert-mode timer and XP multiplier
- **Simulated investigation panels** for search, WHOIS, metadata, paste records, certificates, and breach-style records
- **Persistent player progress:** mission attempts, best scores, XP, levels, and achievements
- **Learning and review screens:** a glossary with quizzes, case archives, training summaries, and analytics
- **Replay features:** daily cases, streak rewards, a leaderboard, and unlockable content
- **Cyberpunk presentation:** neon themes, animated feedback, a narrative introduction, and sound effects

### The investigation loop

1. Register or sign in, choose a codename, and select an unlocked case
2. Read the briefing and inspect its simulated evidence
3. Write a report that connects the relevant findings
4. Submit it for scoring, review the explanation, and continue or replay

The game teaches investigation concepts through fictional scenarios. It does not perform live WHOIS, breach searches, metadata extraction, or network scanning.

## Stack

| Layer | Implementation |
| --- | --- |
| Interface | React 18, TypeScript, Vite, Wouter |
| UI and state | Tailwind CSS, shadcn/ui and Radix primitives, TanStack Query |
| API | Express, Zod validation |
| Persistence | Drizzle ORM, PostgreSQL through the Neon serverless driver |
| Accounts | bcrypt password hashes, Express sessions stored in PostgreSQL |
| Build | Vite for the client; esbuild for the server |

## Quick start

### Prerequisites

- Node.js 20 and npm, matching the checked-in Replit runtime
- A PostgreSQL connection compatible with `@neondatabase/serverless`; a Neon database is the simplest match for the existing driver
- A private development database and a strong, unique session secret

A plain local PostgreSQL instance is not a drop-in replacement for the driver's WebSocket transport without additional configuration.

### Install and configure

```bash
git clone https://github.com/Gearsoldier/CyberpunkDetective.git
cd CyberpunkDetective
npm ci
```

Set these variables in your shell or hosting environment before running database or server commands:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Connection string for the development database |
| `SESSION_SECRET` | Yes | Private signing secret for session cookies |
| `PORT` | No | HTTP port; defaults to `5000` |

Keep credentials out of Git, screenshots, and issue reports. The application does not configure automatic `.env` loading, so a `.env` file alone is insufficient.

Initialize the schema only against a database you intend to modify, then start the app:

```bash
npm run db:push
npm run dev
```

Open [http://localhost:5000](http://localhost:5000). The Express server serves both the API and the Vite development client. Registration creates the player's account and initial progress; no separate seed command is provided.

`db:push` applies schema changes to the selected database. Review proposed changes and back up existing data before using it outside a disposable development environment. The session store creates its session table when needed.

### Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the development server |
| `npm run check` | Run TypeScript checking |
| `npm run build` | Build the client and bundle the server into `dist/` |
| `npm start` | Run the production server after a build |
| `npm run db:push` | Synchronize the Drizzle schema with the configured database |

The scripts use POSIX-style environment assignment. Use a compatible shell, such as WSL on Windows. No automated test script is currently declared in `package.json`.

## Architecture

```text
client/src/pages/Home.tsx      Main game screens and report-submission flow
client/src/components/        Game panels and reusable UI
client/src/lib/missions.ts    Active 25-mission campaign
client/src/lib/toolData.ts    Simulated investigation data
client/public/data/          Learning glossary
server/routes.ts             Gameplay API and heuristic report scoring
server/authRoutes.ts         Registration, login, logout, and current user
server/storage.ts            Account and progress persistence
server/db.ts                 Drizzle / Neon connection
shared/schema.ts             Tables, shared types, validation, XP helpers
```

See [development notes](replit.md) for the API map, scoring rules, deployment caveats, and historical context. See [design guidelines](design_guidelines.md) for visual conventions and UI review criteria.

## Current limitations

- **Heuristic scoring:** Report length and matching expected answer strings determine the score. It is not semantic grading or a reliable measure of investigative ability
- **AI controls are unfinished:** The Settings screen saves provider configuration, including an API key, in browser local storage. It is not connected to active grading. Do not enter a real key; the game does not need one. The separate `server/ai-instructor.ts` helper is not wired into the route
- **Some tools are incomplete:** Mission definitions include DNS and email tools, but `ToolPanel.tsx` has no dedicated panels for them
- **Prototype progression:** Quiz scores and daily completion claims are partly client-supplied. Do not describe the current implementation as cheat-proof or suitable for competitive assessment
- **Caching needs review:** The service worker broadly caches same-origin responses, including successful API GET responses. A fresh database-backed session is still needed; the app is not a verified offline game. Review private-data caching and sign-out behavior before any real-user deployment
- **Production hardening is unfinished:** Review authentication abuse protection, session/proxy configuration, logging, persistence edge cases, and security controls before exposing the app publicly

For local review, use fictional account details and synthetic reports. Public deployment and real-user security have not been established by the presence of deployment configuration.

## Troubleshooting

- **Database errors:** Confirm `DATABASE_URL` is set in the running process, the service is reachable, the driver is compatible, and the schema has been applied
- **Session errors or failed sign-in:** Confirm `SESSION_SECRET` is set and the database user can access the session table
- **Production cookies are missing:** Production sessions require HTTPS. If TLS terminates at a proxy, review Express proxy trust and cookie configuration; the current server does not set `trust proxy`
- **Old content or stale progress:** Inspect the registered service worker and site cache in browser developer tools. Clearing site data also removes local preferences and signs you out
- **An AI key appears necessary:** It is not required for the active report-scoring path

## License

`package.json` declares MIT. This repository does not currently include a standalone `LICENSE` file; confirm the applicable terms with the maintainer before redistribution.
