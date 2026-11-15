# Spec — Receipt

**Product:** Receipt — a drop-in GitHub Action that will not let you merge a Vercel preview whose README contract is a lie.  
**Written:** Thu 12 Nov 2026, Africa/Lagos  
**Status:** Gate 4 — awaiting builder approval of spec, architecture, stack, and task list. No application code until then.  
**Hard constraint:** **$0 budget.** No paid APIs, no plan upgrades, no OpenAI fallback (removed). Everything must run on the TestMu/Kane free grant, GitHub Actions on a **public** repo, Vercel Hobby, and the Gemini API free Flash tier. On a Gemini `429`, back off and retry; if the free tier is still exhausted or ineligible, fail the job clearly.

Approved brief: `docs/brief.md`.

---

## 1. What it does

Receipt watches a pull request’s **Vercel preview**, runs **Kane CLI** against a tagged How-to-test contract in the README, and pins the verdict plus a sealed evidence pack on the PR.

The demo fixture is a tiny shop: the **pricing page says Pro is $19**; **checkout is seeded at $29**. Kane must catch that mismatch (the Verified moment). If Kane exits `1`, a fixer step reads Kane’s own `Result.md` / NDJSON one-liner, asks Gemini Flash to patch **allowlisted app source only**, pushes, and Kane **replays the same committed `_test.md`**. At most **three** fixer attempts. The fixer must never edit the README contract, the workflow files, the action, or the Kane test.

Tagline: “Don’t merge a preview without a Receipt.”

---

## 2. Inputs

| Input | Source | Notes |
|---|---|---|
| Vercel preview URL | `deployment_status` event: `github.event.deployment_status.environment_url` or `target_url` (official example) | Poll until HTTP 200, ~2–3 minutes. If the preview never becomes ready, fall back to the stable production URL and say so in the PR comment. |
| How-to-test contract | README block between `<!-- kane:how-to-test -->` and `<!-- /kane:how-to-test -->` | Imperative claim: choose Pro at $19; checkout must show $19. |
| Committed Kane test | `tests/checkout_test.md` plus, after first authoring, `tests/output-checkout/` | Replay source of truth. Do not re-author the objective on each PR. |
| TestMu credentials | GitHub Actions secrets `LT_USERNAME`, `LT_ACCESS_KEY` | Dashboard → Credentials / Settings → Keys. |
| Gemini key | GitHub Actions secret `GEMINI_API_KEY` | AI Studio, free Flash tier only. |
| Push token | GitHub Actions secret `RECEIPT_GIT_TOKEN` | Fine-grained PAT of **ohjay-official** (see §8 and cost/Hobby note). Needed so Vercel Hobby actually deploys the fixer commit. |
| Attempt count | Commits on the PR branch whose message matches `receipt-fix: N` | Cap: stop fixing when `N >= 3`. |

Receipt composite action inputs (consumer-facing):

- `test-file` — default `tests/checkout_test.md`
- `production-url` — fallback if the preview never comes up
- `allowlist` — default `shop/**`
- `max-fixes` — default `3`
- `username` / `access-key` / `gemini-api-key` — from secrets, never as plaintext in the workflow file

---

## 3. Outputs

| Output | Where | Notes |
|---|---|---|
| Kane verdict | Job conclusion, job summary, PR comment | Pass/fail and a one-line summary. |
| `Result.md` | `tests/output-checkout/Result.md` (next to the test; `<name>` is the filename without `_test.md`) | Human-readable report with YAML frontmatter (`status`, `duration_s`, `session_id`) and per-step pass/fail. **This is the fixer inbox.** Also uploaded as an artifact. Cited: [testmd running.md](https://github.com/LambdaTest/kane-cli/blob/main/docs/user-guide/testmd/running.md). |
| NDJSON stream | `kane-out/stream.ndjson` (if using the official action’s layout) or stdout from `kane-cli testmd run --agent` | Script against `run_end` / `test_md_done`, not progress events. |
| Sealed evidence pack | `.testmuai/evidence/*.evidence` and the official action’s `kane-out/evidence/` | Do **not** commit `.testmuai/evidence/`. Archive with `include-hidden-files: true`. Official action also uploads a 30-day artifact and may emit `evidence-url`. |
| Hosted evidence link | `https://evidence.lambdatest.com/?pack=gh-artifact:<owner>/<repo>/<artifact-id>` (URL-encoded) | Official action output `evidence-url`. Link lasts as long as the artifact (30 days). |
| Official action outputs (when that action is used) | `status` (`passed`\|`failed`), `summary`, `total`, `failed`, `results-file`, `evidence-url` | Cited: [action.yml](https://github.com/LambdaTest/kane-cli/blob/main/integrations/github-action/kane-cli-browser-run/action.yml) and its [README](https://github.com/LambdaTest/kane-cli/blob/main/integrations/github-action/kane-cli-browser-run/README.md). |
| PR comment | One comment per PR, updated in place (HTML marker) | Verdict, evidence link, attempt count, and whether a fixer commit was pushed. |
| Fixer commit | `receipt-fix: N` on the PR branch | Only allowlisted paths. Triggers a new Vercel preview and a Kane replay. |

---

## 4. Constraints

- Public repo only (safer submission bar; also keeps Actions minutes on the free public-repo path).
- Repo **ohjay-official/receipt**, created **after Thu 12 Nov 2026, 11:30 PM WAT** (Luma calendar start). Do not init it earlier.
- Solo, phone-only builder; cloud coding agents write code; no local CLI required of Oh-Jay.
- Kane runs on `ubuntu-latest` with Chrome on the runner. **Never** `testrun run --remote` (needs a HyperExecute macOS plan that the free 10,000-credit grant is not stated to include).
- Never `kane-cli login` with no flags (OAuth opens a browser). Authenticate with `--username` / `--access-key`, or the official action’s `kane-cli login --username --access-key` (basic auth).
- Always `--headless`. Always a wall-clock `--timeout` (300s) and `--max-steps` (40). Always a start URL (`--url` or the objective names the site).
- Pin or record the `@testmuai/kane-cli` version (research: 0.10.3 as of 7 Nov 2026). Official action default Node is **24**.
- One Kane test in v1. One fixture app. No MCP, cron, mobile, bisect, custom evidence app, Web3, or `npx create-*`.
- **$0:** no paid OpenAI, no Vercel Pro, no paid KaneAI plan, no billing account “just in case,” no `--remote`, no paid GitHub runners, no paid Vercel add-ons (password protection, custom preview suffix, bought domains).
- Gemini model: **`gemini-3.8-flash`**, retry once on **`gemini-3.5-flash-lite`** after backoff if needed. Both are on the official Free-tier pricing page. No Gemini 4, no Grounding with Google Search.
- `concurrency` per PR so only the latest preview’s workflow runs. Job `timeout-minutes: 30`.

---

## 5. Failure conditions

| Condition | Behaviour |
|---|---|
| Kane exit `0` | Comment green with evidence. No fixer. Check passes. |
| Kane exit `1` (run happened, test did not pass, or upload failed per CI docs) | If attempt count `< 3`, run the fixer (must actually read `Result.md`). If it produces an allowlisted patch, commit `receipt-fix: N` and push. If `N` would exceed 3, comment that the cap was hit and **fail** the check. |
| Kane exit `2` (did not start: auth, config, no start URL, Chrome, invalid suite plan; **no credits used**) | **Do not** call the fixer. Fail the job with the log. |
| Kane exit `3` (timeout or cancelled) | **Do not** call the fixer. Fail the job. |
| Official action step fails without a numeric exit code | Classify from artifacts: `Result.md` with a failed step → treat as `1`. No `Result.md` / no `run_end` or `test_md_done` → treat as setup (`2`), no fixer. Timeout language in stderr → treat as `3`. **Unverified:** the official action outputs only `passed`\|`failed`, not the numeric code. |
| Preview never HTTP 200 | Fall back to production URL, say so in the comment. If that also fails, exit as setup, no fixer. |
| Vercel Deployment Protection login wall | Treat as a product bug in *our* demo config (protection must be off). Kane seeing an SSO wall is a false fail. |
| Fixer patch touches a disallowed path | Reject the whole patch. Count this as one failed attempt. Do not push. |
| Fixer would edit the How-to-test block or `_test.md` | Reject. The app must be made true; the contract stays. |
| Gemini `429 RESOURCE_EXHAUSTED` | Exponential backoff (5s, 15s, 45s, 90s; up to four retries). Then one attempt on `gemini-3.5-flash-lite`. If still 429/403, **fail the fixer** and comment “free-tier Gemini exhausted — not billed.” Do not upgrade, do not call any paid API. |
| Gemini 403 / free tier unavailable / verification required | Fail clearly. Do not add a billing account. |
| `GITHUB_TOKEN` push that Hobby will not deploy | Use `RECEIPT_GIT_TOKEN` (owner PAT). If that secret is missing, fail with instructions; do not upgrade Vercel to Pro. |
| Seeded $29 already gone and no `Result.md` was read | Invalid Closed loop. The fixer is forbidden to be a hardcoded “set price to 19” script. |

---

## 6. What it can touch, and what it must never touch

Deterministic path guard, not the model, decides.

**Allowlist (fixer may only write these):** `shop/**`

That is the Next.js fixture (pages, components, `shop/lib/prices.ts` or equivalent, shop-local styles). The intentional bug lives here (pricing $19, checkout $29).

**Denylist — the fixer must never edit, even if a path somehow also matches a glob:**

- `README.md` and in particular the `<!-- kane:how-to-test -->` … `<!-- /kane:how-to-test -->` block
- `.github/**` (all workflow files)
- `action.yml`, `src/**` (the Receipt composite action and its scripts)
- `tests/**` including `*_test.md` and `output-*/`
- Root config that is not under `shop/` (root `action.yml`, license, docs, `.gitignore`)
- Secret files, `.env*`, and anything under `.testmuai/` except a CI-generated variables file that is **not committed**

The **workflow itself** (not the fixer) may: write a workspace-only start URL / variables file before Kane runs; upload artifacts; post comments; commit `tests/output-checkout/` **once** after the first successful authoring on a dedicated setup path (not mid-red-fix).

---

## 7. Secrets model

| Secret | Where it lives | Used by |
|---|---|---|
| `LT_USERNAME` | GitHub Actions repository secrets only | Official Kane action input `username`, or `kane-cli --username` |
| `LT_ACCESS_KEY` | same | Official action input `access-key`, or `--access-key` |
| `GEMINI_API_KEY` | same | Fixer only (`x-goog-api-key` / official SDK). Not sent to Kane. |
| `RECEIPT_GIT_TOKEN` | same | Fixer `git push` to the PR branch so the commit is attributed to **ohjay-official** and Vercel Hobby will build it |

Never commit secrets. Never echo them. Never pass them to `echo`, `set -x`, PR comments, job summaries, Kane variables, or the Gemini prompt. Mask them if a script must assign them. Kane `--variables` must not include credentials. The fixture has no auth and no PII.

`GITHUB_TOKEN` is used for `pull-requests: write` (comment) and read operations. It is **not** sufficient for the fixer push on Vercel Hobby (see §11).

---

## 8. Privacy note

- The repo is public: every workflow log, PR comment, and evidence link is public.
- Evidence packs (screenshots, traces, console) show only the fixture shop. No customer data, no personal profiles, no secrets.
- The hosted viewer link is unauthenticated to anyone who has it, for 30 days. Do not put private data in the app.
- **Gemini Free tier:** official pricing states that content may be used to improve Google’s products. The prompt may include the How-to-test claim, `Result.md`, a one-liner, and **allowlisted shop source** only — never secrets, never `.env`, never `LT_*` or API keys, never workflow files.
- Do not enable Gemini Grounding with Google Search.
- The owner PAT (`RECEIPT_GIT_TOKEN`) is as powerful as repo write access; expire it at 30 days and delete it after the event.
- Oh-Jay’s email and any prize-payout wallet appear only on the submission form, not in the repo.

---

## 9. Architecture and stack

**One public repo:** `https://github.com/ohjay-official/receipt`, created after 11:30 PM WAT on 12 Nov 2026.

```
action.yml                         # product: composite action (uses: ohjay-official/receipt@main)
src/                               # resolve-preview, read-inbox, comment, fixer, path-guard, gemini
shop/                              # Next.js fixture (App Router): /pricing, /checkout
tests/checkout_test.md
tests/output-checkout/             # committed after first authoring (replay cache)
.github/workflows/receipt.yml      # demo: deployment_status → Receipt
README.md                          # judges path + tagged How-to-test contract
```

**Fixture:** Next.js on **Vercel Hobby**, team **`oh-jay-s-projects`**. Deployment Protection **off** for production and preview. Production URL is the live URL for judges; each demo PR gets a preview.

**Kane invocation (verified flags, cited below):** because the loop must replay one committed test against a *new* preview URL each time:

```bash
kane-cli testmd run tests/checkout_test.md \
  --agent --headless --timeout 300 --max-steps 40 \
  --url "$PREVIEW_URL" \
  --name receipt-checkout \
  --username "$LT_USERNAME" --access-key "$LT_ACCESS_KEY"
```

`--url` on `testmd run` officially overrides frontmatter `url:` without editing the file. **Do not** rely on the official action input `url` together with `test-files`: that input applies to **inline objectives only**, and `kane-cli testrun run` has **no `--url` flag**.

Install path matches the official action: `ubuntu-latest`, `actions/setup-node` (Node 24), `browser-actions/setup-chrome`, `npm install -g @testmuai/kane-cli`. Package name is `@testmuai/kane-cli` (not unscoped `kane-cli`). pnpm is unsupported for Kane.

The official action `LambdaTest/kane-cli/integrations/github-action/kane-cli-browser-run@main` is still the reference for evidence artifacts, `evidence-url`, and job-summary shape. Receipt may call it for an optional first-time **authoring** run (`objective` + `url`). The closed loop itself uses `testmd run --url` so replay stays valid while the preview host changes. After the Kane step, always archive:

```yaml
path: |
  .testmuai/evidence/
  tests/output-*/Result.md
  kane-out/
include-hidden-files: true
```

### Workflow (`.github/workflows/receipt.yml`)

1. **Trigger:** `on: deployment_status`. Job `if: github.event.deployment_status.state == 'success'`. This is the official preview recipe ([preview-deployment.yml](https://github.com/LambdaTest/kane-cli/blob/main/integrations/github-action/kane-cli-browser-run/examples/preview-deployment.yml)). Ignore failed/pending statuses. Skip runs that are not this repo’s Vercel project if possible.
2. **Preview detection:** read `environment_url` or `target_url`. Poll GET until 200 or timeout. Production URL fallback as in §2.
3. **Resolve the PR** from the deployment SHA (`/commits/{sha}/pulls`). `deployment_status` is **not** a `pull_request` event.
4. **Attempt count:** count `receipt-fix: N` commits on the branch. If already 3 failed fixes after a still-red Kane run, comment and fail (no fourth call).
5. **Kane run:** `testmd run` as above, start URL = preview. Continue far enough to always upload artifacts even on failure (`if: always()`).
6. **PR comment + evidence artifact:** the official action **skips** `comment-on-pr` unless the event is `pull_request` or `pull_request_target` — its own preview example sets `comment-on-pr: "false"` and says the verdict lands in the job summary only. Receipt **must** post (or update) its own PR comment with the verdict, `Result.md` excerpt, and evidence link. Permissions: `contents: read` (write only for the fixer job), `pull-requests: write`.
7. **Exit-code branch:** `0` stop green; `2` or `3` stop red, no fixer; `1` go to fixer if `N < 3`.
8. **Gemini fixer:** build the inbox from `tests/output-checkout/Result.md`, NDJSON one-liner, and the action summary. Prompt includes the How-to-test claim and the allowlist. Apply the patch only after `assertAllowlisted()`. Commit `receipt-fix: N` as ohjay-official via `RECEIPT_GIT_TOKEN` and push. Do not force-push. Do not amend published history.
9. **Replay:** the push creates a new Vercel preview; a new `deployment_status` success retriggers this workflow; Kane runs the **same** `_test.md` with `--url` pointing at the new preview. Unchanged steps replay from `tests/output-checkout/` with no LLM/Kane-authoring cost; only changed UI is re-authored. Cap 3.
10. **Check:** the workflow fails when Kane is not green at the end of a run that will not (or cannot) schedule another fix.

`concurrency:` group by preview/PR, `cancel-in-progress: true`.

---

## 10. Official Kane facts (verified 12 Nov 2026)

**Official GitHub Action** — `LambdaTest/kane-cli/integrations/github-action/kane-cli-browser-run@main`  
Sources: [action.yml](https://github.com/LambdaTest/kane-cli/blob/main/integrations/github-action/kane-cli-browser-run/action.yml), [README](https://github.com/LambdaTest/kane-cli/blob/main/integrations/github-action/kane-cli-browser-run/README.md), [CI docs](https://www.testmuai.com/docs/kane-cli-cicd).

Inputs: `objective` **or** `test-files` (not both); `url` (inline objectives only); required `username`, `access-key`; `timeout` default `300` (inline only); `parallel` default `1`; `fail-fast` default `false`; `extra-args`; `comment-on-pr` default `true`; `kane-version` default `latest`; `node-version` default `24`; `install-chrome` default `true`; `artifact-name` default `kane-evidence`; `logs-artifact-name` default `kane-logs`.

Outputs: `status`, `summary`, `total`, `failed`, `results-file`, `evidence-url`.

The action installs Node and Chrome (`browser-actions/setup-chrome` v2), `npm install -g @testmuai/kane-cli@${kane-version}`, then `kane-cli login --username --access-key`. For `test-files` it runs `kane-cli testrun run <files> --headless --parallel N --name "…"`. For `objective` it runs `kane-cli run "$OBJECTIVE" --agent --headless --timeout "$TIMEOUT"` and optional `--url`. It uploads `kane-out/evidence/` (`.evidence` packs, 30 days) and `kane-out/results.md`, `kane-out/stream.ndjson`, `kane-out/stderr.log`. It does **not** upload `output-*/Result.md` (the manual CI recipe does). Receipt will upload `Result.md` itself.

**`kane-cli testmd run` flags we use** — [running.md](https://github.com/LambdaTest/kane-cli/blob/main/docs/user-guide/testmd/running.md): `--headless`, `--max-steps`, `--timeout`, `--url` (overrides frontmatter), `--agent` (NDJSON; auto when stdin is not a TTY, but pass it), `--name` (`[a-zA-Z0-9_-]+`), `--username`, `--access-key`.

**Result.md path:** `output-<name>/Result.md` beside the test file, where `<name>` is the filename without `_test.md`. Example: `tests/checkout_test.md` → `tests/output-checkout/Result.md`. The whole `output-<name>/` directory (including `.internal/` recordings) is safe and recommended to commit for replay.

**Evidence path:** every `testmd run` also copies a sealed pack into `<cwd>/.testmuai/evidence/`. A named `kane-cli run --name` does too. Without `--name`, an inline run may leave the pack only under `~/.testmuai/kaneai/sessions/`. `include-hidden-files: true` is required for `actions/upload-artifact` to see `.testmuai/`.

**Replay:** first run authors; later runs replay a step if a recording exists and the step objective and yaml are unchanged. Editing a step re-authors that step and every following authorable step. `--url` changes the start URL for the run; whether that alone invalidates recordings is **unverified** — keep the `_test.md` step text stable and do not rewrite the file in the loop. Adaptive healing is on by default (three shrinking windows, then re-author). Pure replay does not need a Test Manager project picker.

**Exit codes** (CI docs + testmd running.md; testrun.md is slightly narrower on `3`):

| Code | Meaning | Receipt |
|---|---|---|
| `0` | Passed | Green, stop |
| `1` | Run went ahead and failed (or upload failed) | Fixer allowed |
| `2` | Did not start (auth/config/Chrome/no URL/invalid plan). **No credits used** | No fixer |
| `3` | Timeout or cancelled | No fixer |

**Auth in CI:** [CI docs](https://www.testmuai.com/docs/kane-cli-cicd) say do not call `kane-cli login` because the *OAuth* flow opens a browser. The official action uses `login --username --access-key` (basic auth). Both basic-auth forms are acceptable. Never interactive OAuth in Actions.

**Preview example gotcha:** official `preview-deployment.yml` cannot post a PR comment (wrong event). Receipt must.

---

## 11. Cost risks (anything that could ever incur a cost)

All are **avoidable**. Do not take the paid path.

| Risk | Why it could cost | $0 rule |
|---|---|---|
| Kane credits exhausted | 10,000 free credits, valid one month / 30 days, no card. Paid KaneAI plans exist if you *upgrade* (Starter $19 / Pro $99). | Commit `output-checkout/` early; replay is “no LLM cost.” If credits run low, **DM Slack** (official FAQ: they will “sort you out”). Do not add a card or upgrade. |
| `testrun run --remote` / HyperExecute | Docs: requires a plan with HyperExecute macOS runners. | Never pass `--remote`. |
| Gemini billed | Paid Gemini / a Cloud billing account; Grounding has separate limits. Official caveat: not every project is eligible for the free tier; a new key in the same project will not unlock it; upgrading to paid does not restore free-tier quota. | No billing account. No Grounding. `429` → backoff only. If ineligible, stop and report. |
| OpenAI | Paid. | **Removed.** No `OPENAI_API_KEY`. |
| Vercel Pro or add-ons | Pro is paid. Password protection is **$20/project/month** (Pro). Custom preview suffix is paid. Bought domains are paid. Exceeding Hobby usually **pauses** until the next window rather than auto-billing, but a plan upgrade or add-on would bill. | Stay on **Hobby**. Confirm the team `oh-jay-s-projects` is Hobby. Protection = off (free), not password protection. No paid domain. No Analytics Plus / Blob beyond included, etc. Hobby caps (flag): 100 deployments/day, 100/hour, 1 concurrent build; if we hit them, wait, do not upgrade. |
| Hobby + bot commits | Not a fee, but a trap: Hobby only deploys commits from the **team owner**. `github-actions[bot]` + `GITHUB_TOKEN` often will **not** deploy, so the loop looks “broken.” The “fix” people reach for is upgrading to Pro. | Use `RECEIPT_GIT_TOKEN` (owner PAT). Never upgrade to Pro for this. |
| Private GitHub repo | Private repos consume paid or quota Actions minutes. | Keep the repo **public**. Standard `ubuntu-latest` only; no larger runners. |
| Artifact storage | Official evidence artifacts retain 30 days. Public repos are on GitHub’s free Actions/artifact path under fair use. | Do not raise retention beyond 30 days. Do not upload huge unrelated trees. |
| npm / registries | Public packages are free. | No paid registries. |

---

## 12. Key function signatures (for the plan)

```ts
export function resolvePreviewUrl(event: {
  deployment_status: { state: string; environment_url?: string; target_url?: string };
}, fallbackProductionUrl?: string): string;

export async function waitForHttpOk(url: string, opts: { timeoutMs: number; intervalMs: number }): Promise<"ok" | "timeout">;

export function countFixAttempts(gitLog: string): number; // /^receipt-fix: (\d+)/

export type ExitClass = "pass" | "fail" | "setup" | "timeout" | "unknown";

export function classifyKaneExit(args: {
  processExit?: number;
  resultMd?: string | null;      // tests/output-checkout/Result.md
  stderrLog?: string | null;
  ndjson?: string | null;        // look for run_end / test_md_done
  officialStatus?: "passed" | "failed";
}): ExitClass;

export function readKaneInbox(workspace: string): {
  resultMd: string | null;
  oneLiner: string | null;
  evidencePathGlobs: string[];
};

export function extractHowToTest(readme: string): string; // between the kane:how-to-test markers

export function assertAllowlisted(changedPaths: string[], allowlist: string[], denylist: string[]): void;
// throws if any path is outside shop/** or matches a denylist entry

export async function callGeminiFlash(prompt: string, opts: {
  apiKey: string;
  model?: "gemini-3.8-flash" | "gemini-3.5-flash-lite";
}): Promise<string>;
// 429 → exp backoff (5s, 15s, 45s, 90s); then one retry on 3.5-flash-lite; never a paid API

export async function proposeFix(input: {
  claim: string;
  resultMd: string;
  allowlist: string[];
}): Promise<{ files: Record<string, string> }>;
```

---

## 13. Unverified technical points

1. Exact numeric Kane exit code is **not** an official action output (`status` is only `passed`\|`failed`). Classification from `Result.md` / NDJSON is specified above but not officially documented as a map.
2. Whether `testmd run --url <new-preview>` leaves recordings replayable (step text unchanged, only the start URL flag changes).
3. Whether a workspace-only edit of frontmatter `url:` would bust replay (we avoid this in the loop and use `--url`).
4. Whether `GITHUB_TOKEN` pushes would ever be deployed on this exact Hobby team (we assume **no** and require `RECEIPT_GIT_TOKEN`).
5. Whether `oh-jay-s-projects` is already on Hobby with no billing method — must be confirmed in the dashboard.
6. Whether Oh-Jay’s Google account is eligible for the Gemini free tier from Nigeria (regions list includes Nigeria; individual projects may still be ineligible).
7. What happens at 0 Kane credits if someone *later* adds a card (do not add one). Whether Slack will in fact top up.
8. Vercel `deployment_status` payload shape can differ (`environment_url` vs `target_url`); official example already ORs both. Association of a deployment SHA to a PR is a GitHub API call, not a Kane doc.
9. Authoritative submission form: SurveyMonkey fields were read (see `submission-draft.md`); kaneclihack.sh `/o/submit` is still behind a login, so its exact boxes are not fully inventoried. Until Slack clarifies, be ready to fill **both**.
10. “Initialized on or after 12 November” has no official timezone; we use the safer Luma start **11:30 PM WAT**.
