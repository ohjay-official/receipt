# Plan — Receipt

**Written:** Thu 12 Nov 2026, Africa/Lagos  
**Status:** Gate 4 — awaiting builder approval. One cloud coding agent session per task, in order. No task starts until the previous task’s phone check is a pass (or is blocked).  
**Budget:** $0. No paid fallbacks.

Each task lists the only files it may change, key signatures, and one pass/fail check Oh-Jay can do from a phone. Tasks tagged **needs Oh-Jay** require a human step; phone walkthroughs are in §2.

Do not create the GitHub repo before **Thu 12 Nov 2026, 11:30 PM WAT**.

---

## 1. Ordered tasks

### T0 — TestMu signup + Gemini key — **needs Oh-Jay** (can start today, before the repo)

**Why first:** the SurveyMonkey form asks whether credits were claimed *before building*. Get keys in a notes app; they go into GitHub secrets in T1.

**Files:** none.

**Phone check:** TestMu dashboard shows the account and a username/access key; AI Studio shows a key and a Free-tier (or clearly reports ineligibility — stop, do not add billing).

### T1 — Create public repo, secrets, PAT, Vercel Hobby import — **needs Oh-Jay** (only after 11:30 PM WAT)

Create **public** `ohjay-official/receipt` with no README if possible. Add secrets. Import into Vercel team `oh-jay-s-projects`. Turn Deployment Protection **off**. Confirm Hobby. See §2.

**Files:** none in the workspace (empty remote repo).

**Phone check:** github.com/ohjay-official/receipt loads as Public; Settings → Secrets shows `LT_USERNAME`, `LT_ACCESS_KEY`, `GEMINI_API_KEY`, `RECEIPT_GIT_TOKEN`; Vercel project exists, protection off, plan Hobby.

### T2 — Scaffold the repo

Agent session after T1. Commit the skeleton so Vercel can produce a first production URL (even a placeholder page).

**May change:** `README.md` (including the empty `<!-- kane:how-to-test -->` block), `action.yml` (inputs/outputs stub), `src/.gitkeep`, `shop/package.json`, `shop/app/page.tsx` (placeholder), `shop/next.config.ts`, `.github/workflows/receipt.yml` (stub `on: deployment_status` that just `echo`es the preview URL), `.gitignore` (include `.env*`, `.testmuai/evidence/`, `node_modules`).

**Must not change:** secrets, Vercel settings.

**Signature:** stub `action.yml` with the inputs in the spec (`test-file`, `production-url`, `allowlist`, `max-fixes`, `username`, `access-key`, `gemini-api-key`).

**Phone check:** a Vercel production `*.vercel.app` URL opens on the phone and shows the placeholder; a GitHub Actions run for the first deployment is visible (even if it only prints the URL).

### T3 — Fixture shop with the $19 vs $29 bug

**May change:** `shop/**` only (e.g. `shop/app/pricing/page.tsx`, `shop/app/checkout/page.tsx`, `shop/lib/prices.ts`, shop layout/styles). No purple-gradient AI look: honest typography, one accent, real $ amounts.

**Must not change:** `action.yml`, `.github/**`, `README.md` contract once filled — the agent may fill the How-to-test block in this task or T4, not later via the fixer.

**Signatures:**

```ts
// shop/lib/prices.ts
export const PRO_PLAN_USD = 19;           // shown on /pricing — the contract
export const CHECKOUT_PRO_USD = 29;       // seeded lie on /checkout — the bug
```

**Phone check:** open the Vercel URL `/pricing` (says Pro $19) and `/checkout` (says $29) from the phone. Both must be visible in one minute.

### T4 — Fill the README contract + consumer blurb

**May change:** `README.md` only.

Must include: one-line “For Judges” path; the tagged How-to-test block (choose Pro at $19, checkout must show $19); how to add `uses: ohjay-official/receipt@main`; no marketing claims that are not testable.

**Phone check:** open the README on github.com; the How-to-test block is visible without expanding a maze of menus.

### T5 — Preview detection + HTTP poll in the workflow / action

**May change:** `src/resolve-preview.ts` (or `.mjs`), `src/wait-http.ts`, `action.yml`, `.github/workflows/receipt.yml`.

**Signatures:** `resolvePreviewUrl`, `waitForHttpOk` as in `docs/spec.md` §12.

**Phone check:** open a throwaway PR that changes a comment in `shop/`; after the Vercel preview succeeds, the Actions log (phone) shows the preview URL and `HTTP 200`. No Kane required yet.

### T6 — Kane `testmd run` + artifacts + inbox reader

**May change:** `src/read-inbox.ts`, `src/classify-exit.ts`, `tests/checkout_test.md` (objective text only, matching the README contract), `.github/workflows/receipt.yml`, `action.yml`. May add a one-shot authoring path documented in the README.

**Must not change:** `shop/**` (keep the $29 lie).

**Kane command (exact flags):**

```bash
kane-cli testmd run tests/checkout_test.md \
  --agent --headless --timeout 300 --max-steps 40 \
  --url "$PREVIEW_URL" \
  --name receipt-checkout \
  --username "$LT_USERNAME" --access-key "$LT_ACCESS_KEY"
```

Install: Node 24, `browser-actions/setup-chrome`, `npm install -g @testmuai/kane-cli`. Archive `.testmuai/evidence/`, `tests/output-*/Result.md`, and logs with `include-hidden-files: true`.

**Signatures:** `classifyKaneExit`, `readKaneInbox`, `extractHowToTest`.

**Phone check:** on a PR against the still-broken shop, Actions is **red**, an evidence artifact is downloadable / a viewer link exists, and `Result.md` in the artifact mentions checkout / $19 vs $29. If Kane never starts (exit 2), mark **BLOCKED** with the log line — do not weaken the test.

### T7 — PR comment (because official action will not comment on `deployment_status`)

**May change:** `src/comment.ts`, `.github/workflows/receipt.yml` (`pull-requests: write`).

Find the PR from the deployment SHA; create or update one comment with a stable marker, the verdict, the evidence link, and a short `Result.md` excerpt. Never print secrets.

**Phone check:** the same red PR shows a Receipt comment with a tappable evidence link.

### T8 — Commit the replay bundle after the first authored run — **needs Oh-Jay** (approve the commit / watch the run)

Once T6 has a completed (even red) authoring that wrote `tests/output-checkout/`, a controlled commit may add `tests/output-checkout/` so later runs replay. Do this on a setup branch or a follow-up commit **without** changing step text. If the first run was red because of the seeded $29, that is expected — still commit the recordings of the steps that *did* run, if Kane wrote them; if official guidance is to only commit after a green authoring of an unchanged app, author first against a temporarily honest checkout on a **setup-only** branch, commit `output-checkout/`, then restore the $29 seed on `main` / the demo branch. The demo PR must start red.

**May change:** `tests/output-checkout/**` only (plus a short README note if needed).

**Phone check:** the `output-checkout` folder is visible on GitHub; a second Kane run’s log mentions replay (or is clearly faster / uses fewer credits). If we cannot tell, note it as unverified in `docs/log.md` and continue.

### T9 — Gemini fixer, allowlist guard, 3-try cap

**May change:** `src/fixer.ts`, `src/path-guard.ts`, `src/gemini.ts`, `action.yml`, `.github/workflows/receipt.yml` (fixer step, `RECEIPT_GIT_TOKEN`).

**Must not change:** `README.md`, `tests/**`, `shop/**` (the fixer will change `shop/**` at **runtime** on a PR, not in this scaffold commit except for tests/helpers).

**Signatures:** `assertAllowlisted`, `callGeminiFlash`, `proposeFix`, `countFixAttempts` as in the spec. Unit-test the guard in CI with a fixture patch that tries to touch `README.md` and `.github/workflows/receipt.yml` and **must** be rejected.

Gemini: `gemini-3.8-flash`; `429` → 5s / 15s / 45s / 90s; then one try of `gemini-3.5-flash-lite`; then fail. No OpenAI.

Commit message: `receipt-fix: N`. Push with `RECEIPT_GIT_TOKEN`. Cap 3. No fixer on exit class `setup` or `timeout`.

**Phone check:** a small “guard” workflow or job log on the phone shows the denylist patch was rejected. Optional: a dry-run fixer log (no push) that shows `Result.md` was in the prompt.

### T10 — End-to-end demo PR (the money shot)

Open a PR that has the seeded $29 bug (or re-introduces it). Watch: red Kane → comment + evidence of $19 vs $29 → fixer commit under `shop/**` only → new preview → Kane replay green → comment updated. README and workflows unchanged in the fixer commit.

**May change:** only what the **running** fixer writes under `shop/**` on that branch. Humans/agents may fix workflow bugs on a separate PR if the loop itself is broken (that is a plan bug, not a “fix” of the shop).

**Phone check (acceptance):**

1. PR conversation on the phone shows a red Receipt comment and an evidence clip/link of $19 vs $29.
2. A later `receipt-fix: 1` commit exists and does not touch `README.md` or `.github/`.
3. A later Receipt comment is green.
4. At most three `receipt-fix:` commits.

If the fixer hardcodes a $19 write without reading `Result.md`, this task is a **fail**.

### T11 — Judges README polish + submission URLs

**May change:** `README.md`, and (in *this* workspace, not necessarily the product repo) `docs/submission-draft.md` TBD fields once the live URL and demo branch exist.

**Phone check:** a teammate-style pass: open the live URL, follow “For Judges,” see the PR, finish in under 30 seconds.

---

## 2. Oh-Jay’s manual steps (phone, in order)

Do **A** and **B** today (Thu 12 Nov), even before 11:30 PM. Do **C–G** only after **11:30 PM WAT**.

### A. Sign up on TestMu and claim 10,000 credits (today)

1. On your phone, open https://www.testmuai.com/register/ (or https://www.testmuai.com/kane-cli/#creditOffer).
2. Create the account with the same email you used on Luma. **Do not add a card.** The official FAQ: “No code to redeem, no card required.”
3. Confirm you have the 10,000 Kane CLI credits (dashboard / credits page).
4. Open dashboard → **Credentials** (CI docs) or **Settings → Keys** (action README) and copy **Username** and **Access Key** into a private note. These become `LT_USERNAME` and `LT_ACCESS_KEY`. Never paste them into a public chat, a gist, or the repo.
5. Optional but useful: join Slack with the invite already in `docs/research/00-logistics.md`, same email.

### B. Create a Gemini API key on the free tier (today)

1. Open https://aistudio.google.com/apikey (Nigeria is on the official available-regions list).
2. Sign in and create a key in a Google Cloud / AI Studio project.
3. Confirm the project is on the **Free** plan. Open the rate-limits view if shown (https://aistudio.google.com/rate-limit?timeRange=last-28-days) and screenshot it for later.
4. If you see “Free tier unavailable,” “Payment needed,” or a demand to attach billing: **stop**. Do not add a card. Tell the agent — we will not spend money; we will re-plan.
5. If it only asks for **device verification**, that is still free — you may verify.
6. Copy the key into a private note. This becomes `GEMINI_API_KEY`. Do not enable Grounding / Google Search.

### C. Create the public repo (after 11:30 PM WAT tonight)

1. Confirm the clock is after **Thu 12 Nov 2026, 11:30 PM** in Africa/Lagos.
2. GitHub app or github.com → New repository.
3. Owner: **ohjay-official**. Name: **receipt**. Visibility: **Public**.
4. Do **not** add a README, license, or `.gitignore` if the UI lets you start empty (avoids a merge conflict with the first agent push).
5. Create. You should see `https://github.com/ohjay-official/receipt`.
6. Give your cloud coding agent access to that repo the way you usually do (Cursor / Copilot / the GitHub app).

### D. Create a fine-grained PAT so Hobby will deploy fixer commits

1. GitHub → Settings → Developer settings → Fine-grained personal access tokens → Generate.
2. Name: `receipt-fixer-push`. Expiration: **30 days** (covers the event; delete it after).
3. Resource owner: **ohjay-official**. Only select the **receipt** repository.
4. Permissions: **Contents: Read and write**. (Metadata read-only is automatic.) Nothing else.
5. Generate and copy the token into a private note. This becomes `RECEIPT_GIT_TOKEN`. Treat it like a password.

### E. Add the four Actions secrets

1. Open `https://github.com/ohjay-official/receipt/settings/secrets/actions` (Settings → Secrets and variables → Actions).
2. New repository secret, four times:
   - `LT_USERNAME` — TestMu username
   - `LT_ACCESS_KEY` — TestMu access key
   - `GEMINI_API_KEY` — AI Studio key
   - `RECEIPT_GIT_TOKEN` — the PAT from D
3. You should see four names only, never the values again.

### F. Import the repo on Vercel Hobby and turn protection off

Wait until T2 has pushed at least the shop placeholder, or import now and let the first deploy run after the push.

1. Open vercel.com, switch to team **oh-jay-s-projects**.
2. Confirm the plan label is **Hobby**. If it says Pro, or a credit card is attached for upgrades, stop and say so before importing.
3. Add New → Project → Import **ohjay-official/receipt**. Root directory: **`shop`** (the Next.js app). Framework: Next.js. Do not add paid add-ons.
4. Deploy. When it finishes, copy the `*.vercel.app` production URL into a note (this is the live URL / fallback).
5. Project → Settings → Deployment Protection → **turn it off** (no Vercel Authentication, no Password Protection — Password Protection is a paid Pro add-on).
6. Confirm a phone browser can open the production URL **without** a login wall.

### G. Later human moments (not today)

- Watch the T10 demo PR on your phone (the acceptance checks).
- If Kane credits look low, DM TestMu Slack — do not buy a plan.
- Record the demo (Phase 6), upload YouTube **unlisted**, fill both submit forms (Phase 7). Those are later approvals.

---

## 3. Suggested calendar (Africa/Lagos)

| When | What |
|---|---|
| Thu 12 Nov, daytime | T0 / A–B (keys). Gate 4 approval of this plan. |
| Thu 12 Nov, after 11:30 PM | T1 / C–F, then T2–T3 overnight agents. |
| Fri 13 Nov | T4–T7: contract, Kane red run, PR comment. |
| Sat 14 Nov | BLAZE roll call 15:00. T8–T9 if energy allows; otherwise Sunday. |
| Sun 15–Mon 16 | T10 e2e loop must be green. |
| Tue 17–Wed 18 | README polish, backup demo recording. |
| Thu 19 Nov, **before 7:29 PM WAT** | Final video, both submission forms. **No pushes after the deadline.** |
