# GEARZ OSINT Detective: Development Notes

This is the maintainer's reference for the current implementation. Start with the [README](README.md) for setup and the [design guide](design_guidelines.md) for UI conventions.

## Current implementation

The active application contains 25 campaign missions, a React/TypeScript client, an Express API, and PostgreSQL persistence through Drizzle and the Neon serverless driver. Both the client and gameplay API import `client/src/lib/missions.ts`.

`missions-25.ts` and `missions-backup.ts` are retained source variants, not the current imports. Check the active import path before editing mission content or documenting campaign counts.

### Request and persistence flow

1. `server/index.ts` installs PostgreSQL-backed session middleware and request parsing
2. `server/authRoutes.ts` provides local account registration and sign-in
3. `server/routes.ts` handles gameplay using the authenticated session's user ID
4. `server/storage.ts` reads and writes the tables in `shared/schema.ts`
5. In development, Express mounts Vite; in production, it serves the built client

`server/db.ts` creates the database connection. Its `initializeDatabase()` function only logs a message; it does not create the application tables. Use the explicit `npm run db:push` command against an appropriate development database.

## Local and Replit configuration

The checked-in `.replit` file selects Node.js 20 and PostgreSQL 16, runs `npm run dev`, and maps application port `5000`. Its deployment configuration builds with `npm run build` and runs `npm run start`.

Set `DATABASE_URL` and `SESSION_SECRET` through the runtime's environment or private secret settings. `PORT` is optional outside Replit and defaults to `5000`. No AI credentials are needed for current gameplay. The scripts do not load a `.env` file automatically.

These settings describe the intended launch process, not a verified public deployment. The existing Neon driver needs a compatible database transport. Production cookies require HTTPS, and a reverse-proxy deployment must account for the server's current lack of explicit proxy-trust configuration.

## API map

Unless marked public, routes require a valid authenticated session.

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Public account registration |
| POST | `/api/auth/login` | Public sign-in using email or username |
| POST | `/api/auth/logout` | Destroy the current session |
| GET | `/api/auth/me` | Return the signed-in account; otherwise `401` |
| GET | `/api/progress` | Read the current player's progress |
| POST | `/api/mission/complete` | Validate and score a report, then update progress |
| POST | `/api/progress/mode` | Select Beginner or Expert mode |
| POST | `/api/progress/codename` | Set a codename and complete the introduction |
| POST | `/api/progress/reset` | Reset the signed-in player's progress |
| POST | `/api/quiz/complete` | Record a quiz result and eligible XP |
| GET | `/api/daily` | Read the daily case assignment |
| POST | `/api/daily/complete` | Record a daily completion and streak reward |
| GET | `/api/leaderboard` | Public leaderboard |
| POST | `/api/profile/update` | Update supported profile fields |

The reset route is available to the authenticated player, not an admin-only endpoint. It is destructive to that player's progress.

## Report scoring and progression

The mission-completion request includes `missionId`, `report`, `timeElapsed`, and `timestamp`. The route validates report length from 10 to 5,000 characters, checks the mission exists, and enforces its minimum level.

The active score calculation in `server/routes.ts` is:

- Start at 50 points
- Add 10 points for a report longer than 100 characters
- Add another 10 points for a report longer than 200 characters
- Add up to 30 points for case-insensitive substring matches against the mission's solution values
- Round and cap the result at 100

The server derives mission XP from the mission reward, the saved mode, and the score. Expert mode multiplies XP by 1.5. The initial result is rounded down; repeated completions receive 25% of that result, rounded down again. Best mission scores are retained, and attempt counts increase.

Level calculation is `floor(sqrt(XP / 100)) + 1`. Achievement checks run after the mission progress update is constructed.

These controls are useful prototype mechanics, not comprehensive anti-cheat. Quiz results accept a client-supplied numeric score, daily completion accepts a supplied ID, and recorded elapsed time comes from the client. The current daily assignment rotates through mission IDs 1–15, even though the campaign has 25 missions.

## AI and simulated tools

The game uses local fixtures for investigation output. It does not query real targets. `ToolPanel.tsx` renders search, WHOIS, metadata, paste, certificate, and breach panels; some tool types present in mission definitions have no matching panel yet.

The report submission route uses its own heuristic, while `Home.tsx` constructs templated feedback from the returned score. `EnhancedMentorDialog.tsx` supplies explanatory UI text.

`server/ai-instructor.ts` contains a separate OpenAI-compatible integration helper, but the active gameplay route does not import or call it. Its environment options are implementation scaffolding, not required setup steps.

The Settings screen stores AI configuration in browser local storage without connecting it to grading. Do not enter real credentials. Future integration work should keep provider credentials on the server and explicitly define what report data is sent to the provider.

## Data and deployment review

- PostgreSQL stores accounts, password hashes, progress, and sessions
- Some display/profile preferences are browser-local, so they should not all be described as synchronized account settings
- The registered service worker caches successful same-origin responses without a dedicated private-API exclusion; assess cache invalidation and user separation before deployment
- Request/response logging and browser debug logs should be reviewed before using real account details or reports
- Authentication, authorization, input validation, transaction consistency, and abuse resistance require a separate security review

## Verification checklist

Before proposing a code change:

1. Run `npm run check` and `npm run build`
2. Confirm registration, sign-in, sign-out, and session persistence on a disposable database
3. Complete an unlocked mission, replay it, switch mode, and verify XP and best-score behavior
4. Review locked missions, quizzes, daily cases, leaderboard output, and profile changes
5. Test narrow layouts, keyboard navigation, dialog dismissal, and browser Back/Forward
6. Check refresh and sign-out behavior with the service worker enabled
7. Exercise progress reset only with disposable test data

There is no automated test script in the package manifest. This checklist is a suggested review workflow, not a claim that these checks have already passed.

## Historical context

The earlier v2.0 notes recorded a five-to-ten-mission expansion, progression and achievements, Beginner/Expert modes, a timer, case archives, animated backgrounds, mobile-layout work, server-side validation, and a move to Replit Database. Those notes also proposed AI grading, audio, more tools, leaderboards, and report export as future work.

Those descriptions belong to an earlier iteration. The current source has 25 missions and PostgreSQL persistence; audio, additional tool panels, learning screens, and leaderboard code are now present. Live AI grading and PDF report export should not be inferred from the older roadmap. The original development prompt under `attached_assets/` is preserved as a historical input, not a current specification.
