# Receipt

Don’t merge a preview without a Receipt.

A drop-in GitHub Action that runs [Kane CLI](https://www.testmuai.com/docs/kane-cli-introduction) on the Vercel preview of a pull request, against a tagged How-to-test contract in this README. Kane pins a sealed evidence pack on the PR. If the preview is lying, a fixer may patch **allowlisted app source only** (`shop/**`) — never this contract, never the workflow — and Kane replays the same saved `_test.md`.

---

## For Judges (about two minutes)

1. Open the live shop: https://receipt-taupe-one.vercel.app
2. Open `/pricing`. Pro is **$19**. Open `/checkout`. The total is **$29**. That mismatch is the seeded bug (production is still on `main`).
3. Open the demo pull request: https://github.com/ohjay-official/receipt/pull/1
4. The Receipt comment is now **green**. The catch is in the red run: Kane failed “Checkout must show $19 for Pro” with a bug verdict that checkout rendered **$29**.
5. See commit `receipt-fix: 1` (`9492501`). It touches only `shop/**` (this README is unchanged). The later Receipt comment and run are green.

Proof (do not trust a green badge without the clip):

- Production (bug still present): https://receipt-taupe-one.vercel.app
- Demo PR: https://github.com/ohjay-official/receipt/pull/1
- Preview after the fix (`/checkout` is $19): https://receipt-git-demo-t6-first-kane-run-oh-jay-s-projects.vercel.app
- Red Kane run (the $29 catch): https://github.com/ohjay-official/receipt/actions/runs/43683895636
- Evidence of that catch: https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14149438398
- Green re-verify (manual `workflow_dispatch`): https://github.com/ohjay-official/receipt/actions/runs/43684482513
- Green evidence: https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14149882316
- Auto-trigger green run on the demo PR (`pull_request`, no manual dispatch): https://github.com/ohjay-official/receipt/actions/runs/43685063728
- Evidence from that auto-run (includes `tests/output-checkout/` recordings): https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14149699945
- Auto-trigger proof PR (leave open): https://github.com/ohjay-official/receipt/pull/2
- Proof-PR preview (after `receipt-fix: 1`, `/checkout` is $19): https://receipt-git-demo-t8-auto-trigger-proof-oh-jay-s-projects.vercel.app
- Auto-trigger red run on that PR (replay remapped onto the $29 preview): https://github.com/ohjay-official/receipt/actions/runs/43686930592
- Evidence of that $29 catch: https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14150678568
- Fixer commit on #2: `receipt-fix: 1` (`e7542b0`), `shop/lib/prices.ts` only
- Auto-trigger green re-verify (fixer push, no manual dispatch): https://github.com/ohjay-official/receipt/actions/runs/43687402846
- Green evidence: https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14150359940

CI: Action unit tests and Shop build stay green. On `main`, the Shop contracts job stays red on purpose: checkout is $29, coupon LAUNCH10 does not take 10% off $19, Pay is blocked at 390px, and the unit tests assert the correct contracts. After a successful `receipt-fix` on a demo PR, those shop tests go green on that branch only. Production on `main` keeps the seeded bugs.

---

## How to test

<!-- kane:how-to-test -->

1. Open the preview (or live) site’s `/pricing` page and confirm the Pro plan is **$19**.
2. Choose Pro and continue to checkout (`/checkout`).
3. Checkout must show **$19** for Pro, not any other amount.
4. Enter coupon code **LAUNCH10** and apply it. The Pro total must become **$17.10** (10% off $19), not stay the same, show NaN, or any other amount.
5. Use a narrow viewport and click **Pay**. A confirmation such as “Payment accepted” must appear. Fail if Pay does nothing, is covered, or cannot be clicked. A 390px phone must hit this; Kane 0.10 cannot open a window under 800px, so the test resizes to **800px** and the overlay also applies at `max-width: 900px`.

<!-- /kane:how-to-test -->

Time: under one minute on the live site, plus the PR comment if you are checking the loop.

The first Kane run on a PR that still has the seeded bugs (checkout **$29**, coupon **LAUNCH10** applied wrong, Pay covered at **390px**) is expected to be **red**. After a successful fixer commit, the same test should replay **green**.

### Honest note: Kane 0.10.4 has no 390px viewport setting

Official testmd frontmatter has no viewport or device-width key. `kane-cli config set-window` rejects widths under 800px. Kane “mobile” targets (`emulator`, `simulator`, `android`, `ios`) are native apps, not a Chrome phone viewport, and `--remote` is out of scope on a $0 budget. Step 5 therefore tells Kane to resize to 800px (its minimum) and not to keep retrying a 390px window. The seeded Pay overlay is a CSS `@media (max-width: 900px)` rule, so a 390px phone and Kane’s 800px window both hit the bug; a wide desktop viewport does not.

### Honest note: Kane 0.10.4 replay ignores `--url`

`kane-cli testmd run --url` sets the start URL for a **fresh author** run. On **replay**, Kane 0.10.4 ignores `--url` and navigates to the origin baked into `tests/output-checkout/.internal` — the preview that was live when the recording was authored. We found this on pull request #2: replay opened the already-fixed demo alias and false-greened a branch whose checkout was still $29.

Receipt works around it on **every** run, for any new PR, not just #2: before Kane starts, the action rewrites every recorded Vercel start/navigate origin to the preview under test, and discards a stale committed `Result.md` so a previous pass cannot classify this run.

---

## Install tonight

On a public GitHub repo deployed to Vercel (Deployment Protection off so Kane sees the app, not a login wall):

1. Add repository secrets `LT_USERNAME`, `LT_ACCESS_KEY`, and — if you want the fixer — `GEMINI_API_KEY` plus `RECEIPT_GIT_TOKEN` (a fine-grained PAT of the Vercel Hobby owner, Contents: write, so Hobby will actually deploy the fixer push).
2. Copy `tests/checkout_test.md` and this How-to-test block, then add:

```yaml
# .github/workflows/receipt.yml
name: Receipt
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
  repository_dispatch:
    types: [vercel.deployment.ready]
  deployment_status:
  workflow_dispatch:
    inputs:
      preview_url:
        required: false
        type: string
permissions:
  contents: read
  pull-requests: write
jobs:
  receipt:
    if: >
      github.event_name == 'pull_request' ||
      github.event_name == 'workflow_dispatch' ||
      (github.event_name == 'repository_dispatch' && github.event.action == 'vercel.deployment.ready') ||
      (github.event_name == 'deployment_status' && github.event.deployment_status.state == 'success')
    runs-on: ubuntu-latest
    timeout-minutes: 30
    env:
      RECEIPT_GIT_TOKEN: ${{ secrets.RECEIPT_GIT_TOKEN }}
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.client_payload.git.sha || github.event.pull_request.head.sha || github.event.deployment.sha || github.sha }}
          fetch-depth: 0
          token: ${{ secrets.RECEIPT_GIT_TOKEN || github.token }}
      - uses: ohjay-official/receipt@main
        with:
          test-file: tests/checkout_test.md
          username: ${{ secrets.LT_USERNAME }}
          access-key: ${{ secrets.LT_ACCESS_KEY }}
          gemini-api-key: ${{ secrets.GEMINI_API_KEY }}
```

**TBD-post-build:** pin `@main` to a release tag once one exists.

The Kane command the action runs:

```bash
kane-cli testmd run tests/checkout_test.md   --agent --headless --timeout 300 --max-steps 40   --url "$PREVIEW_URL"   --name receipt-checkout   --username "$LT_USERNAME" --access-key "$LT_ACCESS_KEY"
```

`--url` is the start URL for a fresh author run. Unchanged steps replay from the committed `tests/output-checkout/` recordings. Because Kane 0.10.4 replay ignores `--url` (see the honest note above), Receipt remaps those recordings onto the current preview before each run.

---

## What this is, and is not

The product is the Action, not a new test framework. Kane is the independent verdict and evidence pack. Playwright CI would let the same coding agent grade its own homework; Receipt will not let that agent edit this How-to-test block to make a red run go away.

Out of scope: a general README parser, MCP, mobile / `--remote`, cron, a custom evidence app, Web3.

---

## Local checks (no Kane credits)

```bash
# Action unit tests (path guard, attempt cap, Result.md parsing)
npm ci && npm test

# Shop fixture
cd shop && npm ci && npm test && npm run build
```

CI runs both on every push. Shop tests assert that `/pricing` is $19, that checkout matches that published price, that coupon LAUNCH10 yields $17.10, and that Pay is clickable at 390px. On `main` those contract tests are red because the three seeded bugs are still present — that is the demo, not a broken build. After a successful `receipt-fix` on a demo PR, the shop tests go green on that branch only.

---

## Secrets and cost

GitHub Actions secrets only, never in logs or in this repo: `LT_USERNAME`, `LT_ACCESS_KEY`, `GEMINI_API_KEY`, `RECEIPT_GIT_TOKEN`.

This project is built to stay on **$0**: Kane’s free 10,000-credit grant, GitHub Actions on a public repo, Vercel Hobby, Gemini free Flash (`gemini-3.8-flash`, backoff on 429, 5xx, and transient `fetch failed`, then `gemini-3.5-flash-lite`). There is no paid OpenAI fallback. Do not add a billing account to “be safe.”

---

## Repo map

- `action.yml` / `src/` — the composite Receipt action
- `shop/` — Next.js fixture (`/pricing` $19, `/checkout` $29)
- `tests/checkout_test.md` — the Kane contract
- `.github/workflows/receipt.yml` — demo workflow (`pull_request` / `repository_dispatch` / `deployment_status` / `workflow_dispatch`)
- `.github/workflows/ci.yml` — unit tests and `next build`
- `docs/` — brief, spec, plan, research pack
