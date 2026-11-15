# Phase 1.7 — Synthesis (no project ideas)

**Researched:** Thu 12 Nov 2026, Africa/Lagos.  
This file is for Gate 1: findings only. It names *kinds of solutions* and constraints. It does **not** propose a specific project.

Sources are the official pages and the research files in this folder. Inferences are labeled.

---

## Constraints that bound every later idea

Stated or previously agreed facts:

- Solo, phone-only builder (no local CLI, no local Chrome). Deploys GitHub → Vercel. Cloud coding agents only.
- About **seven calendar days**, with the written deadline **Thu 19 Nov 2026, 7:29 PM WAT**. If the repo is initialized after the Luma start, the clock starts **Thu 12 Nov 2026, 11:30 PM WAT** — even less.
- Concurrent commitment: BCH BLAZE roll call Sat 14 Nov 15:00 WAT and build 14–22 Nov, plus #BuildHybridAI due 30 Nov. This entry must stay **tiny**.
- Eligibility: TestMu signup + Kane actually run; agent ↔ Kane loop is a *bar*, not a nice-to-have.
- Kane will not run on the phone. The documented path is **GitHub Actions** (official action or published Ubuntu + Chrome recipe) with `LT_USERNAME` / `LT_ACCESS_KEY` in repo secrets, against a public Vercel URL. (`00-logistics.md` §10)

---

## What organizers are buying

Stated: they want proof that an AI coding agent can close the loop with Kane — write, verify in a real browser, read the failure, fix, re-verify — and that the result is a thing someone would install tonight. Ties break on Verified, then Closed loop. (`04-criteria.md`)

**Inference:** this is also a product-marketing harvest (blog feature, badges, amplification). A 3-minute video that *shows* fail → evidence → fix → green, in the first seconds, is how a busy engineer-judge will decide.

---

## What’s already been done (do not remake without a clear upgrade)

From official or first-party sources (`02-organizer.md`, `03-comparable.md`):

| Kind of solution | Already seen | Result |
|---|---|---|
| Kane as build loop + runtime performer + tester of the product itself | demo.studio (Aug 1st) | Won |
| “Done” gate / PRD-to-Kane workflow inside a coding-agent extension | GuardianKane (Aug 2nd) | Won |
| Adversarial builder vs Kane (escape room / dungeon) | KANE vs. ABLE (Aug 3rd); Room for Error (Oct SF, outcome unknown) | Placed / repeated |
| Tight spec → Kane checks → agent patches one line → re-run | onred (Aug, public, staff-amplified) | Did **not** place |
| MCP verification layer for coding agents | Elenchos (Aug, Mayank-amplified) | Did **not** place |
| Kane playtests or plays a browser game | Node Arena (Oct); idea menu still lists this | Outcome unknown; shape is no longer novel |
| Security “seatbelt” (cross-user access bugs Kane can catch) | Bugsy (Oct SF) | Outcome unknown |
| Incident triage / social check-in app / auto-poster with Kane verify | May Hack Day circulated winners (Dispatch, TouchGrass, Ghostwriter) | Placed in a Kiro-required in-person day |

The official idea menus on Luma and kaneclihack.sh still list hooks, MCP servers, escape/game agents, subscription killers, and self-healing checkouts. Those are **starting prompts, not whitespace**. Several are now occupied.

---

## Opportunities (kinds, not ideas)

These are areas where the official brief is loud and past winners have not fully closed the space — still without naming a project.

1. **Visible closed loop that a CI/cloud-agent builder can film.** Past 2nd-place energy lived in a *local* Claude Code Stop-hook, which a phone-only builder cannot faithfully reproduce. A small, deployable web app plus a GitHub Action / cloud-agent loop that is obvious in a 3-minute video (failed evidence pack → agent commit → green re-run) fits both the rubric and the toolchain. This is a *kind* (CI-native loop as the demo), not a product concept.

2. **“Meaningful” Verified evidence, not a homepage smoke test.** The bar text and August recap both insist on a real catch or a real proof. Kinds that make “meaningful” easy to see: a known class of functional break (API 500, broken checkout step, docs that lie) that Kane catches and the agent repairs on camera. Screenshot-only checks are what one August also-ran explicitly contrasted against.

3. **Newer Kane surface area (assurance / PRD / coverage / explore), used tightly, not as a tour.** Lane 4 and the 0.10.x README push `context ingest/extract`, `design tests`, `testmd`/`testrun`, `cover`, `maintain reconcile`, and (as of 0.10.0) `explore`. GuardianKane already touched context/maintain, so a shallow “we ran the docs commands” demo is weak. A tiny product whose *one* job is to make one of those newer loops undeniable on video is the kind of opening, if it stays small.

4. **Craft = installable tonight, or memorably specific — at tiny scope.** The official anti-pattern is a polished generic todo with Kane tacked on. The official hope is weirder and scrappier *and* something a developer would install. For a seven-day solo phone build, “installable” probably means a one-click template, a GitHub Action, or a single-purpose deployed tool — not a platform.

5. **Required (on the official site) launch posts are part of the work, not an afterthought.** If kaneclihack.sh is binding, two public posts (HN, X, Reddit, LinkedIn) are in the submission. Budget time late in the week.

6. **Whitespace relative to last edition’s losers as well as winners.** “A working closed loop” is no longer enough (onred). “An MCP wrapper around Kane” is no longer enough on its own (Elenchos). The increment has to be visible in Craft or in how meaningful/tight the loop is.

---

## Kinds of solutions with the best odds *for this builder*

Odds here means “can clear the three bars, be filmed in three minutes, and be built solo from a phone in a short week that also contains BLAZE,” not “will win.” Inference, based on the rubric + feasibility + precedent.

**Better odds (as *kinds*):**

- A **very small deployed web app** (Vercel) whose primary demo is the **agent ↔ Kane loop running in GitHub Actions**, with a real failed run and a real fix in the video, and a README a judge can exercise in under 30 seconds.
- A **single-purpose workflow tool** (Action, hook in CI, or “run this against a URL”) that makes Kane’s verdict feed back into the agent or into a PR, as long as the demo is concrete and not a generic MCP wrapper.
- Use of **one** newer Kane capability (cached `_test.md` suite, evidence pack, or a thin assurance step) only if it shows up in the money-shot, not as a feature list.

**Worse odds for this builder (as *kinds*):**

- Anything that needs a **local desktop hook, native macOS simulators, or `--remote` mobile/real devices** (plan/grid support on the free 10,000 credits is unverified).
- Remakes of **escape rooms, demo-filmers, or Claude Code extensions** unless there is a clearly stated upgrade *and* time to show it; two of those also fight the phone-only constraint.
- Broad “QA-as-a-service platforms,” multi-agent research systems, or anything that cannot be demoed in the first 30–60 seconds of a video.
- Work that only *starts* after BLAZE roll call on Saturday: the deadline is Thursday 19 Nov 7:29 PM WAT, mid-BLAZE. Scope must be finishable in the first couple of days and then only tightened.

**Calendar inference:** design for a build that can be *demo-complete* early (loop + live URL + evidence), then spend remaining hours on README, video, and the two public posts — not on extra features.

---

## Logistics that can still sink a good entry

Flag these before any brainstorm (`00-logistics.md` and `gaps.md`):

- Confirm **which submission form** is binding (SurveyMonkey vs kaneclihack.sh `/o/submit`) and meet the **stricter** of the two rules (public repo, YouTube, two posts, sub-3-minute money shot).
- Do not initialize the repo in a way that looks like it predates the event; safest is after **11:30 PM WAT tonight**.
- Sign up on TestMu and stash CI secrets **before** the first Kane workflow run.
- Winner date, office-hour times, and named judges are still unpublished — join Slack and read the pre-hack email.

This is the end of Phase 1. No brainstorming until the builder has reviewed this pack (Gate 1).
