# Phase 0 — Logistics: Kane CLI Online Hackathon (Nov 12–19, 2026)

**Event:** Kane CLI Online Hackathon, hosted by TestMu AI (formerly LambdaTest)  
**Researched:** Thu 12 Nov 2026, morning, Africa/Lagos (WAT, UTC+1)  
**Primary sources compared:** [Luma event page](https://luma.com/kanecli-online-hackathon) (and its public API, `https://api.luma.com/url?url=kanecli-online-hackathon`) and the dedicated site [kaneclihack.sh](https://www.kaneclihack.sh/).  

**How to read this file:** every factual claim has a source URL. Where Luma and kaneclihack.sh disagree, the conflict is flagged in a **MISMATCH** callout. Inferences are labeled as such. Unresolved items are also listed in `gaps.md`.

This is a **second edition** of an online Kane CLI hackathon. A prior online edition ran 19–31 Aug 2026 ([luma.com/kanecli-online](https://luma.com/kanecli-online); winners recap: [testmuai.com/blog/kane-cli-hackathon-winners/](https://www.testmuai.com/blog/kane-cli-hackathon-winners/)). Do not mix rules or prizes from that event, or from the in-person Kane CLI Hack Days (30 May 2026 and 24 Oct 2026), with this one. The domain kaneclihack.sh also hosts leftover navigation for the in-person “Kane CLI Hack Day” (`/start`, `/teams`, `/match`, `/live`).

---

## 1. Official pages and which one to trust

| Page | Role | URL |
|---|---|---|
| Luma registration / long brief | RSVP, long-form rules, FAQs, SurveyMonkey submit link | https://luma.com/kanecli-online-hackathon |
| Dedicated event site | Shorter brief, team register/submit UI, slightly different rules | https://www.kaneclihack.sh/ |
| TestMu signup / credits | Eligibility + 10,000 credits | https://www.testmuai.com/register/ and https://www.testmuai.com/kane-cli/#creditOffer |
| Kane CLI docs | Install, auth, CI | https://www.testmuai.com/docs/kane-cli-introduction |
| Kane CLI GitHub | Source, changelog, Discord badge | https://github.com/LambdaTest/kane-cli |
| Submission (Luma) | SurveyMonkey form | https://www.surveymonkey.com/r/kane-cli-hackathon-submission |
| Submission (official site) | Logged-in `/o/submit` | https://www.kaneclihack.sh/o/submit |
| Linked terms on official site | TestMuConf 2026 conference T&Cs (see mismatch) | https://www.testmuai.com/testmuconf-2026/conference-terms-and-conditions/ |

Luma is the page the parent brief named as official. kaneclihack.sh presents itself as the event’s own site (same organizer, same dates, same cash split) and is more recent in a few places (OpenAI credits, required launch posts, public-repo-only, YouTube-only demo, 3–5 minute video). **Until Slack or email clarifies, treat the stricter of the two as the safe bar, and treat conflicts as unverified.**

---

## 2. Key dates (all times in Africa/Lagos / WAT)

Conversions use IST = UTC+5:30 and, for November, Pacific Standard Time (UTC−8). Sources for the written deadline: [Luma](https://luma.com/kanecli-online-hackathon), [kaneclihack.sh](https://www.kaneclihack.sh/). Sources for the Luma calendar block: Luma API `event.start_at` / `event.end_at` (`2026-11-12T22:30:00.000Z`–`2026-11-19T21:30:00.000Z`), timezone `America/Los_Angeles`.

| What | Official wording | Lagos (WAT) | Notes |
|---|---|---|---|
| Calendar date the build window is described as | “12 November to 19 November” / “Thu 12 Nov Kickoff. Building starts” | Thu 12 Nov – Thu 19 Nov | Neither page gives a kickoff *clock time*. [Luma](https://luma.com/kanecli-online-hackathon), [kaneclihack.sh](https://www.kaneclihack.sh/) |
| Luma calendar start | `2026-11-12T22:30:00.000Z` (2:30 PM PT) | **Thu 12 Nov 2026, 11:30 PM WAT** | API, not restated as a clock time on the written schedule. This is late tonight in Lagos. |
| Luma calendar end | `2026-11-19T21:30:00.000Z` (1:30 PM PT) | **Thu 19 Nov 2026, 10:30 PM WAT** | **Does not match** the written submission deadline (see below). Treat the written IST deadline as the one that matters for shipping, and treat this end stamp as a calendar-block artifact until confirmed. |
| **Submission deadline (authoritative written rule)** | “19 November, 11:59 PM IST (19 November, 10:29 AM PT)” | **Thu 19 Nov 2026, 7:29 PM WAT** | Same on both pages. “No pushes after this.” [Luma](https://luma.com/kanecli-online-hackathon), [kaneclihack.sh](https://www.kaneclihack.sh/) |
| Repo must be initialized on or after | “12 November” (no timezone stated) | Timezone **unspecified** | See mismatch below. Today (Thu 12 Nov, morning WAT) is already 12 November in WAT, IST, and PT. |
| Pre-hackathon details / cheat sheet | “sent over email before kickoff”; “A cheat sheet goes out with your confirmation email.” | Not timed | [Luma](https://luma.com/kanecli-online-hackathon) |
| Office hours | Luma: “A direct line to the engineers who built it, twice a day.” Official site: Slack for “help from the Kane CLI engineers,” no times. | **Times not published** | No Luma `sessions[]`. Details may be in the pre-hack email or Slack. |
| Winner announcement | Luma still says “Winner announcement: **[DATE]**, live on the winner stream. The stream link will be shared over email.” Official site does not name a date. | **Unknown** | Placeholder not filled as of this research pass. |
| Luma phrasing quirk | “Building: 12 November to 19 November (19 November, 11:30 AM PT onwards)” | 11:30 AM PT on 19 Nov = 8:30 PM WAT, which is **after** the 7:29 PM WAT deadline | Looks like a typo or leftover. Do not plan around 11:30 AM PT on the 19th. [Luma](https://luma.com/kanecli-online-hackathon) |

**MISMATCH — Luma calendar end vs written deadline.** Written deadline = 11:59 PM IST = 7:29 PM WAT on 19 Nov. Luma `end_at` = 10:30 PM WAT on 19 Nov. Ship as if the earlier written deadline is binding.

**MISMATCH / GAP — repo initialization timezone.** The rule is “Your repo must be initialized on or after 12 November, and we check commit history.” No timezone is given. Possible readings: calendar date in IST (host timezone on Luma is `Asia/Kolkata`), calendar date in PT (Luma event timezone), or “after official kickoff” (11:30 PM WAT tonight). The Aug 2026 edition used the same wording with “on or after 19 August.” **Safe inference, not a stated rule:** initialize the repo after the Luma start (Thu 12 Nov 2026, 11:30 PM WAT) so “built during the event” cannot be challenged. A repo created this morning is already dated 12 November in IST/WAT/PT, but it would predate the Luma calendar start.

---

## 3. Prizes

Cash total is **$3,000 USD**, split across three winners, on both pages.

| Place | Luma ([source](https://luma.com/kanecli-online-hackathon)) | kaneclihack.sh ([source](https://www.kaneclihack.sh/)) |
|---|---|---|
| 1st | $1,500 cash | $1,500 cash **+ $250 OpenAI credits** |
| 2nd | $1,000 cash | $1,000 cash **+ $250 OpenAI credits** |
| 3rd | $500 cash | $500 cash **+ $250 OpenAI credits** |

**Every winning team also receives** (both pages): a 1:1 with the TestMu AI founders; 3 months of Kane CLI Pro; a featured post on the TestMu AI blog. Luma also lists “Amplification across TestMu AI channels.”

**Every team that ships a working project by the deadline:** “Verified with Kane CLI” badge.  
**Every team that submits before the deadline:** participation certificate.

**MISMATCH — OpenAI credits.** Present on kaneclihack.sh for all three places (HTML confirmed: each podium block includes `+$250 OpenAI credits`). Absent from Luma. TestMu’s 29 Oct 2026 X post says “$3,000+ in prizes and credits” ([x.com/testmuai/status/2115766314681905400](https://x.com/testmuai/status/2115766314681905400)), which is consistent with extra credits existing, but does not specify $250 × 3. Treat +$250 OpenAI credits as stated on the dedicated site, unverified on Luma.

**Naming leftover:** “3 months of Kane CLI Pro.” Current pricing says Kane CLI itself “no longer has separate paid plans” and runs bill against KaneAI plan credits; KaneAI Pro is $99/agent/month with 12,000 credits ([pricing.md](https://www.testmuai.com/pricing.md)). What “Kane CLI Pro” means as a prize in Nov 2026 is not spelled out. The Oct 24 Hack Day page already used the newer phrasing “3 months of KaneAI Pro (worth $270).”

---

## 4. Eligibility and rules

Stated on both [Luma](https://luma.com/kanecli-online-hackathon) and [kaneclihack.sh](https://www.kaneclihack.sh/) unless noted:

- 18 or older; open worldwide; solo or teams of up to four.
- No application, no curation, no cap. “Register and build.”
- One team captain receives the prize.
- One submission per team. “If you want to build two things, build them with two teams.” (Luma)
- **The app and the Kane CLI integration must be built during the event.** “An old idea is fine; an old codebase is not.” Repo initialized on or after 12 November; commit history is checked.
- Any AI coding agent, any framework, any stack. Named examples: Claude Code, Cursor, Copilot, Codex, Windsurf, Kiro, or a custom MCP setup. “Kane CLI is the only required dependency.”
- **Must be signed up on testmuai.com and must have run Kane CLI**, or the entry cannot be scored / is ineligible.
- If the project depends on a login or paid service, hand judges working credentials. “We can't score what we can't run.”
- If it depends on a third-party service, include a fallback (recorded run or backup deploy).
- Submissions lock at the deadline; you cannot push fixes after it. Official site adds: you may update the submission as often as you like until then.
- Code stays yours. By submitting, you grant TestMu AI permission to feature the project in marketing materials with attribution.
- Judges’ / TestMu AI team’s decision is final and binding. No correspondence on individual results.
- TestMu AI may verify entries and disqualify fraudulent, automated, duplicated, or “gaming the mechanics” entries; may modify, suspend, or cancel the hackathon, or substitute a prize of equivalent value.
- Employees of TestMu AI and participating partners are not eligible to win.
- Prize fulfilment (method, timing, tax or regional restrictions) is handled by TestMu AI; winners may need to supply details first.
- Code of Conduct applies on Slack and all event channels. Concerns: Luma says [support@testmuai.com](mailto:support@testmuai.com); official site says [conferences@testmuai.com](mailto:conferences@testmuai.com).

**MISMATCH — contact email.** Luma contest guidelines and FAQs: `support@testmuai.com`. kaneclihack.sh: `conferences@testmuai.com`.

---

## 5. Registration steps

Do both of the following; Luma is explicit that Luma RSVP alone does **not** grant Kane credits.

1. **Register on Luma** (free, no approval, Standard ticket): https://luma.com/kanecli-online-hackathon  
   - Registration state from the API: `is_free: true`, `require_approval: false`, not sold out, no waitlist, no registration questions, full-name required, no phone required.  
   - Ticket-type count at research time: **205 registered** (`ticket_types[0].num_guests`). The top-level `guest_count` field was `0`, which looks like an API quirk; use the ticket-type count.  
   - Official site also has `https://www.kaneclihack.sh/o/register` (“Register yourself and your team”). Whether this is required in addition to Luma, or a parallel team roster, is **not stated**. Use the same email everywhere, as the official site says: “Use the same email on both.”
2. **Sign up at TestMu AI and claim 10,000 free Kane CLI credits:** https://www.testmuai.com/register/ or https://www.testmuai.com/kane-cli/#creditOffer  
   - “Every signup gets 10,000 credits, valid for one month.” “No code to redeem, no card required.” Entries without this signup cannot be scored. ([Luma](https://luma.com/kanecli-online-hackathon))
   - Pricing docs say the same grant is “valid for 30 days.” ([pricing.md](https://www.testmuai.com/pricing.md))
3. **Install Kane CLI and run one flow** (they ask this before writing code): `npm install -g @testmuai/kane-cli`, then an example from the docs. For a phone-only builder this cannot be done on the phone itself — see §10.
4. **Join Slack** (community + extra credits + engineer help). See §8.

---

## 6. Submission format and fields

**Deadline for all of it:** Thu 19 Nov 2026, 7:29 PM WAT.

### Luma — “Four things, all through one form”

Form: https://www.surveymonkey.com/r/kane-cli-hackathon-submission ([Luma](https://luma.com/kanecli-online-hackathon))

1. **GitHub repo:** “public, or invited access for the judges.” README with setup steps. Initialized on or after 12 November.
2. **A 3-minute demo video:** screen recording, “YouTube unlisted or Drive link.” Show the app working and show Kane running. “Judges watch this first, so lead with the interesting part.” Unlisted, not Private; test the link in an incognito window. FAQ: “What if my demo video is over 3 minutes? Judges stop watching at 3:00. Put the good part first.”
3. **One paragraph:** what you built, who it’s for, which agent you used, and what Kane is doing in the flow.
4. **A live URL or runnable command:** “judges should be able to see the app working in under 30 seconds.”

### kaneclihack.sh — “Five things, One form”

Form linked as https://www.kaneclihack.sh/o/submit (login wall: “Loading your submission…”). ([kaneclihack.sh](https://www.kaneclihack.sh/))

1. **GitHub URL** — “Your repo, started on or after 12 Nov.” Elsewhere: “Your GitHub repo must be public.”
2. **About your app** — what you built, which agent, what Kane does.
3. **Demo video** — “Hosted on YouTube. About 3 to 5 minutes.” FAQ: “Everything is a recorded YouTube video, about 3 to 5 minutes.” No Drive option mentioned.
4. **Live URL** — “If your project is deployed. **Optional.**”
5. **Launch buzz (Required + bonus)** — “At least two public posts about your project (Hacker News, X, Reddit or LinkedIn). More posts and engagement earn brownie points.” Repeated: “Launch buzz is required.”

**MISMATCHES (loud):**

| Topic | Luma | kaneclihack.sh |
|---|---|---|
| Submit form | SurveyMonkey | Logged-in `/o/submit` on the official site |
| Repo visibility | Public **or** invited access for judges | **Must be public** |
| Demo host | YouTube unlisted **or Google Drive** | **YouTube only** |
| Demo length | **3 minutes**, judges stop at 3:00 | **About 3 to 5 minutes** |
| Live URL | Required as “live URL or runnable command,” usable in under 30 seconds | Live URL **optional** |
| Public posts | Not mentioned | **At least two** posts on HN, X, Reddit, or LinkedIn, required |

**Safe bar until clarified:** public GitHub repo; YouTube unlisted video that lands the money shot in the first 3 minutes (and is no longer than 5); a live URL *and* a one-command fallback; one paragraph covering agent + Kane’s role; at least two public posts; submit through whichever form Slack/email confirms, and be ready to fill both if needed.

The exact SurveyMonkey field list was not opened in this pass (third-party form). Marked in `gaps.md`.

---

## 7. Tracks / lanes

There are **no required tracks**. Both pages say you do not have to pick a lane; anything that hits the brief is fair game. Lanes are starting-point menus only.

Luma names four lanes: (1) Apps that verify themselves, (2) Verification baked into your workflow, (3) Browser agents in the wild, (4) Requirements that test themselves. ([Luma](https://luma.com/kanecli-online-hackathon))

kaneclihack.sh names four slightly different buckets: (1) Apps that prove themselves (web + mobile), (2) Workflows with a spine, (3) Agents with hands, (4) Pure chaos / wildcard. ([kaneclihack.sh](https://www.kaneclihack.sh/))

The **challenge brief** on Luma is “Build a working **web app** with an AI coding agent.” The official site widens this to “Build an app, an agent or a workflow with an AI coding agent, **on web or mobile**.” Mobile is therefore advertised, but local iOS Simulator / Android Emulator support is macOS Apple Silicon only unless you use the cloud grid (`testrun run --remote`), which has plan requirements — see §10.

---

## 8. Community channel, office hours, kickoff

- **Official hackathon channel is Slack, not Discord.**  
  - Official site (repeated): https://join.slack.com/t/kaneai/shared_invite/zt-4gbmvhfsl-yGamCWg~qgSi~_OfZMScpw  
  - Luma “What’s included” uses that same `zt-4gbmvhfsl-…` link.  
  - Luma FAQ “Where do I ask questions” and Luma “Resources” use a **different** invite: https://join.slack.com/t/kaneai/shared_invite/zt-478cnz1pt-rqvZLRErunBZGyC3QRyoew  
  - **MISMATCH — two Slack invite URLs on the Luma page.** Prefer the link that appears on kaneclihack.sh and in Luma’s “What’s included” block; if it is expired, try the FAQ link or email.
- **Product Discord** (Kane CLI repo badge, not described as the hackathon channel): https://discord.gg/SqVMtNeWEf ([GitHub README](https://github.com/LambdaTest/kane-cli/blob/main/README.md))
- **Office hours / “twice a day” engineer line:** stated on Luma, **times not published**. No `sessions` in the Luma API. Official site only points to Slack. Pre-hackathon details are promised by email.
- **Kickoff event:** “Thu 12 Nov Kickoff. Building starts” with no agenda, stream, or clock time on the official site. Luma calendar start is 11:30 PM WAT. Whether there is a live kickoff stream is unverified.
- Luma `location_type` is `offline`, which is almost certainly a data error for an online hackathon.

---

## 9. Judging (summary; full verbatim quotes in `04-criteria.md`)

- Scored by **three TestMu AI engineers**, independently; scores averaged.
- Clear **three bars** first (“ready to ship”). Miss one and “the judges can't score the rest.”
- Then four dimensions, **weighted equally** (official site marks each **25%**): Ships, Verified, Closed loop, Craft.
- Ties break on Verified, then Closed loop.
- Named individual judges are **not published** for this edition.

---

## 10. Kane CLI — what it is, and phone-only feasibility

### What Kane CLI is (stated)

Kane CLI (`kane-cli`, npm `@testmuai/kane-cli`) is TestMu AI’s terminal tool for natural-language end-to-end tests. You describe a flow in plain English; it drives a real Chrome browser (or, on macOS Apple Silicon, an iOS Simulator / Android Emulator; or TestMu cloud real devices / a remote grid) and returns pass/fail plus a sealed evidence pack and a video/trace. Saved `_test.md` tests can be replayed from cache. It is also designed to be called by AI coding agents. ([docs intro](https://www.testmuai.com/docs/kane-cli-introduction), [GitHub README](https://github.com/LambdaTest/kane-cli/blob/main/README.md))

Current published version at research time: **0.10.3**, released 7 Nov 2026 ([npm](https://www.npmjs.com/package/@testmuai/kane-cli), [CHANGELOG](https://github.com/LambdaTest/kane-cli/blob/main/CHANGELOG.md)). Repo created 14 Apr 2026; 264 stars, 35 forks, Apache-2.0 ([GitHub API](https://api.github.com/repos/LambdaTest/kane-cli)).

### Install

- `npm install -g @testmuai/kane-cli` (Node 18+). Native binaries for macOS (arm64/x64), Linux (x64/arm64), Windows x64. **pnpm is not supported.** ([install docs](https://www.testmuai.com/docs/kane-cli-installation))
- Homebrew: `brew install LambdaTest/kane/kane-cli` (macOS/Linux; bundles Chrome; no Node required).
- Shell installer: `curl -fsSL https://raw.githubusercontent.com/LambdaTest/kane-cli/main/install.sh | sh` (or `| bash` on npm’s README).
- **Google Chrome must be on the machine** unless you point at a remote browser (`--cdp-endpoint` / `--ws-endpoint`) or run a suite with `testrun run --remote`. ([CI docs](https://www.testmuai.com/docs/kane-cli-cicd), [install docs](https://www.testmuai.com/docs/kane-cli-installation))

This cannot be installed or run on a phone. There is no official mobile app or in-browser Kane CLI.

### Auth / API keys

Two methods ([auth docs](https://www.testmuai.com/docs/kane-cli-authentication)):

1. **OAuth:** `kane-cli login --oauth` opens a browser. For everyday local use. Will not work on a headless CI runner.
2. **Basic auth (CI / non-interactive):** username + access key from the TestMu dashboard → Credentials. Pass `--username` and `--access-key`, or store them as GitHub Actions secrets `LT_USERNAME` and `LT_ACCESS_KEY`.

A phone-only builder can create the TestMu account and copy the access key in a mobile browser, then paste the secrets into the GitHub app. They should not commit keys.

### Running in GitHub Actions or a cloud VM (the viable path)

Officially documented and first-class. ([CI docs](https://www.testmuai.com/docs/kane-cli-cicd), [blog: GitHub Actions](https://www.testmuai.com/blog/how-to-connect-kane-cli-github-actions/))

- Official composite action: `LambdaTest/kane-cli/integrations/github-action/kane-cli-browser-run@main` — sets up Node, Chrome, and Kane CLI on `ubuntu-latest`, runs a plain-English objective or `_test.md` suite headlessly, uploads the evidence pack (30 days), posts a PR comment.
- Manual recipe: `actions/setup-node` + `browser-actions/setup-chrome` + `npm install -g @testmuai/kane-cli` + `kane-cli run "…" --headless --agent --timeout 300 --username "$LT_USERNAME" --access-key "$LT_ACCESS_KEY"`.
- Always use `--headless` and a `--timeout` in CI. Exit codes: 0 pass, 1 failed, 2 error (no credits used), 3 timeout/cancel.
- If the runner cannot install Chrome: `--ws-endpoint` / `--cdp-endpoint` to a remote browser, or `kane-cli testrun run … --remote` onto the HyperExecute grid. **`--remote` “requires a plan with HyperExecute macOS runners.”** ([CI docs](https://www.testmuai.com/docs/kane-cli-cicd)) The free 10,000-credit Kane CLI grant is not stated to include those runners. **Inference:** a phone-only web-app entry should run Kane in GitHub Actions with Chrome on `ubuntu-latest`, not depend on `--remote` or local simulators.
- Cloud coding-agent environments (Cursor cloud, Copilot coding agent, etc.) can in principle install the CLI if the VM has Node and can install Chrome, and if secrets can be injected. This is **plausible but not officially documented** as a supported host. GitHub Actions is the path with a published recipe.

Agent integration (helps the “closed loop” bar): skill installer `npx @testmuai/kane-cli-skill` (Claude Code, Codex CLI, Gemini CLI); for Cursor / Copilot, append https://www.testmuai.com/kane-cli-agent/AGENTS.md into `AGENTS.md`. ([agents.md](https://www.testmuai.com/kane-cli/agents.md))

### Free tier, credits, pricing

- CLI is free to install. Runs consume KaneAI-plan credits, including local and CI runs. Cached/replayed unchanged steps have “no LLM cost.” ([pricing.md](https://www.testmuai.com/pricing.md), Luma FAQ)
- Hackathon grant: **10,000 free Kane CLI credits, valid one month / 30 days**, no card. Luma FAQ: “Are 10,000 credits enough? Yes. Most of that 10,000 goes to building your suite. Running it is free, since tests cache on first run and replay at zero cost.” Running low: DM Slack before the deadline and they will “sort you out.”
- Credit rates for KaneAI authoring (useful as an order-of-magnitude, not a Kane CLI-specific tariff): step authoring / vision validation ≈ **1.5–2.5 credits/step**; a ~40-step test creation ≈ **80 credits**. Local Kane CLI authoring uses step credits only (no per-minute cloud time). ([credits management](https://www.testmuai.com/support/docs/credits-management/), [pricing.md](https://www.testmuai.com/pricing.md))
- Paid KaneAI plans if the grant runs out and Slack cannot top up: Starter $19/agent/month (2,000 credits, local CLI only, 0 HyperExecute minutes); Pro $99 (12,000 credits, 100 HyperExecute minutes); Max $199. ([pricing.md](https://www.testmuai.com/pricing.md))
- A separate general TestMu credits doc says free users get 1,000 complimentary credits valid one year. That looks like a **different, older/general credit pool** (SmartUI, test-case generator, etc.). Do not assume it is the same as the 10,000 Kane CLI hackathon credits.

### Feasibility verdict for a solo phone-only builder

**Feasible, with constraints.** Kane CLI is a desktop/CI CLI that needs Node + Chrome (or a remote browser). It will not run on the phone. The documented workaround is:

1. Sign up on testmuai.com from the phone browser; copy `LT_USERNAME` / `LT_ACCESS_KEY`.
2. Create the GitHub repo (after the timezone-safe start — see §2), store those as Actions secrets.
3. Let a cloud coding agent write the app and a `.github/workflows` Kane job; run Kane on `ubuntu-latest` via the official action or the published recipe; download/share the evidence pack from the Actions artifact.
4. Deploy the app to Vercel so judges have a live URL.
5. Record the 3-minute demo on the phone (screen recording), including a Kane run — either a recorded CI run (logs + evidence/video) or a Kane run against the live URL executed in Actions/a cloud VM. The “closed loop” bar still has to be visible: agent output triggers Kane, or Kane’s result triggers the agent. A hook or agent loop that runs in CI/on a cloud agent is enough in principle; a local-on-save hook is not available on a phone.

Mobile (simulator/emulator/real-device) verification is a poor fit for this builder unless `--remote` is confirmed to work on the free credit grant — it is not.

---

## 11. Calendar fit (stated commitments)

- This event: build Thu 12 Nov (from 11:30 PM WAT if using the Luma start) through **Thu 19 Nov 7:29 PM WAT**.
- BCH BLAZE: roll call **Sat 14 Nov 2026, 15:00 WAT**; build 14–22 Nov. Overlaps this event for five of the seven days.
- #BuildHybridAI: deadline 30 Nov, after this one.

**Inference:** this entry has to stay tiny. There are at most ~2 late-night/early days before BLAZE roll call, then a concurrent week.

---

## 12. Already-announced participant projects for *this* edition

Public X search for `"Kane CLI Online Hackathon"`, `kaneclihack.sh`, and the Luma URL (1 Aug 2026 onward) found official promotional posts (6 Oct and 29 Oct 2026 from [@testmuai](https://x.com/testmuai/status/2107464365767348404) and [@kane_cli](https://x.com/kane_cli/status/2110015300058202569)) and many posts about the **August online edition** and the **October SF Hack Day**. **No participant project for the 12–19 Nov 2026 edition was found as of this morning.** The Luma page has no featured guests or project list. Re-check Slack, X, and HN after kickoff.

---

## 13. Mismatches vs the previously noted facts

The previously noted facts were re-checked against the official pages:

| Previously noted | Re-verification |
|---|---|
| Prizes $3,000 cash total (1st $1,500, 2nd $1,000, 3rd $500) plus founder 1:1, 3 months Kane CLI Pro, blog feature | **Confirmed** on both official pages. **Additions on kaneclihack.sh only:** +$250 OpenAI credits per podium place; Luma also lists channel amplification. |
| Build window Nov 12–19; deadline Nov 19, 2026 11:59 PM IST = 7:29 PM WAT | **Confirmed.** Also: Luma calendar start is 11:30 PM WAT on the 12th; Luma `end_at` is 10:30 PM WAT on the 19th (later than the written deadline). Winner date still `[DATE]`. |
| Repo must be initialized on or after Nov 12 | **Confirmed as written**, timezone not specified. |
| 18+, solo or teams up to 4, global | **Confirmed.** Employees and partner employees cannot win. |
| Must sign up at testmuai.com, run Kane CLI, show the AI coding agent → Kane verification loop | **Confirmed**, and the loop is not optional decoration: it is one of the three “ready to ship” bars. |

New requirements that were **not** in the previously noted facts (from kaneclihack.sh, conflicting with Luma): required launch posts; public-repo-only; YouTube-only demo; 3–5 min vs hard 3:00 cap; live URL optional vs required.
