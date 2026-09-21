# Client demo verification — 21 September 2026

## Results

| Check | Result |
|---|---|
| Clean dependency installation | `npm ci --include=dev --include=optional` succeeded without changing the lockfile |
| Demo TypeScript and static build | `npm run demo:build` succeeded |
| Production build and existing regressions | `npm test` succeeded; 263 existing Node tests |
| Lint | Zero errors; two existing `next/no-img-element` warnings in the recovery component |
| Demo browser suite | `npm run demo:test` completed with exit code 0; 26 cases configured, 23 executed and 3 intentionally skipped |
| Role navigation | All eight role workspaces traversed in desktop and mobile Chromium layouts |
| Reports | CEO and System Admin meter labels, Reports overview and historical explorer checked on desktop |
| Connection page | Unavailable, retry, restoring, redirecting, pause/resume and returning to the chooser checked on both layouts |
| Sample reset | BrainServe sample key cleared, unrelated storage key retained |
| Cross-role workflow | Manager approves sample Rohan Khanna visit, CEO receives it and gives final approval; no fetch/XHR requests during this workflow |
| Visual review | Desktop role chooser and CEO report captures inspected |
| Backend preservation | All 364 files under `backend/` match the supplied corrected source byte-for-byte |
| CI preservation | Both files under `.github/` match the supplied corrected source byte-for-byte; no GitHub write performed |
| Dependency preservation | `package-lock.json` matches the supplied corrected source byte-for-byte |

The three skipped cases duplicate desktop report and approval coverage on mobile. Mobile role navigation, recovery and portal entry were exercised. These browser checks run against the prebuilt demo served by the included Node server.

## Demo changes

- Added an independent React/Vite entry and build configuration under `demo/`. It sets an empty backend URL and does not read environment files or load the production Cloudflare plugin.
- Added a client role chooser, presentation guide, browser reset, and recovery animation walkthrough using the existing application components.
- Added clearly labelled illustrative API meters for CEO and System Admin, guarded by the demo build flag. This is not a new live telemetry endpoint.
- Exported existing preview helpers/workspace component for the demo entry.
- Fixed sample initialization for the standalone demo: seeded appointments now have stable references and stored records, so Manager/CEO decisions survive role changes. Initialization is disabled outside the demo build.
- Added demo scripts and lint exclusions for generated demo output. Existing production scripts remain unchanged.
- Included the expanded production README with technology logos and application flow diagrams, plus separate demo instructions.

## Limits

This is an interactive frontend demonstration, not an end-to-end infrastructure rehearsal. No live database, Java backend, Docker services, SMTP, OTP delivery, Kafka, S3, malware scanning or live telemetry were exercised in this step. Some existing preview actions require the backend and display that limitation. The API meter uses fixed illustrative values; appointment report totals come from browser fixtures and preview state.

Validation used Node 24.19.0 and Chromium 140 on Linux, including a Pixel 7 viewport. The Windows launcher was supplied but not executed on Windows. Firefox, WebKit and real mobile devices were not tested in this demo step. The build reports a large JavaScript chunk warning; it still succeeds.

The saved corrected source archive is the baseline. No claim is made that it is the latest GitHub commit or deployed production state. Existing release/debug/archive manifests describe the earlier correction package; `DEMO_SHA256SUMS.txt` describes this demo source package.
