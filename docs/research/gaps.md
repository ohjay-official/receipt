# Gaps and unverified items

**Researched:** Thu 12 Nov 2026, Africa/Lagos.  
Everything here could not be verified from a primary official page, or is a conflict between official pages. Do not treat these as facts.

---

## A. Official-page conflicts (need a Slack or email ruling)

1. **Submission form:** Luma → https://www.surveymonkey.com/r/kane-cli-hackathon-submission. kaneclihack.sh → https://www.kaneclihack.sh/o/submit (login required; exact fields not captured). It is not stated whether one replaced the other, or both must be filled.
2. **Repo visibility:** Luma allows “public, or invited access for the judges.” Official site: repo “must be public.”
3. **Demo host and length:** Luma: 3 minutes, YouTube unlisted *or* Drive, judges stop at 3:00. Official site: YouTube only, “about 3 to 5 minutes.”
4. **Live URL:** Luma: required as “live URL or runnable command,” usable in under 30 seconds. Official site: live URL optional.
5. **Launch posts:** Official site requires at least two public posts (HN, X, Reddit, LinkedIn) and calls launch buzz required + bonus. Luma does not mention this.
6. **OpenAI credits:** Official site HTML gives **+$250 OpenAI credits to 1st, 2nd, and 3rd**. Luma lists cash only. TestMu’s 29 Oct X post says “$3,000+ in prizes and credits” but does not specify the $250.
7. **Slack invites:** Luma contains two different `join.slack.com/t/kaneai/…` URLs (`zt-4gbmvhfsl-…` and `zt-478cnz1pt-…`). Official site uses only the first. Neither was clicked through to confirm it still works.
8. **Contact email:** Luma `support@testmuai.com` vs official site `conferences@testmuai.com`.
9. **Brief scope:** Luma “working web app” vs official site “app, an agent or a workflow… on web or mobile.”
10. **Terms link:** official site points at [TestMuConf 2026 conference terms](https://www.testmuai.com/testmuconf-2026/conference-terms-and-conditions/). Whether those conference terms legally govern this online hackathon was not verified (they may be a leftover). The on-page contest guidelines were captured in `00-logistics.md`.
11. **“Kane CLI Pro” prize name** vs current pricing, where Kane CLI has no separate paid plans and KaneAI Pro is the paid credit plan. What winners actually receive is not spelled out for this edition.
12. **Luma calendar `end_at` (10:30 PM WAT 19 Nov)** vs written deadline (7:29 PM WAT 19 Nov). Also Luma’s odd “19 November, 11:30 AM PT onwards” building line.
13. **Luma `location_type: offline`** for an online event — almost certainly a data error.
14. A circulating [LinkedIn post](https://www.linkedin.com/posts/testmu-ai_kanecli-hackathon-aiagents-activity-7515781123411505152-rot9) still says “October 26 – November 2” and “$100 worth of free credits.” That does not match either official page.

---

## B. Unpublished for this edition

15. **Names of the three TestMu AI engineer judges.** No bios, no “what I look for” statements tied to this panel.
16. **Winner announcement date** still reads `[DATE]` on Luma. No stream URL.
17. **Office hours / “twice a day” engineer line:** no times, no calendar, no Luma sessions. May be in the pre-hack email or Slack only.
18. **Kickoff:** “Thu 12 Nov Kickoff. Building starts” has no clock time, agenda, or stream on the official site. Luma start is 11:30 PM WAT — whether anything is actually “kicked off” live is unknown.
19. **Repo-initialization timezone** (“on or after 12 November”) is unspecified.
20. **Whether kaneclihack.sh `/o/register` team roster is required** in addition to Luma RSVP.
21. **Exact SurveyMonkey (and `/o/submit`) field list** — forms were not filled or fully inventoried (SurveyMonkey not opened; `/o/submit` is behind login).
22. **Pre-hackathon email / cheat sheet contents** (promised, not public).
23. **Participant projects already announced for the 12–19 Nov edition:** none found on X or the Luma page as of this morning. Re-check after kickoff.
24. **How “launch buzz” is scored** if it is required (eligibility vs “brownie points” only).

---

## C. Kane CLI feasibility leftovers

25. Whether the **10,000-credit hackathon grant** includes **`testrun run --remote` / HyperExecute macOS runners** (docs say `--remote` needs a plan with those runners). Unverified; do not plan a mobile/real-device demo on it.
26. Whether **cloud coding-agent VMs** (Cursor cloud, Copilot coding agent, etc.) can run Kane (need Node + Chrome or a remote browser + secrets). Plausible, not documented. GitHub Actions *is* documented.
27. Exact **credits per typical `kane-cli run`** for this CLI version. Official order-of-magnitude is KaneAI step rates (~1.5–2.5 credits/step; ~80 credits for a ~40-step authoring). Luma says first-run authoring spends credits and replay is free. No hackathon-specific tariff sheet.
28. Relationship between the **10,000 Kane CLI credits (1 month / 30 days)** and the general credits-management doc (free users “1,000 credits,” complimentary batches “valid one year”). Possibly different pools; not reconciled.
29. Whether a **phone browser** can complete TestMu signup + credentials copy + GitHub secrets without a desktop. Expected yes, not tested in this pass.
30. Discord (https://discord.gg/SqVMtNeWEf) is on the product README; not described as the hackathon support channel.

---

## D. Research that was incomplete

31. **October 24, 2026 SF Hack Day winners** — not found on an official recap in this pass. Public participant projects were noted; placements were not.
32. **May 30, 2026 Hack Day official winner write-up** — relied on a TestMu LinkedIn post (URL noted in `02-organizer.md`) and search-result synthesis for one-line project descriptions. Re-open the post and any blog before citing details as gospel.
33. **Why August also-rans lost** (onred, Elenchos, and others) — no official critique.
34. **Wider comparable hackathons** (Browserbase, Stagehand, QA Wolf, Momentic, Cursor, Claude, Playwright-sponsored events): no primary-source winner reviews in this pass.
35. **Founder / judge long-form interviews** on judging philosophy — not found beyond official rubric language, the August winners blog, and short staff posts (e.g. Shravan Mahajan on Kane “as the agent inside the product”).
36. **kaneclihack.sh/ship** (Hack Day showcase) and prior winner demo videos were not fully watched.
37. Two Slack invite links and the SurveyMonkey form were not live-tested (no registration/click-through that would join or submit).

---

## How to close the important ones

Ask in Slack or to `conferences@testmuai.com` / `support@testmuai.com` (both addresses appear officially): which form to use; whether launch posts, public repo, and YouTube-only/5-minute video are binding; office-hour times; winner date; whether free credits cover `--remote`; repo-init timezone. Watch the pre-hack email. Re-search X and Slack after kickoff for named judges and competing projects.
