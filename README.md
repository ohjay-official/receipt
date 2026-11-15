# Receipt

Don’t merge a preview without a Receipt.

A drop-in GitHub Action that runs [Kane CLI](https://www.testmuai.com/docs/kane-cli-introduction) on the Vercel preview of a pull request, against a tagged How-to-test contract in this README. Kane pins a sealed evidence pack on the PR. If the preview is lying, a fixer may patch **allowlisted app source only** (`shop/**`) — never this contract, never the workflow — and Kane replays the same saved `_test.md`.

---

## For Judges (about two minutes)

1. Open the live shop: **TBD-post-build:** `<production URL>`
2. Open `/pricing`. Pro is **$19**. Open `/checkout`. The total is **$29**. That mismatch is the seeded bug.
3. Open the demo pull request: **TBD-post-build:** `<PR URL>`
4. Read the Receipt comment. Kane is red, with evidence of $19 vs $29.
5. See a later `receipt-fix: 1` commit that touches only `shop/**` (this README is unchanged) and a Receipt comment that has gone green.

The Action run, the evidence artifact, and `tests/output-checkout/Result.md` are the proof. Do not trust a green badge without the clip.

**TBD-post-build:** Actions run URL, evidence viewer link, production URL, demo PR URL.

---

## How to test

<!-- kane:how-to-test -->

1. Open the preview (or live) site’s `/pricing` page and confirm the Pro plan is **$19**.
2. Choose Pro and continue to checkout (`/checkout`).
3. Checkout must show **$19** for Pro, not any other amount.

<!-- /kane:how-to-test -->

Time: under one minute on the live site, plus the PR comment if you are checking the loop.

The first Kane run on a PR that still has the seeded $29 checkout is expected to be **red**. After a successful fixer commit, the same test should replay **green**.

---

## Install tonight

On a public GitHub repo deployed to Vercel (Deployment Protection off so Kane sees the app, not a login wall):

1. Add repository secrets `LT_USERNAME`, `LT_ACCESS_KEY`, and — if you want the fixer — `GEMINI_API_KEY` plus `RECEIPT_GIT_TOKEN` (a fine-grained PAT of the Vercel Hobby owner, Contents: write, so Hobby will actually deploy the fixer push).
2. Copy `tests/checkout_test.md` and this How-to-test block, then add:

```yaml
# .github/workflows/receipt.yml
name: Receipt
on:
  deployment_status:
permissions:
  contents: read
  pull-requests: write
jobs:
  receipt:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    timeout-minutes: 30
    env:
      RECEIPT_GIT_TOKEN: ${{ secrets.RECEIPT_GIT_TOKEN }}
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.deployment.sha }}
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

`--url` overrides the test file’s frontmatter start URL so each Vercel preview can be checked without rewriting the contract. Unchanged steps replay from `tests/output-checkout/` once that folder is committed after the first authored run.

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

CI runs both on every push. The shop tests assert that pricing is $19 and checkout is still seeded at $29 — they document the bug, they do not “fix” it.

---

## Secrets and cost

GitHub Actions secrets only, never in logs or in this repo: `LT_USERNAME`, `LT_ACCESS_KEY`, `GEMINI_API_KEY`, `RECEIPT_GIT_TOKEN`.

This project is built to stay on **$0**: Kane’s free 10,000-credit grant, GitHub Actions on a public repo, Vercel Hobby, Gemini free Flash (`gemini-3.8-flash`, backoff on 429, one retry on `gemini-3.5-flash-lite`). There is no paid OpenAI fallback. Do not add a billing account to “be safe.”

---

## Repo map

- `action.yml` / `src/` — the composite Receipt action
- `shop/` — Next.js fixture (`/pricing` $19, `/checkout` $29)
- `tests/checkout_test.md` — the Kane contract
- `.github/workflows/receipt.yml` — `deployment_status` demo workflow
- `.github/workflows/ci.yml` — unit tests and `next build`
- `docs/` — brief, spec, plan, research pack
