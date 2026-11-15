# Phase 2 — Idea selection

**Event:** Kane CLI Online Hackathon (12–19 Nov 2026)  
**Written:** Thu 12 Nov 2026, Africa/Lagos  
**Inputs:** research pack in `docs/research/`, plus Oh-Jay’s constraints (solo, phone-only, GitHub `ohjay-official` → Vercel, cloud coding agents write the code, Kane headless in GitHub Actions with `LT_USERNAME` / `LT_ACCESS_KEY`). Core loop must be buildable in about 2–3 days because BCH BLAZE overlaps most of the week. Background (Web3 technical writing, content, Contri on NEAR) is optional flavour, not a requirement. Contri and Holdfast must not be recycled.

**Scoring rule used:** official equal weights from kaneclihack.sh / Luma — Ships 25, Verified 25, Closed loop 25, Craft 25 — plus a **feasibility penalty (0 to −20)** for buildability in this window and phone-only / GitHub Actions fit. Net is out of 100 after the penalty. The rubric recommends; it does not decide (Gate 2).

**No brief or spec in this file.** Working titles only.

---

## 0. Constraints that knocked ideas out later

From `docs/research/05-synthesis.md` and the builder’s brief:

- Kane does not run on the phone. The documented path is GitHub Actions (`ubuntu-latest` + Chrome, official Kane action or the published recipe).
- No `--remote`, iOS/Android simulators, or real devices (free-tier grid access unverified).
- No local hooks, native apps, or desktop-only tooling as a required path.
- Do not remake, without a clear upgrade: demo.studio, GuardianKane, KANE vs. ABLE, escape rooms, or Kane-as-game-player.
- August also-rans (onred’s tight fail→fix→green, Elenchos’s MCP wrapper) already proved that “the loop works” or “an MCP around Kane” is not enough by itself.
- Demo in about 30 seconds; judges watch the video first; lead with the interesting moment.
- Meaningful Kane use: not a trivial “open the homepage” flow tacked on at the end.

---

## 1. Twenty-two ideas, by angle

Angles used: Kane’s wedge (independent verdict + evidence + cheap replay); the closed loop as the core; gaps August / October winners left; real developer pain; “would a dev install this tonight.” Official menu items are marked so we do not pretend they are original prompts.

### Kane’s wedge — verdict, evidence pack, cheap replay

1. **Public `/verified` wall.** A tiny site (or a page generated into any repo’s GitHub Pages / Vercel URL) that lists each flow, the last Kane verdict, a link to the sealed evidence pack, and the time it last passed. Replay is the point: after the first authoring, nightly runs are cheap and the wall stays current. Closed loop: a red tile opens a fixer job that must turn it green. Pain: “CI is green but nobody can see proof.”

2. **Pricing-page claim auditor.** A one-purpose tool: you point it at a pricing or plan page and a checkout URL. Kane checks that every named plan, price, and “included” claim is actually what the checkout shows. Failures are evidence-backed, then a fixer agent patches the page or the checkout copy. Wedge: this is a *meaningful* verdict (copy vs product), not a smoke test. Optional flavour: could later audit a Web3 mint/price page; not required.

3. **Changelog / release-notes verifier.** Lane 4 menu item. Ingest `CHANGELOG.md` or GitHub release notes, turn each “we shipped X” line into a Kane flow against production or the preview, post a “proved vs still owed” list, and open a fix PR for failed claims. Replay makes re-checking an old release cheap.

### Closed loop as the core

4. **Vercel-preview Kane gate + auto-fix.** On every pull request, the Action waits for the Vercel preview URL, runs checked-in `_test.md` / plain-English flows in headless Chrome, posts the verdict and evidence on the PR (the official Kane action already does part of this), and if red, a fixer agent reads Kane’s NDJSON / Result.md, pushes a commit, and Kane *replays* until green (cap of three attempts). This is the organizer thesis on Oh-Jay’s actual stack.

5. **Issue acceptance-criteria gate.** An issue contains a short AC block (“Given I add Milk, the cart shows 1 item”). A PR that says `Fixes #n` cannot be merged, and the issue cannot be closed, until Kane has a green run of those ACs against the preview or live URL. The agent keeps pushing until the evidence pack is green; the issue is closed with the evidence link. CI-native cousin of what GuardianKane did *inside Claude Code* — not a Claude extension, no local browser.

6. **`/kane` thread on the PR.** A comment `/kane verify "a new user can sign up and see the dashboard"` starts a run against the preview, replies with the one-liner + evidence, and if it failed, the fixer agent commits in that thread and Kane replies again. The conversation *is* the loop.

7. **Kane-TDD: the app only moves forward by fixing failed runs.** Official “pure chaos” prompt. Seed a failing `_test.md` suite and a nearly-empty app. An Actions loop lets the agent write code only in response to Kane failures until the suite is green. The demo is the history: red, patch, red, patch, green.

8. **Overnight watch → morning fix PR.** A scheduled Kane run against the production URL. On failure, attach the evidence video and open a fixer PR before anyone wakes up. Replay keeps the cron cheap. The loop is async; the demo compresses it.

### Gaps the August (and October) field left

9. **README claim verifier.** Official menu (“README lie detector”) but *not* a past winner. Extract “do X, see Y” claims from the README, run each as a Kane flow against the live or preview URL, and if a claim is a lie, the agent must fix the *app* (not quietly delete the claim), then Kane replays. Coverage is against README claims, not test counts — close to Lane 4, but much smaller than GuardianKane’s PRD machine.

10. **Docs / tutorial walker for writers.** Optional Oh-Jay flavour (technical writing), not a Contri remake. Paste or commit a tutorial in Markdown (not a wallet flow). Kane walks the user-visible web steps against the product URL and returns a “this tutorial is still true” badge plus evidence. Closed loop: the agent patches the tutorial *or* the product, then Kane replays. New ground vs published winners; still a docs-drift kind.

11. **Deploy job that refuses to promote until Kane is green.** Official “app that refuses to deploy until Kane signs off,” implemented as a GitHub environment / production job gate plus a fixer branch. Overlaps idea 4; more about promotion than preview.

### Real developer pain / install tonight

12. **`npx create-verified-app` template.** Official menu. Scaffold a Next.js app already wired to Vercel, a `_test.md` suite, the Kane Action, and an AGENTS.md that knows how to read a failed evidence pack. First push is *designed* to go red, then green. The installable thing is the template.

13. **Drop-in “done means Kane is green” pack.** Not a generic MCP server (Elenchos already did that and did not place). A two-file pack: an Action and an `AGENTS.md` / skill that forbids a coding agent from declaring a PR done until the Kane check is green, with the PR comment as the inbox. Pain: agents lie about being done. Risk of feeling like GuardianKane-lite.

14. **URL + one sentence → evidence report, then “send to fixer.”** Official “QA-as-a-service for non-technical founders,” narrowed. Paste a URL and a goal, get a shareable pass/fail report with the video. A connected GitHub repo can receive a fixer PR. Pain: a founder (or a judge) can see proof without installing a framework.

15. **Kane bisect Action.** Official menu. Given a failed flow, bisect the last N commits, comment “broke in abc123,” then the fixer agent targets that regression and Kane replays. Pain: “which commit broke checkout?”

16. **Self-healing checkout (toy store).** Official menu almost verbatim: a tiny shop with a way to break the buy path; Kane catches it; the agent heals it; both evidence videos sit side by side. Pain is real (checkout regressions); the *product* may feel like a fixture, not something to install.

17. **Synthetic monitor that only pages when the flow is actually broken.** Official funnel-watcher. Cron + evidence video + a “Fix it” button that opens the fixer PR (not just a Slack ping). Pain: alerting on a real user journey, not on HTTP 200.

### Weaker or later-knockout ideas (still listed so the set is honest)

18. **Generic `verify_with_kane` MCP server.** Official menu; Elenchos already submitted this shape in August and did not place. Included for the knockout, not as a contender.

19. **Lane 3 “Kane as hands” autopilots** (job applications, subscription cancellation, travel booking). Official menu; spectacular; poor fit for a tiny, safe, judge-runnable demo (third-party logins, ToS, credentials, flaky live sites).

20. **Escape room / Kane plays a browser game / auto demo-studio / local Claude Code stop-hook.** Past-winner or past-winner-adjacent shapes, listed only to be dropped.

21. **Pre-commit hook that derives Kane flows from a local git diff.** Official menu; requires a local toolchain the builder does not have. A CI “diff-to-Kane” cousin is already covered by ideas 4 and 15.

22. **Anything built on Contri or Holdfast.** Explicitly out of scope.

---

## 2. Bolder pass — eight generic ideas, rewritten sharper

The eight that were most “official menu, no sharp hook”: 4, 9, 12, 13, 14, 16, 17, and 6 (the `/kane` comment, which is just “a bot on a PR”).

| # | Generic version | Sharper version |
|---|-----------------|-----------------|
| 4 | “A PR bot that runs Kane and comments” | **Preview, then proof.** The Action’s only job is: resolve the *Vercel preview* for this PR (with retries), run the committed flows *on that preview*, paste the evidence video under the diff, and if the buy/signup flow is red, a fixer job may only patch application code, then Kane *replays the same `_test.md`* (cheap if steps did not need re-authoring). No new framework, no MCP, no local hook. The seeded bug for the demo is a real functional break (broken CTA or a 500 on submit), not “homepage didn’t load.” |
| 9 | “README lie detector” | **The README is the contract.** Claims are extracted only from imperative how-to steps in the README (“Click **Get started**, you should land on `/dashboard`”). A red run may not be “fixed” by deleting or weakening the claim; the Action fails the check if the agent only edits the README. The app must be made true, then Kane replays. A small `/verified` section is appended to the README with the last evidence links. |
| 12 | “A starter template with Kane in it” | **First push goes red on purpose.** The template ships a working UI with one intentional break and a committed Kane flow that describes the *intended* behaviour. The README’s entire “Getting started” is: push, open the failing check, watch the fixer make it green, click the evidence. If that first-run story is not demoable in 30 seconds, the template has failed. |
| 13 | “An MCP / skill that calls Kane” | **Done is an exit code.** Ship only `kane.yml` + `AGENTS.md`. The Action is the source of truth; the skill tells any coding agent (Cursor, Copilot, Codex) to treat a non-zero Kane exit as “not done” and to read `Result.md` before touching code again. No MCP server to maintain. The demo repo’s PR is the proof, not a tool-listing README. |
| 14 | “QA-as-a-service: point Kane at a URL” | **One box, one sentence, one video.** A single deployed page: URL, goal, “Run.” Judges get a public report link (pass/fail + evidence). If a GitHub repo is connected, “Fix this” opens a capped fixer loop. No accounts required to *see* a report. The fixture app is pre-broken so the first run is a meaningful fail. |
| 16 | “A checkout that heals itself” | **Break-glass storefront.** A live shop with a public “break the buy button” control that only mutates a flag (so it is reversible). Kane runs the purchase flow, posts a red evidence clip on a live dashboard, the fixer agent must restore the purchase without turning the flag off by hand, Kane replays, the dashboard shows red clip / green clip side by side. The *installable* piece is the Action + dashboard snippet, not the shop — the shop is the fixture. |
| 17 | “Cron Kane and page Slack” | **A video in the morning PR.** Nightly run against production. On red, the artefact is not a chat message: it is a pull request titled with Kane’s one-liner, body containing the evidence viewer link, and a fixer commit already on the branch if the agent could patch it. The human reviews a PR, not a page. |
| 6 | “Comment `/kane` to run a test” | **In-thread iteration, cap 3.** `/kane verify "…"` always targets the Vercel preview for that PR. Kane replies in-thread. If red, the fixer may push once, Kane replies again, up to three tries, then it stops and asks a human (same anti-loop discipline the August 2nd-place write-up praised). The thread is the entire demo. |

---

## 3. Knockout gate

Dropped before scoring. Reasons are exclusive; one is enough.

| Idea | Why it is dropped |
|---|---|
| 18 Generic MCP `verify_with_kane` | Duplicates Elenchos (August, staff-amplified, did not place) without a clear upgrade; “the wrapper exists” is not a 30-second demo. |
| 19 Lane 3 autopilots on live third-party sites | Cannot be demoed reliably in 30 seconds; judges need credentials; ToS / flakiness; not tiny; often not deployable as a self-contained live URL. |
| 20 Escape room, Kane-as-player, demo.studio remake, local stop-hook / Claude Code extension | Duplicates past winners or October repeats (KANE vs. ABLE, Room for Error, Node Arena, demo.studio, GuardianKane) without a stated upgrade; local hook also fails phone-only. |
| 21 Local pre-commit hook | Needs a local toolchain the builder does not have. |
| 22 Contri or Holdfast | Recycles a past entry / existing product. |
| 7 Kane-TDD “written only by fixing fails” as the *whole* product | Would chew Actions minutes and first-run credits; the 30-second demo is hard to make legible (too much history); high slip risk in a 2–3 day core window. The *pattern* can still appear inside a survivor (seeded red → green). |
| 15 Kane bisect as a v1 | Several Kane runs in one job (credit + 5–20 min Actions risk), a weak 30-second money shot (bisect is a table of SHAs), easy to flake. Good later, not the core. |
| 12 Template-only (`create-verified-app`) as a standalone | The 30-second demo is “watch a scaffold,” which is thin Craft unless it is just the delivery vehicle for a sharper Action. Folded into the survivors as *how we ship*, not a scored idea of its own. |
| 11 Deploy-promotion gate | Same product as idea 4 with a different GitHub Environment name. Merged into 4. |
| 13 “Done is an exit code” pack alone | Too close to GuardianKane / Elenchos unless it is the skill file *inside* another product. Folded into 4 and 9 as documentation, not a standalone entry. |

**Survivors moved to scoring** (sharper versions where they exist): **4** Preview-then-proof, **5** Issue AC gate, **6** In-thread `/kane` (cap 3), **8** Morning fix PR, **9** README-as-contract, **10** Tutorial walker, **14** One-box evidence report, **16** Break-glass storefront, **17** is merged into 8, **1** `/verified` wall (as a face for other ideas — scored only if it stands alone), **2** Pricing-page auditor, **3** Changelog verifier.

Idea 1 as a standalone wall is thin without a loop; it is treated as a UI module, not scored alone. Idea 3 is kept but is a close cousin of 9 (docs/claims).

---

## 4. White-space labels

Relative to published August winners (demo.studio, GuardianKane, KANE vs. ABLE), known also-rans (onred, Elenchos), and October public projects (Bugsy, Room for Error, Node Arena, Kane Room). Official *idea-menu* prompts are not “duplicates” unless a team already won with them.

| Survivor | Label | Why |
|---|---|---|
| 4 Preview-then-proof | **Incremental** | Official “`gh kane` on the current PR’s preview” menu item, and TestMu already published a Vercel-preview + Kane Actions guide. Not a past *winner*. Upgrade vs onred: the product is an installable preview gate, not a one-off loop demo. Upgrade vs Elenchos: not an MCP layer — it is a deploy-preview quality gate with evidence on the diff. |
| 5 Issue AC gate | **Incremental** | Same *idea* as GuardianKane’s “done is earned,” but a different surface (GitHub issues + Actions, no Claude extension, no local browser). Clear upgrade path for a phone-only builder; still recognisably that pattern. |
| 6 In-thread `/kane` | **Incremental** | A UX variant of 4. Easy to overlap; weaker as a standalone product. |
| 8 Morning fix PR | **Incremental** | Official watcher/cron menu. Distinct from winners; loop is looser (async) unless the demo fast-forwards a run. |
| 9 README-as-contract | **Incremental** | Official README auditor / Lane 4, not used as a winning product in August (GuardianKane used PRD/context, not README-as-the-contract). The “you may not fix a fail by deleting the claim” rule is the sharp edge. |
| 10 Tutorial walker | **New ground** vs published winners | Docs-DX / writer pain; not a published winning shape. Still in the docs-drift family as 9, so not a new *category*. |
| 14 One-box evidence report | **Incremental** | Official “point it at a URL” menu. New vs winners if the report is the product; risk of looking like a Kane dashboard skin. |
| 16 Break-glass storefront | **Incremental** | Official self-healing checkout example. Not a past winner, but very close to the prompt they published, so Craft/novelty is fragile. |
| 2 Pricing-page auditor | **New ground** vs published winners | Narrow, specific claim-vs-checkout check. Small, meaningful, not seen in the recap. |
| 3 Changelog verifier | **Incremental** | Official Lane 4 changelog prompt; cousin of 9. |

None of the survivors are labelled **duplicate**.

---

## 5. Scoring

Scores are a judge’s-eye estimate for *this builder*, in *this window*, not a prediction of the official panel. Feasibility penalty (0 = straightforward 2–3 day GHA + Vercel loop; −5 = one nasty integration; −10 = likely flakes or extra paid APIs; −15 or worse = high slip risk).

| Idea | Ships /25 | Verified /25 | Closed loop /25 | Craft /25 | Penalty | **Net** |
|---|---:|---:|---:|---:|---:|---:|
| **4 Preview-then-proof** | 22 | 22 | 23 | 20 | −5 | **82** |
| **9 README-as-contract** | 21 | 22 | 21 | 21 | −4 | **81** |
| **5 Issue AC gate** | 20 | 22 | 22 | 18 | −5 | **77** |
| **2 Pricing-page auditor** | 20 | 23 | 18 | 20 | −4 | **77** |
| **14 One-box evidence report** | 21 | 21 | 18 | 19 | −5 | **74** |
| **8 Morning fix PR** | 19 | 20 | 17 | 18 | −4 | **70** |
| **10 Tutorial walker** | 18 | 20 | 18 | 19 | −6 | **69** |
| **16 Break-glass storefront** | 20 | 21 | 20 | 14 | −3 | **72** |
| **6 In-thread `/kane`** | 19 | 19 | 22 | 16 | −5 | **71** |
| **3 Changelog verifier** | 18 | 20 | 18 | 16 | −5 | **67** |

### Score notes

- **4 Ships:** a public Action + a tiny fixture app on Vercel is a real flow judges can open in 30 seconds. Not 25 because preview-URL wiring can wobble. **Verified:** a seeded functional break on the preview is meaningful if we keep it non-trivial. **Closed loop:** this is the cleanest CI version of “hook fires Kane, fail, agent reads output, fix, replay.” **Craft:** “install tonight” is strong (one workflow file); “interesting/weird” is only moderate — it is a serious tool, not a spectacle. **Penalty −5:** Vercel preview discovery and Deployment Protection are known issues (TestMu’s own Kane + Vercel guide warns about protection). Mitigate with retries and a stable production-URL fallback for the demo.
- **9 Ships / Verified:** lying README steps are easy to see and clearly “meaningful.” **Closed loop:** slightly weaker than 4 if we must stop the agent from cheating by editing the README (extra rules, extra demo time). **Craft:** every dev has a lying README; install-tonight is excellent. **Penalty −4:** claim extraction can be brittle (markdown heuristics vs LLM). Keep v1 to a tiny, tagged block in the README (`<!-- kane:claims -->`) so we do not need a parser science project.
- **5:** Tight loop and meaningful ACs; Craft is a bit more “process tool,” and the demo needs a carefully written issue or it looks like GuardianKane-lite. Penalty for GitHub merge-protection plumbing.
- **2:** Highest Verified potential (claim vs checkout is obviously meaningful) but the loop is a bit narrower (copy fixes) and the product is narrow. Strong dark-horse.
- **14:** Beautiful first 10 seconds (type a goal, get a video) but the closed loop is optional (“send to fixer”) and it can look like a skin on Kane’s own report.
- **16:** Easy to build and easy to film; Craft is marked down because it is the official example almost verbatim — judges may have already pictured it.
- **8 / 10 / 6 / 3:** scored as solid but either async (weaker loop on camera), more parsing scope, or a subset of 4 or 9.

---

## 6. Head-to-head: top 3 vs the strongest past winners

Top 3 by net: **4 Preview-then-proof**, **9 README-as-contract**, **5 Issue AC gate**. (2 Pricing-page auditor is tied with 5 on net; 5 is taken as third because its closed loop is tighter, which is also a tie-break the official panel uses. Idea 2 is the first alternate.)

The skill rule: a recommendation advances only if it **beats the strongest past winners on at least one official criterion and clearly loses on none.** Winners used: demo.studio (Aug 1st), GuardianKane (Aug 2nd), KANE vs. ABLE (Aug 3rd). Comparisons are judge’s-eye inferences, labelled as such.

### 4 Preview-then-proof

| Criterion | vs demo.studio | vs GuardianKane | vs KANE vs. ABLE |
|---|---|---|---|
| Ships | Does not clearly lose: both are runnable. demo.studio was a richer product; 4 is a thinner app plus a real Action a judge can imagine installing. Slight loss on product depth, not on “a real flow runs.” | Does not clearly lose: GuardianKane was a dense extension + dashboard; 4 is easier to *run* (open a PR / live URL). | Does not clearly lose: a shop or signup fixture is as runnable as a dungeon, less theatrical. |
| Verified | Can match if the seeded fail is a real user-journey break with a video trace, not a smoke test. Loses if we only “run Kane.” | GuardianKane showed generated tests + a defect sweep + a checkout bug. 4 can show one meaningful fail and a green replay — enough to not *clearly* lose, not enough to beat the depth. | KANE vs. ABLE’s independence (“Kane was not scripted through the dungeon”) is a high bar. 4’s flows are authored and committed, which is the intended Kane path, not a loss. |
| Closed loop | demo.studio used Kane three ways (build partner, runtime, tester). 4 is a single tight CI loop. **Risk of a clear loss on richness.** Mitigation: the official Craft/loop language also values tightness on save/push; 4 is the push equivalent and is *more typical of how developers work*. Still, do not claim we beat layered use. Call this **narrower, not broken.** I will not pretend it “wins” Closed loop vs demo.studio. | **Beats** GuardianKane on portability (any repo, no Claude Code, no local Chrome). May lose on hook sophistication. Not a *clear* loss if the video shows fail → NDJSON → commit → replay, cap 3. | Loop is less poetic, equally closed. Not a clear loss. |
| Craft | Official wording is *both* “interesting” *and* “install tonight.” **Beats** demo.studio on “install tonight” (a GitHub Action vs a demo-filmer you may not need this week). Loses on spectacle. Not a clear overall loss if the Action’s README is dead simple. | **Beats** on install-tonight and phone-reproducibility. Loses on “wow, this is a whole cockpit.” | **Loses on spectacle.** This is the dangerous comparison. Mitigation: do not compete as a toy; compete as the thing a judge would add to their repo after the stream. If the panel leans “weirder, scrappier,” 4 can clearly lose Craft to the escape room. |

**Advancement call for 4:** It beats GuardianKane on installability / Ships-as-runnable, and beats demo.studio on “install tonight.” It does **not** clearly beat KANE vs. ABLE on Craft, and could clearly lose that one if the fixture app is a boring todo. **Condition:** the fixture flow must be a *specific, slightly sharp* user journey (a real checkout or signup break, not “todo CRUD”), and the Action must look like something you would add to a repo tonight. With that condition, I do not call a *clear* loss on Craft — “interesting” can be the preview-gated proof, which is the event’s own thesis. Advance **conditionally**.

### 9 README-as-contract

| Criterion | vs the three winners |
|---|---|
| Ships | Does not clearly lose if the live app + README + Action are one-command / one-URL. |
| Verified | **Can beat** a generic “Kane ran” winner-feature: a lying README is an instantly understood, meaningful fail (the official menu and FAQ already care about doc-vs-product drift). Does not beat GuardianKane’s depth of evidence, but does not clearly lose. |
| Closed loop | Tight enough (red claim → must fix the app → replay). Weaker than GuardianKane’s stop-hook cockpit. Not a clear loss if the anti-cheat rule (no deleting claims) is visible on camera. |
| Craft | **Beats** on “every repo has this problem / install tonight.” Loses spectacle to KANE vs. ABLE. Same condition as 4: keep the README steps concrete and the fail obvious in one shot. |

**Advancement call for 9:** Advance **conditionally**, same Craft caution vs the escape room. Strongest unique angle: *meaningful Verified* that is visually obvious (the README line is simply false).

### 5 Issue AC gate

| Criterion | vs the three winners |
|---|---|
| Ships | Fine if the issue, PR, and app are prepared. Slightly more moving parts for a judge to follow in 30 seconds. |
| Verified | Strong (ACs are the contract). Comparable to GuardianKane’s core idea. |
| Closed loop | Very tight, but this is the idea most likely to be read as **GuardianKane-lite**. That is not an automatic knockout (different surface, CI not Claude Code), but in a head-to-head on Closed loop / Craft, judges who read the winners blog may say “we already awarded this pattern.” |
| Craft | Install-tonight is decent (Action + issue template). Interest is moderate. **Risk of a clear Craft loss** vs all three winners (less new, less weird, less layered). |

**Advancement call for 5:** On a strict reading of “clearly loses on none,” Craft vs the August field is the soft spot. It remains a strong #3 / backup, not the #1 recommendation.

**Alternate 2 (pricing-page auditor)** would head-to-head better on Verified and on new ground, worse on Closed loop unless the fixer loop is fully built. Keep it as a possible *flavour of the flows inside* 4 or 9 (the fixture is a pricing page, the Action is still 4 or 9).

---

## 7. Pressure-test of the top 3

### Shared: Kane credits

- First authoring of a flow consumes credits; unchanged replay is free (Luma FAQ + pricing docs; see `docs/research/00-logistics.md`).
- Order of magnitude from KaneAI rates: ~1.5–2.5 credits/step; a short 8–12 step flow might be on the order of **15–30 credits** to author. 10,000 grant is ample for a week of iteration if we *commit `_test.md` early* and replay.
- Fail → fix → replay: if only the app changes and the steps still apply, replay is free. If the UI labels change, some steps re-author (credits again). Demo design: keep the Kane objective stable; fix the app to match it (this also matches idea 9’s anti-cheat rule).
- Cap the loop at 3 attempts (credits, time, and anti-runaway). Exit 2 (setup error) uses no credits — still must be handled so we do not spin.

### Shared: GitHub Actions runtime

- Public repo (stricter official-site rule) is the right default; minutes are then the usual public-repo limits, not a private-minute cap.
- Budget per loop: checkout + Node + Chrome + Kane `--timeout 300` + artefact upload. One run can be **3–8 minutes**. Three iterations + preview wait could be **15–25 minutes**. That is acceptable if the *demo video* uses a prepared run (plus a live URL judges can still click). Do not make “watch the full 15-minute job” the 30-second money shot — cut to the PR comment, the red video, the fix commit, the green replay.
- Use `--timeout` and `--max-steps`, and `concurrency` so only the latest push runs.
- Official action `LambdaTest/kane-cli/integrations/github-action/kane-cli-browser-run` already installs Chrome, posts a PR comment, and uploads evidence. Build on it rather than reinventing.

### Shared: how the agent actually receives Kane’s result

This is the real blocker. Options, most reliable first:

1. **Same-workflow fixer job (recommended for the demo).** After Kane, if exit code is 1, a job reads the evidence / `Result.md` / NDJSON, calls a coding model, applies a patch, commits, and re-invokes Kane. Inbox = the artefact, not a hope that a human pastes the log into Cursor. **Needs an LLM API secret** (`OPENAI_API_KEY` or similar). Oh-Jay may have to add one key. There is no confirmed free participant OpenAI grant for this online edition (podium credits are prizes). **Blocker if no key is available** — decide on day one.
2. **Official Kane PR comment as the inbox**, plus a second workflow that parses the comment. Same API-key need if the fixer is automatic.
3. **GitHub Copilot coding agent assigned to an issue** that contains the evidence. Only works if the repo/owner has Copilot coding agent, which **judges may not have** and Oh-Jay may not have. Do not depend on this as the only loop.
4. **Cursor / Copilot cloud agent webhook.** Not a documented, judge-reproducible trigger. Fine as a *dev* workflow while building; not the scored closed loop.
5. **Human pastes Kane’s failure into a cloud agent.** This is the weak loop the bars are trying to go beyond. Backup only.

**Rate limits / other blockers:** LLM rate limits and empty-key failure must fail the job clearly, not hang. Kane auth errors are exit 2. Vercel Deployment Protection can make Kane see a login wall — disable protection on the demo project or provide bypass, or Kane will “fail” for the wrong reason (TestMu has already written about this). Do not put secrets in the repo or in the demo video. Seed the fail so the first demo run is a *meaningful* red, but the *fixer must read Kane’s output*, not a hardcoded patch (a scripted “fix” would fail the Closed-loop bar).

### Idea-specific blockers

- **4 Preview-then-proof.** Biggest: **preview URL not ready / protection wall / wrong URL.** Mitigation: poll the Vercel preview (or `vercel` deployment API) with a timeout; fall back to the stable production deploy for judges and for the recorded demo; document “do X, see Y” on the production URL. Second: fixer API key, as above.
- **9 README-as-contract.** Biggest: **brittle claim extraction** and **agent cheats by editing the README.** Mitigation: v1 only reads a fenced or tagged claims block; the Action fails if the diff touches those claims while the Kane run is still red. Second: same fixer-key issue.
- **5 Issue AC gate.** Biggest: **demo choreography** (issue + PR + protection rules) is too many clicks for 30 seconds, and **merge-protection** may need admin rights the cloud agent cannot set. Also the GuardianKane-lite perception.

---

## 8. Shortlist (top 5) and recommendation

See the report at the end of this file for one-line pitches, 30-second moments, loop descriptions, nets, and risks. Recommendation (for Gate 2, builder decides):

**#1: Idea 4, Preview-then-proof**, with two narrowing choices that steal strength from 9 and 2 without growing scope:

- The committed Kane flows should include **one obviously meaningful user journey** (signup or checkout, or a pricing claim vs the checkout page — idea 2 as a *flow*, not a second product).
- Ship a short **tagged “How to test” block** in the README that Kane also runs (a *slice* of idea 9), but do not build a general README parser in v1.

What we are *not* recommending as #1: the escape-adjacent toys, a generic MCP, a local hook, or Issue-AC-gate as the headline (too close to GuardianKane, fiddlier demo).

If Preview-URL flakes eat the first day, **fall back to #2 (README-as-contract on a stable production URL)** — same Action, same fixer, no preview discovery.

**Out of scope for v1 of #1:** bisect, cron, MCP, mobile, explore, full PRD/assurance suite, a custom report app (use Kane’s evidence viewer + the PR comment), any Web3/Contri/Holdfast surface.

---

## Top 5 — one-line pitches (for Gate 2)

### 1) Preview-then-proof — net **82** — recommended

- **Pitch:** A drop-in GitHub Action that runs Kane on the Vercel preview, pins the evidence on the PR, and lets a fixer agent read the failure and push until the same flow replays green.
- **30-second demo moment:** Open a PR that breaks “Buy now.” The check is red and the evidence clip shows the broken click. A fixer commit lands. The same flow is green; the two clips sit on the PR.
- **Closed loop, concretely:** `pull_request` → wait for preview (or production fallback) → `kane-cli` / official action (`--headless`, secrets from `LT_*`) → exit 1 writes `Result.md` + evidence artefact + PR comment → fixer job reads that output, patches *app* code, pushes → Kane replays the same `_test.md` (cap 3).
- **Biggest risk:** Vercel preview timing / Deployment Protection, and the fixer job’s need for an LLM API key.

### 2) README-as-contract — net **81**

- **Pitch:** The README’s how-to steps are the contract; Kane proves them against the live app, and a fail cannot be “fixed” by editing the docs.
- **30-second demo moment:** The README says “Click **Get started** and you land on the dashboard.” The button now says **Begin**. Kane goes red on the missing label. The agent renames the button, not the README; Kane goes green; evidence links appear under How to test.
- **Closed loop, concretely:** Action reads a tagged claims block → each claim is a Kane flow against the production URL → on red, fixer is barred from weakening the claims → app patch → replay.
- **Biggest risk:** claim-extraction scope creep, and a weaker spectacle than the August 3rd-place escape room.

### 3) Issue AC gate — net **77**

- **Pitch:** `Fixes #n` does not land until Kane has a green run of the issue’s acceptance criteria, with the evidence pack attached to the issue.
- **30-second demo moment:** The issue says “Add Milk, cart shows 1.” The PR shows a cart of 0. Kane’s clip is red. A follow-up commit makes the cart 1; the issue auto-closes with the green evidence link.
- **Closed loop, concretely:** PR parse of `Fixes #n` → extract AC block → Kane on preview → comment + check → fixer commit → replay → close issue on green.
- **Biggest risk:** looks like GuardianKane-lite; too many GitHub objects for a 30-second first impression; branch-protection setup.

### 4) Pricing-page auditor — net **77** (alternate to 5)

- **Pitch:** Kane checks that every plan and price on the pricing page is what checkout actually shows, then an agent has to make them match.
- **30-second demo moment:** The pricing card says Pro is $19. Checkout still says $29. Kane fails on the mismatch; the agent fixes the checkout copy; the replay is green.
- **Closed loop, concretely:** committed flows for each claim → Kane vs live pricing + checkout → fixer patches copy or the app → replay. Best as the *fixture* inside idea 4, not a second product.
- **Biggest risk:** too narrow if it is the whole submission; loop looks like a copy tweak unless the break is in real checkout behaviour.

### 5) One-box evidence report — net **74**

- **Pitch:** Paste a URL and one sentence, get a public pass/fail page with the Kane video; “Fix this” can open a capped agent loop on a connected repo.
- **30-second demo moment:** Judge (or the video) pastes the fixture URL and “a new user can complete signup.” A red report with the clip appears. One click starts the fixer; the report flips to green.
- **Closed loop, concretely:** web form → server or Action kicks `kane-cli run` against the given URL → store verdict + evidence link → optional fixer PR / loop.
- **Biggest risk:** closed loop is easy to leave half-built; may look like a skin on Kane’s own evidence viewer; needs a backend to run Kane (Actions `workflow_dispatch` or a small server), which is extra moving parts for a 2–3 day core.

---

## Recommendation (for the builder)

**Build idea 4, Preview-then-proof**, as a tiny fixture app on Vercel plus one GitHub Action that is the actual product. It is the only shortlist item that is simultaneously (a) the event’s stated thesis, (b) native to a phone-only GitHub→Vercel workflow, (c) installable tonight, and (d) able to show fail → evidence → fix → cheap replay in one PR, which is how ties are broken.

Do not try to out-spectacle KANE vs. ABLE. Win Craft on the official “would a developer want to install this tonight?” test, and win Verified with one meaningful broken user journey, not a homepage smoke test. Steal a *slice* of idea 9 (a tagged How-to-test block) and, if it stays free, use a pricing or checkout claim as the flow (idea 2) so the fail is obvious. If preview URLs misbehave on day one, point the same Action at the stable production URL and keep the loop.

Day-one blocker to clear before a spec: whether Oh-Jay can put an LLM API key (or another reliable fixer) in Actions secrets so the agent, not a human, reads Kane’s result.

