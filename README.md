# Receipt

Don’t merge a preview without a Receipt.

A drop-in GitHub Action that runs [Kane CLI](https://www.testmuai.com/docs/kane-cli-introduction) on the Vercel preview of a pull request, against a tagged How-to-test contract in this README. Kane pins a sealed evidence pack on the PR. If the preview is lying, a fixer may patch **allowlisted app source only** (`shop/**`) — never this contract, never the workflow — and Kane replays the same saved `_test.md`.

---

## For Judges (about two minutes)

1. Open the live site: https://receipt-taupe-one.vercel.app — home is the Receipt product, with paths to How it works, Docs, Proof, and the demo shop. The fixture Kane guards is at `/shop`.
2. Open `/pricing` (also at `/shop/pricing`). Pro is **$19**. Open `/checkout` (also at `/shop/checkout`). The total is **$29**. Enter **LAUNCH10** — the total should become **$17.10** but does not move. Click **Phone layout (390px)**, then **Pay** — Pay is covered. Those are the three seeded bugs. Production stays on `main`.
3. Open the three-bug proof PR (leave it open): https://github.com/ohjay-official/receipt/pull/3
4. The Receipt comment is a card: **passed**, all five Kane steps green, attempts **1 / 3**. The catch is in the red run: Kane failed “Checkout must show $19 for Pro” (coupon and Pay were skipped after that first required failure).
5. See `receipt-fix: 1` (`186ecdc`). It touches only `shop/lib/prices.ts` and `shop/lib/checkout.ts` — checkout $19, LAUNCH10 yields $17.10, Pay overlay off. The later Receipt run is green, including “Pay works in the phone layout.”
6. Open the refusal proof PR (leave it open): https://github.com/ohjay-official/receipt/pull/4  
   Kane failed the $29 checkout again. The fixer proposed a cheating edit to the Kane test. Receipt did **not** push. The card says **Fix refused:** `Receipt refused fix: touched tests/checkout_test.md`.

Proof (do not trust a green badge without the clip):

- Production (product site; all three bugs still present on the shop): https://receipt-taupe-one.vercel.app
- Three-bug PR: https://github.com/ohjay-official/receipt/pull/3
- Preview after the fix (`/checkout` is $19, coupon and Pay work): https://receipt-git-demo-t3-three-bugs-oh-jay-s-projects.vercel.app
- Red Kane run (the $29 catch; coupon and Pay skipped): https://github.com/ohjay-official/receipt/actions/runs/43698574333
- Evidence of that catch: https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14155571858
- Fixer commit: `receipt-fix: 1` (`186ecdc`)
- Green re-verify (fixer push, `pull_request`, no manual dispatch): https://github.com/ohjay-official/receipt/actions/runs/43699955024
- Green evidence: https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14156410343
- Refusal PR: https://github.com/ohjay-official/receipt/pull/4
- Refusal run (`RECEIPT_DEMO_CHEAT=1`, no fixer commit): https://github.com/ohjay-official/receipt/actions/runs/43700368892
- Refusal evidence: https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14155439852

After the multi-page site rebuild, a fresh proof PR confirmed the same loop (leave it open too):

- Rebuild verification PR: https://github.com/ohjay-official/receipt/pull/5
- Preview after the fix: https://receipt-git-demo-t12-site-loop-oh-jay-s-projects.vercel.app
- Red Kane run: https://github.com/ohjay-official/receipt/actions/runs/43701888824
- Evidence of that catch: https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14157390481
- Fixer commit: `receipt-fix: 1` (`55b2815`) — `shop/lib/prices.ts` and `shop/lib/checkout.ts` only
- Green re-verify (all five steps, attempts 1 / 3): https://github.com/ohjay-official/receipt/actions/runs/43702361655
- Green evidence: https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14156718986

Earlier loops (leave #1 and #2 open as well):

- First live catch and green re-verify: [PR #1](https://github.com/ohjay-official/receipt/pull/1) — red [43683895636](https://github.com/ohjay-official/receipt/actions/runs/43683895636), green [43684482513](https://github.com/ohjay-official/receipt/actions/runs/43684482513)
- First closed autonomous loop (`pull_request` only): [PR #2](https://github.com/ohjay-official/receipt/pull/2) — red [43686930592](https://github.com/ohjay-official/receipt/actions/runs/43686930592), fix [`e7542b0`](https://github.com/ohjay-official/receipt/commit/e7542b0), green [43687402846](https://github.com/ohjay-official/receipt/actions/runs/43687402846)

CI: Action unit tests and Shop build stay green. On `main`, the Shop contracts job stays red on purpose: checkout is $29, coupon LAUNCH10 does not take 10% off $19, Pay is blocked at 390px / in Phone layout, and the unit tests assert the correct contracts. After a successful `receipt-fix` on a demo PR, those shop tests go green on that branch only. Production on `main` keeps the seeded bugs.

Honest limits (also in the notes below): Kane 0.10.4 replay ignores `--url` (Receipt remaps recordings). Kane’s CI Chrome is 1920px and has no window-resize action, so the Pay check uses the in-page Phone layout control plus a `max-width: 900px` overlay that a real phone still hits. A stale Test Manager write lock blocked the first PR #3 runs; the contract now lives at `tests/receipt_checkout_test.md`.

---

## How to test

<!-- kane:how-to-test -->

1. Open the preview (or live) site’s `/pricing` page and confirm the Pro plan is **$19**.
2. Choose Pro and continue to checkout (`/checkout`).
3. Checkout must show **$19** for Pro, not any other amount.
4. Enter coupon code **LAUNCH10** and apply it. The Pro total must become **$17.10** (10% off $19), not stay the same, show NaN, or any other amount.
5. Click **Phone layout (390px)**, then click **Pay**. A confirmation such as “Payment accepted” must appear. Fail if Pay does nothing, is covered, or cannot be clicked in that layout. A real 390px phone must also work: the same overlay applies at `max-width: 900px`.

<!-- /kane:how-to-test -->

Time: under one minute on the live site, plus the PR comment if you are checking the loop.

The first Kane run on a PR that still has the seeded bugs (checkout **$29**, coupon **LAUNCH10** applied wrong, Pay covered at **390px**) is expected to be **red**. After a successful fixer commit, the same test should replay **green**.

### Honest note: Kane 0.10.4 has no 390px viewport setting

Official testmd frontmatter has no viewport or device-width key. `kane-cli config set-window` rejects widths under 800px. Kane “mobile” targets are native apps, not a Chrome phone viewport, and `--remote` is out of scope on a $0 budget. On PR #3 Kane also showed that the CI Chrome session is 1920px and exposes **no window-resize action**, so a “resize to 800px” step fails as an environment issue and never clicks Pay. Step 5 therefore uses an in-page **Phone layout (390px)** control that applies the same overlay a 390px phone (and any window `max-width: 900px`) hits. Kane must not try to resize the browser.

### Honest note: Kane 0.10.4 replay ignores `--url`

`kane-cli testmd run --url` sets the start URL for a **fresh author** run. On **replay**, Kane 0.10.4 ignores `--url` and navigates to the origin baked into `the committed `tests/output-*/.internal` recordings` — the preview that was live when the recording was authored. We found this on pull request #2: replay opened the already-fixed demo alias and false-greened a branch whose checkout was still $29.

Receipt works around it on **every** run, for any new PR, not just #2: before Kane starts, the action rewrites every recorded Vercel start/navigate origin to the preview under test, and discards a stale committed `Result.md` so a previous pass cannot classify this run.

---

## Install tonight

On a public GitHub repo deployed to Vercel (Deployment Protection off so Kane sees the app, not a login wall):

1. Add repository secrets `LT_USERNAME`, `LT_ACCESS_KEY`, and — if you want the fixer — `GEMINI_API_KEY` plus `RECEIPT_GIT_TOKEN` (a fine-grained PAT of the Vercel Hobby owner, Contents: write, so Hobby will actually deploy the fixer push).
2. Copy `tests/receipt_checkout_test.md` and this How-to-test block, then add:

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
          test-file: tests/receipt_checkout_test.md
          username: ${{ secrets.LT_USERNAME }}
          access-key: ${{ secrets.LT_ACCESS_KEY }}
          gemini-api-key: ${{ secrets.GEMINI_API_KEY }}
```

**TBD-post-build:** pin `@main` to a release tag once one exists.

The Kane command the action runs:

```bash
kane-cli testmd run tests/receipt_checkout_test.md   --agent --headless --timeout 300 --max-steps 40   --url "$PREVIEW_URL"   --name receipt-checkout   --username "$LT_USERNAME" --access-key "$LT_ACCESS_KEY"
```

`--url` is the start URL for a fresh author run. When `tests/output-receipt_checkout/` recordings are committed, unchanged steps replay from them. Because Kane 0.10.4 replay ignores `--url` (see the honest note above), Receipt remaps those recordings onto the current preview before each run. The original `tests/output-checkout/` recordings were removed after a stale Test Manager write lock on that test id blocked PR #3 for over 50 minutes; the next live run authors a new test. Recordings will be committed again after a successful authoring.

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


## Site

The production deploy is a multi-page Receipt site, not a one-page shop mock. `/pricing` and `/checkout` remain working aliases so the How-to-test contract does not have to change.

- Home: https://receipt-taupe-one.vercel.app
- How it works: https://receipt-taupe-one.vercel.app/how-it-works
- Docs: https://receipt-taupe-one.vercel.app/docs
  - Install: https://receipt-taupe-one.vercel.app/docs/install
  - The contract: https://receipt-taupe-one.vercel.app/docs/contract
  - Configuration: https://receipt-taupe-one.vercel.app/docs/configuration
  - Guardrails: https://receipt-taupe-one.vercel.app/docs/guardrails
  - Limitations: https://receipt-taupe-one.vercel.app/docs/limitations
- Proof: https://receipt-taupe-one.vercel.app/proof
- Demo shop: https://receipt-taupe-one.vercel.app/shop
  - Plans: https://receipt-taupe-one.vercel.app/shop/pricing (alias: `/pricing`)
  - Cart: https://receipt-taupe-one.vercel.app/shop/cart
  - Checkout: https://receipt-taupe-one.vercel.app/shop/checkout (alias: `/checkout`)

## Repo map

- `action.yml` / `src/` — the composite Receipt action
- `shop/` — Next.js site: Receipt marketing, docs, proof, and the Field & Ledger demo shop (`/pricing` $19, `/checkout` $29; aliases of `/shop/pricing` and `/shop/checkout`)
- `tests/receipt_checkout_test.md` — the Kane contract
- `.github/workflows/receipt.yml` — demo workflow (`pull_request` / `repository_dispatch` / `deployment_status` / `workflow_dispatch`)
- `.github/workflows/ci.yml` — unit tests and `next build`
- `docs/` — brief, spec, plan, research pack
