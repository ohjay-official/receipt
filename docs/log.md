# Log — Kane hackathon / Receipt

Times below are **Africa/Lagos (WAT, UTC+1)** unless a source timestamp is named and then converted.

## Deadlines

- Repo init (safe bar): **after Thu 12 Nov 2026, 11:30 PM WAT** (Luma `event.start_at` 2026-11-12T22:30:00.000Z). Official “on or after 12 November” has no timezone.
- BLAZE roll call: Sat 14 Nov 2026, 15:00 WAT (external; keep Receipt core-loop work small that afternoon).
- Submission: **Thu 19 Nov 2026, 7:29 PM WAT** (19 Nov, 11:59 PM IST). No pushes after this.
- Kane 10,000-credit grant: valid one month / 30 days from TestMu signup (Luma vs pricing.md wording). Clock starts when Oh-Jay signs up, not at kickoff.

## Decisions

- **12 Nov, morning — idea:** Oh-Jay picked Preview-then-proof. Brief approved as **Receipt**.
- **12 Nov, ~08:49 — brief:** problem/solution, three features, money shot, out-of-scope, 60s script written to `docs/brief.md`.
- **12 Nov, ~09:00 — Phase 4 / $0:** paid OpenAI fallback **removed**. Fixer is Gemini free Flash only; `429` → exponential backoff, then one `gemini-3.5-flash-lite` try, then fail. No billing accounts, no Vercel Pro, no `--remote`, no paid runners.
- **12 Nov — extra secret:** `RECEIPT_GIT_TOKEN` (ohjay-official fine-grained PAT) is required in addition to `LT_USERNAME`, `LT_ACCESS_KEY`, and `GEMINI_API_KEY`, because Vercel Hobby typically will not deploy `github-actions[bot]` / `GITHUB_TOKEN` commits. Upgrading to Pro to dodge this is forbidden.
- **12 Nov — Kane loop mechanics:** official action `url` input is ignored for `test-files`; `testrun run` has no `--url`. The loop uses `kane-cli testmd run … --url "$PREVIEW_URL"` (documented override). Official `deployment_status` example does not post a PR comment; Receipt will write its own. `Result.md` path is `tests/output-checkout/Result.md`. Evidence: `.testmuai/evidence/` plus a 30-day artifact; upload with `include-hidden-files: true`. Official action does not upload `Result.md`; we will.
- **12 Nov — lane (draft):** SurveyMonkey “Verification baked into your workflow.”
- **12 Nov — team / repo:** public `ohjay-official/receipt`; Vercel team `oh-jay-s-projects` on Hobby; Deployment Protection off.

## Blockers / waiting

- Builder Gate 4 approval of `docs/spec.md`, `docs/plan.md`, stack, and the task list — **no product code until then**.
- Oh-Jay T0: TestMu signup + Gemini key (can be today). If Gemini free tier is ineligible, stop; do not add a card.
- Oh-Jay T1: repo + secrets + Vercel, **only after 11:30 PM WAT**.
- Slack/email still have not settled Luma vs kaneclihack.sh form / video / launch-post mismatches.

## Cost risks (watch)

See `docs/spec.md` §11. Highest-priority watches: (1) anyone adding a card to TestMu, Google, or Vercel; (2) enabling Vercel Password Protection or upgrading the team to Pro so bot commits deploy; (3) Kane credit burn from re-authoring because `_test.md` / recordings were rewritten; (4) `testrun --remote`; (5) making the GitHub repo private.

## Unverified (open)

Listed in full in `docs/spec.md` §13. Short form: official action hides the numeric exit code; `--url` vs replay-cache validity; Hobby deploy of non-owner commits on this exact team; Hobby/billing state of `oh-jay-s-projects`; Gemini eligibility of Oh-Jay’s Google account; Slack top-up if credits run out; `/o/submit` field list behind login; repo-init timezone.

## Sources checked this phase (12 Nov)

- https://github.com/LambdaTest/kane-cli/blob/main/integrations/github-action/kane-cli-browser-run/action.yml
- https://github.com/LambdaTest/kane-cli/blob/main/integrations/github-action/kane-cli-browser-run/README.md
- https://github.com/LambdaTest/kane-cli/blob/main/integrations/github-action/kane-cli-browser-run/examples/preview-deployment.yml
- https://github.com/LambdaTest/kane-cli/blob/main/docs/user-guide/testmd/running.md
- https://github.com/LambdaTest/kane-cli/blob/main/docs/user-guide/testrun.md
- https://www.testmuai.com/docs/kane-cli-cicd
- https://www.surveymonkey.com/r/kane-cli-hackathon-submission (fields read, not submitted)
- https://vercel.com/docs/plans/hobby and https://vercel.com/docs/limits (Hobby caps; no auto-upgrade assumed)

## Build (local, 12 Nov 2026, Africa/Lagos)

- Codebase assembled under this repository (`action.yml`, `shop/`, `src/`, workflows, unit tests). No GitHub remote, no Vercel, no Kane live run (T8 replay bundle still outstanding until secrets exist).
