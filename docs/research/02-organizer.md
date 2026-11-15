# Phase 1.3 — Organizer: TestMu AI (formerly LambdaTest) and Kane CLI

**Researched:** Thu 12 Nov 2026, Africa/Lagos.

---

## Company

**Stated** on the official [About page](https://www.testmuai.com/about/):

- Legal entity: LambdaTest, Inc. Former name LambdaTest; **renamed TestMu AI on 12 January 2026**. “Same founders, same engineering organization, same customer accounts, and the same infrastructure.”
- Founded 2017.
- Four co-founders: **Asad Khan** (CEO), **Jay Singh** (Chief Customer Officer), **Mayank Bhola** (Head of Product), **Mudit Singh** (Head of Growth).
- Also listed in leadership: Maneesh Sharma (COO), Naveen Gupta (CFO), plus other VPs.
- Offices: San Francisco, Noida, Bengaluru, Dubai.
- Positioning: “World’s first full-stack Agentic AI Quality Engineering platform.” About-page figures: 3M+ users across 132 countries; 18,000+ enterprise customers. Treat marketing figures as company-stated, not independently audited here.
- The TestMu AI Luma host bio uses the same “Full-Stack Agentic AI Quality Engineering platform” line. X: [\@testmuai](https://x.com/testmuai). Kane CLI product account: [\@kane_cli](https://x.com/kane_cli).

---

## Ecosystem priorities and recent launches

Chronology of public launches that matter for this brief (company or press statements):

| When | What | Source |
|---|---|---|
| Aug 2024 | **KaneAI** announced as an end-to-end AI test agent: natural-language authoring, execution, debugging, evolution of tests | [PR Newswire, KaneAI launch](https://www.prnewswire.com/news-releases/lambdatest-introduces-kaneai-the-first-end-to-end-ai-test-agent-pioneering-a-new-era-in-quality-engineering-302227305.html); company also recapped this in [August 2024 updates](https://www.testmuai.com/blog/august-2024-updates/) |
| Aug 2025 | **Agent-to-Agent Testing** announced as a platform to test AI agents (behavior, safety, reasoning, real-world scenarios) | [PR Newswire, Agent-to-Agent Testing](https://www.prnewswire.com/news-releases/lambdatest-unveils-the-worlds-first-platform-to-test-ai-agents-introducing-agent-to-agent-testing-302533430.html) |
| 12 Jan 2026 | Rebrand LambdaTest → TestMu AI | [About](https://www.testmuai.com/about/) |
| 14 Apr 2026 | `LambdaTest/kane-cli` GitHub repo created | [GitHub API](https://api.github.com/repos/LambdaTest/kane-cli) |
| 16 Apr 2026 | `@testmuai/kane-cli` first published to npm | [npm](https://www.npmjs.com/package/@testmuai/kane-cli) |
| 30 May 2026 | First in-person Kane CLI Hack Day (SF, partnership with dev.to and AWS/Kiro), $5,000 | [luma.com/eieewjee](https://luma.com/eieewjee), [Devpost](https://kane-cli-hack-day.devpost.com/) |
| 19–31 Aug 2026 | First Kane CLI Online Hackathon, $6,000, 69 submissions | [luma.com/kanecli-online](https://luma.com/kanecli-online), [winners blog](https://www.testmuai.com/blog/kane-cli-hackathon-winners/) |
| 24 Oct 2026 | Kane CLI Hack Day SF, supported by OpenAI, “$30,000+ in prizes and credits” | [luma.com/kane-cli-hack-day](https://luma.com/kane-cli-hack-day) |
| 7 Nov 2026 | Kane CLI **0.10.3** (latest at research time) | [CHANGELOG](https://github.com/LambdaTest/kane-cli/blob/main/CHANGELOG.md) |
| 12–19 Nov 2026 | This online hackathon, $3,000 cash | [Luma](https://luma.com/kanecli-online-hackathon) |

Adjacent products now on the TestMu pricing page, which show where the company is placing bets ([pricing.md](https://www.testmuai.com/pricing.md)):

- **KaneAI** — credit-priced testing agent; Kane CLI is its “free terminal-native companion.”
- **Agent Testing** — evaluators for chatbots, voice, phone-caller, image agents.
- **Agent Assurance / Rook CLI** — “end-to-end testing for AI agents that act (call tools, write files, hit APIs).”
- The long-standing grid: Live Testing, Automation, HyperExecute, Smart UI, Performance Testing, Test Manager, Browser Cloud.

**Stated product thesis for Kane CLI** (repeated on event pages, docs, and the Playwright comparison): coding agents write code fast but cannot verify it in a real browser; Kane closes that loop with a **verdict** (pass/fail + evidence + exit codes), not another set of click tools. Cached `_test.md` replay is free of LLM cost. Assurance commands go further: ingest a PRD, extract use-cases cited to the doc, design acceptance criteria and `_test.md` tests, measure coverage against ACs, `maintain reconcile` when the PRD changes. ([docs intro](https://www.testmuai.com/docs/kane-cli-introduction), [README](https://github.com/LambdaTest/kane-cli/blob/main/README.md), Luma Lane 4)

Recent changelog themes (Oct–Nov 2026, [CHANGELOG](https://github.com/LambdaTest/kane-cli/blob/main/CHANGELOG.md)): `explore run` remote-by-default on HyperExecute (up to 20 cloud browsers, findings, accessibility, live map) in 0.10.0 (28 Oct); evidence-pack sealing and locator/error clarity in 0.10.2 (5 Nov); LT tunnel to private backends and delayed typing in 0.10.3 (7 Nov).

---

## What Kane CLI does that competitors don’t (as TestMu states it)

Primary comparison TestMu published: [Playwright CLI vs Playwright MCP vs Kane CLI](https://www.testmuai.com/blog/kane-cli-vs-playwright-mcp/) (updated 19 Oct 2026), by Kane CLI PM Anubhav Singhmaar, reviewed by Director of Engineering Srinivasan Sekar.

**Stated differentiator, quoted in spirit from that article:**

- Playwright CLI / Playwright MCP let an agent *drive a browser*. The **agent** still decides whether the app worked.
- Kane CLI takes a goal in plain English, runs it in real Chrome, and returns **pass/fail with an evidence pack and POSIX exit codes**, so “the agent stops grading its own homework.”
- Second run of a saved flow: Playwright tools reason through it again; Kane “replays saved steps from cache with no LLM cost; re-authors only what changed.”
- Native mobile (simulator/emulator, and cloud real devices) is listed as a Kane capability those Playwright tools do not have.
- CI signal is a first-class Kane job; the article says Playwright CLI/MCP are “not designed” to be a CI gate on their own (use Playwright Test or Kane for that).

Other named competitors in the parent brief (Browserbase, Stagehand, QA Wolf, Momentic) were **not** the subject of a TestMu head-to-head found in this pass. **Inference, labeled as such:** Browserbase is a cloud browser infrastructure API; Stagehand is a deterministic + AI browser framework; QA Wolf and Momentic are managed/AI QA services. Kane’s claimed wedge is “plain-English goal → independent verdict + evidence + cheap replay + agent/CI hook,” sitting next to existing Playwright/Selenium suites rather than replacing them. The event FAQ says exactly that: “Kane sits next to existing test setups.” ([Luma](https://luma.com/kanecli-online-hackathon))

Treat vendor comparison blogs as interested sources. Slack Engineering’s token/reliability numbers in that article are about Playwright CLI vs MCP, not about Kane.

---

## Previous LambdaTest / TestMu hackathons and winners

### 1) Kane CLI Hack Day — San Francisco, 30 May 2026 (in person)

- $5,000 cash ($2,500 / $1,500 / $1,000). Required IDE: **AWS Kiro**. Kane CLI required as verifier. Same three bars and four equal dimensions, with “Kiro” in the closed-loop wording. ([Devpost](https://kane-cli-hack-day.devpost.com/), [Luma](https://luma.com/eieewjee))
- 78 Luma ticket registrations (API `num_guests`); Devpost shows 26 participants — those numbers measure different things and should not be blended.
- **Winners, as reported in a TestMu LinkedIn post** summarized in search results as Project Dispatch (Team Little Giants, 1st), Project TouchGrass (Team Narwhals, 2nd), Project Ghostwriter (Youssef Saad, 3rd). The LinkedIn post URL is [this TestMu post](https://www.linkedin.com/posts/testmu-ai_kane-cli-winners-activity-7469751934351130624-OgtN) (“120+ builders. 30 teams.”). Search-result synthesis described Dispatch as autonomous incident triage/fix/verification, TouchGrass as a social app for logging real hangouts, Ghostwriter as autonomous draft/post/verify of X content. **The full winner write-up was not fetched end-to-end in this pass;** treat the one-line project descriptions as from that post’s circulation, and re-open the post before relying on details. A second-place participant write-up exists: [Noriaki Kishida on LinkedIn](https://www.linkedin.com/posts/noriaki-kishida_last-saturday-my-team-and-i-competed-at-activity-7467865117347528705-yHxd). Youssef Saad’s site: [youssefsaad.com](https://youssefsaad.com/).

### 2) Kane CLI Online Hackathon — 19–31 Aug 2026 (closest precedent)

- $6,000 cash ($3,000 / $2,000 / $1,000) plus the same founder 1:1, 3 months Kane CLI Pro, blog feature, badge. Deadline 11:59 PM IST on 31 Aug. Repo on or after 19 August. Same three bars, four equal dimensions, same lanes. Submission was already the same SurveyMonkey form URL. ([luma.com/kanecli-online](https://luma.com/kanecli-online) API description)
- Luma ticket count: **170**. Official recap: **69 teams submitted**. ([winners blog](https://www.testmuai.com/blog/kane-cli-hackathon-winners/), published 19 Sep 2026)

**Winners (official recap, quoted above in `01-judges.md`):**

| Place | Project | Builder | Lane (as labeled in the recap) | Why TestMu said it won | Repo |
|---|---|---|---|---|---|
| 1st | demo.studio | Sam Felix | Browser agents in the wild | Kane used three ways: build partner, runtime performer (films third-party product demos), and tester of demo.studio itself | [github.com/SamFelix03/demo.studio](https://github.com/SamFelix03/demo.studio) |
| 2nd | GuardianKane | Abhinav | Verification baked into your workflow | Claude Code Stop-hook: “done” is earned only after Kane replays a generated test and a defect sweep; PRD-to-tasks; `kane-cli context review --approve` and `maintain reconcile` | [github.com/18Abhinav07/adventures-with-kane](https://github.com/18Abhinav07/adventures-with-kane) |
| 3rd | KANE vs. ABLE | Christine Lall | Apps that verify themselves | Adversarial escape room: ABLE builds a dungeon, Kane independently tries to escape; failed run exposed a circular dependency, agent repaired it, Kane escaped with code 7294 | Demo linked from the recap; repo not named in the recap text |

**Strong submitted projects that are not listed as winners** (public X, August 2026):

- **onred** by Emma ([\@_HEISEMMA, 21 Aug 2026](https://x.com/_HEISEMMA/status/2090883057133797736)): “kane finds the bug. onred fixes it. a spec becomes real browser checks. when one goes red an opencode agent reads the evidence, patches one line, and kane runs the same checks again. 3/3 green.” Reposted by TestMu community and growth staff (Kavya, Mudit, Jay). This is exactly the closed loop the rubric asks for; it did **not** place in the published top three. Why it lost is **not stated**. Possible inferences (not facts): craft/wow, demo, or “meaningfulness” of the bug may have scored lower than the winners’ layered or spectacular uses.
- **Elenchos**, submitted by [\@Zephyr_cryt](https://x.com/Mayankbhola/status/2090867492365520946) (Mayank reposted): “an MCP-enabled verification layer for AI coding agents.” Not a published winner. Repo/demo were not pulled in this pass.
- A closed-loop storefront demo by [\@druxambCrypto, 1 Sep 2026](https://x.com/druxambCrypto/status/2094751034719482275): Kane catching a silent console error and a 500 on a shipping API that screenshot tests missed. Outcome unknown.

### 3) Kane CLI Hack Day — San Francisco, 24 Oct 2026, supported by OpenAI

- In person, Frontier Tower / SF. “$30,000+ in prizes and credits.” Podium as stated on Luma: 1st Apple Vision Pro + $3,000 OpenAI credits; 2nd Mac mini + $2,000; 3rd iPad + $1,000; every builder $250 OpenAI credits and 3 months of KaneAI Pro (worth $270). Tracks: Web, Mobile, Wildcard, plus “Most Innovative Use of Kane CLI.” ([luma.com/kane-cli-hack-day](https://luma.com/kane-cli-hack-day))
- Luma ticket count: **191**. Hosts included TestMu AI, Kavya Nair, Sparsh Kesari, Xenofon, Frontier Tower, Layan.
- **Winners of this day were not found** in official blog or X search during this pass. Participant projects that *were* public: **Bugsy** (Aayush Khator — “security seatbelt”; “caught two seeded bugs… reading and changing another user's invoice”); **Room for Error** ([\@compiling_life](https://x.com/Mayankbhola/status/2114546818034156008) — “AI-generated escape rooms that @kane_cli playtests”); **Node Arena** ([\@tejit99](https://x.com/nehatewari1993/status/2114361120815550471) — Kane played a level and won in ~6m16s, plus replay); **AEG / Kane Room** ([Yao Li](https://x.com/YaoLi0615/status/2114376708048797782) — Kane passed scoped local flows; a harder reuse question “remains unproven”).
- Employee takeaway after the day ([Shravan Mahajan, 27 Oct](https://x.com/shvnmahajan/status/2114912190633517098)): Kane used “not just for testing, but as the agent inside the product.”

### 4) Older LambdaTest challenges

A 2024 “Feedback Hero” / KaneAI-related challenge with named winners appears in a [LambdaTest LinkedIn post](https://www.linkedin.com/posts/lambdatest_kaneai-activity-7247956477489885185-HJJE). It is not a Kane CLI build hackathon; do not treat those winners as precedent for this rubric. Not researched in depth.

---

## Official messaging for *this* edition

Repeated line: “Build it with any agent. Verify it with Kane. Ship in a week.”  
29 Oct 2026 TestMu post: “Build with OpenAI, verify with Kane CLI, and compete for $3,000+ in prizes and credits.” ([tweet](https://x.com/testmuai/status/2115766314681905400)) “Build with OpenAI” is promotional; the official rules still say any agent. OpenAI credits appear as prizes on kaneclihack.sh.

A 13 Oct 2026 [\@kane_cli post](https://x.com/kane_cli/status/2110015300058202569) and a LinkedIn post circulating with dates “October 26 – November 2” and “$100 worth of free credits” ([LinkedIn](https://www.linkedin.com/posts/testmu-ai_kanecli-hackathon-aiagents-activity-7515781123411505152-rot9)) **do not match** the official Nov 12–19 window or the 10,000-credit grant. Treat that LinkedIn date/credit figure as stale or a draft; do not plan around it.
