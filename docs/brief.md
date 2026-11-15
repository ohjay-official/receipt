# Brief — Receipt

**Event:** Kane CLI Online Hackathon, 12–19 Nov 2026  
**Written:** Thu 12 Nov 2026, Africa/Lagos  
**Decision:** Oh-Jay picked Preview-then-proof (#1). This is the most ambitious version that still has a 2–3 day core loop for a solo phone-only builder (GitHub → Vercel, Kane in Actions).  
**Gate 3:** builder approves this brief, the name, the scope cuts, and the demo script before a spec.

---

## Name

Three candidates:

1. **Receipt** — the evidence pack on the PR is the receipt that the preview matches what you claimed. Short, memorable, “install tonight.”
2. **Verbatim** — the How-to-test contract and the $19 claim must be true word for word; a fixer cannot edit the claim away.
3. **Claimcheck** — the clearest label; a little flatter.

**Pick: Receipt.**  
Line to end the demo on: “Don’t merge a preview without a Receipt.”

---

## Problem (one sentence)

An AI coding agent can ship a Vercel preview whose pricing page promises one number and whose checkout charges another, and nothing in CI proves the lie before someone merges.

## Solution (one line)

**Receipt** is a drop-in GitHub Action that runs Kane on the Vercel preview against a tagged How-to-test contract in the README, pins the evidence on the PR, and lets a fixer agent read Kane’s failure and patch the *app* — never the contract — until the same flow replays green.

---

## Must-have features (only three)

1. **Preview gate with evidence on the PR.** On `pull_request`, wait for the Vercel preview (retries; fall back to the stable production URL if the preview is not ready), run the committed Kane flow in headless Chrome, and post the verdict plus evidence clip on the PR.  
   **Hits:** Ships, Verified, Craft (this is the thing a dev installs tonight).

2. **Tagged How-to-test contract, with the pricing/checkout mismatch as the demo bug.** The README holds a fenced `<!-- kane:how-to-test -->` block whose claim is: choose Pro at **$19**, and checkout must show **$19**. The fixture app’s pricing page says $19; checkout is seeded at $29. Kane must catch that mismatch. A “fix” that only edits the README or the $19 claim fails the check.  
   **Hits:** Verified (a meaningful, obvious lie), Craft (the README is a contract you cannot wriggle out of).

3. **Closed-loop fixer, cap of three, cheap replay.** If Kane exits 1, a fixer job reads `Result.md` / NDJSON / the evidence one-liner, patches application code, pushes, and Kane *replays the same saved `_test.md`*. Stop after three attempts or on exit 0. Do not spin on exit 2 (setup/auth/Chrome).  
   **Hits:** Closed loop, Verified (the second run is a real replay, not a new smoke test).

Nothing else is required to demo or to score.

---

## The one defensible angle

We will not out-spectacle KANE vs. ABLE, and we will not rebuild GuardianKane’s local Claude Code cockpit or demo.studio’s Kane-as-filmer. We win on the official Craft test — “would a developer want to install this tonight?” — and on a Verified moment every judge can see in one look: the page said $19, checkout said $29, Kane has the clip, the agent had to fix the *product*.

Versus **GuardianKane**: same “done is earned” spirit, different surface. Receipt is a drop-in Action on the preview deploy any GitHub+Vercel repo can add tonight, not an IDE extension that needs a local browser. Versus **demo.studio**: Kane is the independent verifier and the loop, not the product’s runtime camera. Versus **plain Playwright CI**: Playwright gives the agent click tools and lets that same agent decide pass/fail; you also maintain selectors. Kane returns its own verdict, a sealed evidence pack, and a free replay of unchanged steps. The fixer reads Kane’s result, not a screenshot it could misread.

The sharper Craft hook, kept tiny: the README How-to-test block is a contract the fixer is forbidden to weaken.

---

## 15-second money shot

The PR is already open. Kane is red. The evidence clip shows the pricing page at $19 and checkout still at $29. That is the entire first shot — no setup, no homepage.

---

## Out of scope (v1)

- A general README or changelog parser (only the tagged How-to-test block)
- Kane bisect, cron/synthetic monitors, MCP servers, local git hooks, Claude Code extensions
- Mobile, simulators, real devices, or `testrun run --remote`
- Kane `explore` / full PRD assurance suites (`context extract`, `maintain`, coverage dashboards)
- A custom evidence web app (use Kane’s evidence viewer + the PR comment)
- Publishing an `npx create-*` package
- Web3, Contri, Holdfast, or any wallet flow
- Productising a Vercel Deployment Protection bypass (for the demo project: disable protection or use a bypass; document it)
- Multiple fixture apps, a public SaaS, or Slack/email alerting

---

## Technical facts for the architect

**Stack shape.** One repo: a tiny Next.js (or equivalent) shop — pricing page + checkout — deployed GitHub → Vercel, plus `.github/workflows/receipt.yml`. Public repo. Cloud coding agents write the code; the builder never needs a local CLI.

**Kane in CI.** Use the official action `LambdaTest/kane-cli/integrations/github-action/kane-cli-browser-run` on `ubuntu-latest` (it installs Node, Chrome, and Kane) *or* the published manual recipe: `actions/setup-node`, `browser-actions/setup-chrome`, `npm install -g @testmuai/kane-cli`, then `kane-cli testmd run` / `kane-cli run` with `--headless --agent --timeout 300 --name receipt-checkout`. Secrets: `LT_USERNAME` and `LT_ACCESS_KEY` (TestMu dashboard → Credentials). Never `kane-cli login` in CI (OAuth needs a browser). Never commit keys. Archive `.testmuai/evidence/` (`include-hidden-files: true`). Official action can also post the PR comment.

**Preview detection and Deployment Protection.** After checkout, resolve the preview URL for this PR (Vercel GitHub deployment environment URL, or the `deployment_status` / Vercel API / official Vercel preview comment). Poll until HTTP 200 or timeout (~2–3 minutes). If the preview is not ready, **fall back to the stable production URL** so the demo and the judges are not blocked. Kane must see the *app*, not Vercel’s SSO wall: on the demo Vercel project, turn Deployment Protection off (or add a bypass the workflow can use). A protection login is a false Kane fail. Pass `--url` explicitly.

**How-to-test block.** A clearly delimited README section, e.g. between `<!-- kane:how-to-test -->` and `<!-- /kane:how-to-test -->`, containing the one imperative claim (Pro is $19 and checkout shows $19). The workflow reads only that block to build or confirm the Kane objective / `_test.md`. Commit `_test.md` on the first green *authoring* run and reuse it.

**Fixer inbox.** On Kane exit 1, the next job in the *same* workflow reads `Result.md`, NDJSON, and/or the action’s summary one-liner from the workspace / artefact — not a human paste, not a Cursor webhook, not Copilot-issue assignment (those are not judge-reproducible). Prompt the fixer with: the How-to-test claim, the Kane failure text, and a diff-allowed path list (app source only). Reject a patch that modifies the tagged README block or the `_test.md` contract while the run is still red.

**Replay and the 3-try cap.** After a fix push, run the *same* committed `_test.md`. Unchanged steps replay from cache with no LLM/credit cost; only UI that actually changed is re-authored. Loop: attempt 0 (initial verify) + up to 3 fixer cycles. Stop on exit 0, after 3 failed fixes, or on exit 2 (do not retry setup errors blindly — fail the job with the log). Use `concurrency` so only the latest push on the PR runs. `--max-steps` and `--timeout` are mandatory.

**Seeded bug, honest loop.** Checkout is *seeded* at $29 so the first run is a meaningful red. The fixer must still read Kane’s result and edit checkout logic/copy; a hardcoded “set price to 19” script that ignores `Result.md` fails the Closed-loop bar.

**Fixer LLM — Gemini free tier (verified 12 Nov 2026 against official docs).**

- **Create a key from Nigeria:** Yes, in principle. Nigeria is listed among the countries where “The Gemini API and Google AI Studio are available.” Create or view a key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Store it as the Actions secret `GEMINI_API_KEY` (or `GOOGLE_API_KEY`; if both are set, `GOOGLE_API_KEY` wins). Source: [Available regions](https://ai.google.dev/gemini-api/docs/available-regions), [Using Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key).
- **Free tier exists:** “Start building free of charge with generous limits.” The Free plan lists limited model access, free input and output tokens, and AI Studio access; free-tier content may be used to improve Google’s products. Source: [Gemini Developer API pricing](https://ai.google.dev/gemini-api/docs/pricing).
- **Models (use these, not Gemini 4):** On the Free tier, input and output are “Free of charge” for `gemini-3.8-flash` (described as the most intelligent Flash, for software engineering and agents), `gemini-3.6-flash`, `gemini-3.5-flash-lite`, and `gemini-3.1-flash-lite`. **Not available** on the Free tier: `gemini-4-carbon`, `gemini-4-argon`, `gemini-3.1-pro-preview`. Default the fixer to **`gemini-3.8-flash`**; if that model returns a rate-limit or availability error, retry once on **`gemini-3.5-flash-lite`**. Source: [pricing](https://ai.google.dev/gemini-api/docs/pricing).
- **Rate limits:** Official docs do **not** publish a static RPM/TPM/RPD table for those Flash models. “Rate limits depend on a variety of factors (such as your usage tier) and can be viewed in Google AI Studio.” “Specified rate limits are not guaranteed and actual capacity may vary.” Limits are **per project, not per API key**. Requests-per-day quotas reset at midnight Pacific time. The Free usage tier is “Active project or free trial; some projects need verification.” Exceeding a limit returns `429 RESOURCE_EXHAUSTED`; official guidance is exponential backoff (client SDKs retry). Source: [Rate limits](https://ai.google.dev/gemini-api/docs/rate-limits). **Do not treat third-party blogs’ 5 RPM / 20 RPD figures as official.** Oh-Jay should open [AI Studio rate limits](https://aistudio.google.com/rate-limit?timeRange=last-28-days) after creating the key and paste the live numbers into the spec.
- **Eligibility caveat:** “Not all Google Cloud projects or accounts are eligible for the Gemini API free tier.” A project may show “Free tier unavailable.” A new key in the *same* project will not fix that; the official path is to upgrade that project to the paid tier (which does not unlock free-tier quota). Some accounts need device verification (`FREE_TIER_VERIFICATION_REQUIRED`). Source: [Troubleshooting](https://ai.google.dev/gemini-api/docs/troubleshooting). **Day-one builder task:** create the AI Studio key from Nigeria, confirm the project is on the Free tier, and store `GEMINI_API_KEY`.
- **One fallback:** If the Gemini key cannot be created, the project is not eligible for the free tier, or Gemini keeps returning 403/429 after backoff, the fixer should call the **OpenAI API** with `OPENAI_API_KEY` (a small current chat model, e.g. whatever is cheapest and allowed at build time). This is paid. Same contract: read `Result.md`, patch app code only, cap 3. Do not depend on Copilot coding-agent issue assignment as the scored loop.

**Credits (Kane).** First authoring of the checkout flow spends Kane credits; unchanged replay does not. Keep the `_test.md` objective stable and fix the app to match it (also the contract rule). 10,000 hackathon credits are ample for this loop.

---

## 60-second demo script

Pace: about 2.4 words per second, ~144 words, product working in the first 10 seconds. Record the PR and evidence first; do not start on a slide.

**0:00–0:10**  
Kane’s check is already red on this pull request. Open the evidence: pricing says Pro is nineteen dollars. Checkout still says twenty-nine.

**0:10–0:25**  
That is the bug Kane caught on the Vercel preview. Not a missing button. A price the site promised and checkout broke.

**0:25–0:40**  
Here is the contract, tagged in the README: choose Pro at nineteen dollars, and checkout must show nineteen. The fixer may not edit that line.

**0:40–0:52**  
Watch the closed loop. The fixer job reads Kane’s result file, patches the checkout amount, and pushes a commit. It does not touch the README. Kane then replays the same saved flow, at no new model cost. The check goes green.

**0:52–0:60**  
The red clip and the green clip sit side by side on the pull request. One GitHub Action. Add it tonight. Don’t merge a preview without a Receipt.

138 words, about 58 seconds at 2.4 words per second. Shot list: (1) PR with red check + evidence clip of $19 vs $29; (2) README tagged block; (3) fixer commit on the PR; (4) green replay + both clips; (5) end card with the name. No secrets on screen. Record a backup early; leave a live URL and a “do X, see Y” README for judges.

---

## Demo script word count (for the 2.4 wps check)

- 0:00–0:10: 22 words (~9 s). Product is already on screen.
- 0:10–0:20: 22 words (~9 s).
- 0:20–0:30: 25 words (~10 s).
- 0:30–0:47: 41 words (~17 s).
- 0:47–0:59: 28 words (~12 s).

Body total: 138 words, about 58 seconds. Slightly under a 60-second cap is safer than going over. The timestamps in the script section above are the performance marks; if a read runs long, drop “Watch the closed loop.”

---

## Open day-one tasks for the builder (not the spec yet)

1. Approve this brief, the name **Receipt**, and the out-of-scope list.
2. Sign up on testmuai.com, copy `LT_USERNAME` / `LT_ACCESS_KEY` into GitHub Actions secrets (after the repo exists, on or after the safe start Thu 12 Nov 2026, 11:30 PM WAT).
3. Create a Gemini API key in AI Studio, confirm Free-tier eligibility, store `GEMINI_API_KEY`; optionally add `OPENAI_API_KEY` as the fallback.
4. On the Vercel project, disable Deployment Protection for the demo.
