<!-- .github/copilot-instructions.md -->
# Copilot / AI agent instructions — teste-act-frontend

Purpose: short, actionable guidance to help an AI agent become productive in this repository.

Quick Start (commands)
- Dev server: `npm start` (alias for `ng serve`) — opens on http://localhost:4200
- Build (production default): `npm run build` (runs `ng build` with `production` by default)
- Run SSR after build: `npm run serve:ssr:teste-act-frontend` — runs `node dist/teste-act-frontend/server/server.mjs` (listens on PORT env var or defaults to 4000)
- Tests: `npm test` (runs `ng test` with Karma/Jasmine)

Architecture & where to look
- This is an Angular application (Angular CLI v20.x). Key files:
  - `angular.json` — build/serve/test configurations (note `ssr.entry` points to `src/server.ts`)
  - `src/server.ts` — Express + Angular SSR entry; add server-side API endpoints here if needed
  - `package.json` — scripts & dependencies (see `serve:ssr:teste-act-frontend`)
  - `src/app/**` — application code. Domain features live under `src/app/teste-act`.

Project-specific patterns & gotchas
- SSR: The project is pre-configured for server-side rendering. Build produces `dist/teste-act-frontend` and a `server.mjs` that `npm run serve:ssr:teste-act-frontend` will run.
- Standalone component style: components use the newer Angular standalone approach (see `src/app/app.ts` where the component imports `RouterOutlet`). Also uses Angular `signal` API.
- DI pattern: services are Angular injectables (e.g. `src/app/shared/client-service/client.service.ts` is `@Injectable({ providedIn: 'root' })`).
- Styling & formatting: project uses SCSS and has a Prettier config in `package.json` (singleQuote: true, printWidth: 100). Prefer these settings when formatting edits.
- Tests: Karma + Jasmine are configured (run with `npm test`). There are existing spec files (e.g. `client.service.spec.ts`) but coverage is minimal; run tests after edits.

Known oddities to be careful about (do not auto-fix without confirmation)
- `src/app/environment/environment..dev.ts` has an extra dot and is empty — check with maintainers before renaming or removing
- `src/app/app.ts` contains `styleUrl` (singular) which is not the standard `styleUrls` field — treat as a potential bug and validate any fix by running the dev server and tests

How AI agents should approach changes
- Small bugfix/cleanup flow:
  1. Run `npm start` and `npm test` locally (or in CI) to reproduce issues.
  2. Make focused edits and format using project's Prettier settings.
  3. Run `npm run build` and `npm run serve:ssr:teste-act-frontend` to confirm SSR builds & server start.
  4. Add or update unit tests alongside code changes (use existing spec files as examples).
- When adding server APIs, prefer adding endpoints inside `src/server.ts` and cover behavior with integration-style tests where possible.

Files to reference for examples
- `src/server.ts` — SSR server & where to add Express endpoints
- `angular.json` — build/ssr config
- `package.json` — helpful npm scripts
- `src/app/app.ts` — example standalone component using `signal` and `RouterOutlet` import
- `src/app/shared/client-service/client.service.ts` — simple injectable service pattern

If anything here is unclear or you want additional topics covered (CI, deployment, PR checklist), tell me which area to expand and I will update this doc.

— End of file
