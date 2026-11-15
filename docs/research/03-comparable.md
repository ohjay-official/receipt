# Phase 1.4 — Comparable hackathons

**Researched:** Thu 12 Nov 2026, Africa/Lagos.

The closest, best-documented comparables are TestMu’s own Kane CLI events. They use nearly the same brief, three bars, and four equally weighted dimensions as this edition. External AI-testing / dev-tool-CLI / agentic-coding hackathons were searched more lightly; anything not opened to a primary source is marked as a gap.

---

## A. TestMu’s own Kane events (highest relevance)

Details and sources are in `02-organizer.md`. The pattern that matters for *kinds of solutions* (no new project ideas here):

### What placed

Across the official August recap and the circulated May Hack Day results, winning work shared at least one of these properties (stated in official or first-party recaps, not inferred as a universal law):

1. **Kane is not a late bolt-on.** It is the build loop, the runtime, and/or the gate. ([August winners blog](https://www.testmuai.com/blog/kane-cli-hackathon-winners/))
2. **The closed loop is visible on camera:** fail → evidence → agent fix → Kane pass. Christine Lall’s dungeon and Abhinav’s checkout-bug companion demo are the textbook versions.
3. **Layered use scored.** demo.studio (1st, August) used Kane three ways in one product.
4. **Independence of the verifier is a talking point.** “Kane was not scripted through the dungeon. It solved it.”
5. **Craft / spectacle still matters (25%).** An escape room and a product that *is* a browser agent both placed; a solid closed-loop fixer (onred) and an MCP verification layer (Elenchos) were public and staff-amplified in August but are not in the published top three. Why they lost is **unstated**.

### What the May in-person day adds (different constraints)

May required **Kiro** as the IDE and a live 3-minute demo plus 2 minutes of questions. That favors in-room theatrical demos and Kiro hooks. The circulated winners (Dispatch, TouchGrass, Ghostwriter) look like shipped apps with Kane as verifier/agent hands, but the full official write-up was not fully extracted in this pass — see gaps.

### What the October SF day adds

Same “Kane inside the agent / as the agent in the product” taste ([Shravan Mahajan](https://x.com/shvnmahajan/status/2114912190633517098)). Public projects that day included a security seatbelt (Bugsy), another Kane-playtested escape room (Room for Error), a Kane-played game (Node Arena), and a scoped research-app verification (Kane Room). **Winners not found.** Escape-room-with-Kane-as-player is now a **repeated** shape (August 3rd + at least one October entry). Treating that shape as fresh ground in November would be a risk; the official site still lists “an agent that beats a browser game on vision alone” and escape-adjacent chaos as idea prompts, but judges have already seen the pattern.

### Scale note

August: 170 Luma RSVPs, 69 submissions, 3 winners, $6,000.  
This edition: 205 Luma RSVPs as of the morning of 12 Nov, $3,000 cash (possibly +$750 OpenAI credits). Smaller purse, similar rubric, possibly similar or higher awareness because it is a second edition and follows a high-profile October day.

---

## B. Other AI-testing / browser-agent / dev-tool CLI / agentic-coding hackathons

This pass did **not** complete a primary-source review of winners from Browserbase, Stagehand, QA Wolf, Momentic, Playwright, or Cursor/Claude-code-sponsored hackathons. No official “AI testing hackathon winners” list from those vendors was opened and verified here.

**What can still be said carefully:**

- The Kane events themselves *are* the main public dataset for “agentic coding + verification CLI” prizes in 2026.
- TestMu’s own comparison frames Playwright MCP / Playwright CLI as **adjacent tools**, not as rival hackathon platforms ([article](https://www.testmuai.com/blog/kane-cli-vs-playwright-mcp/)).
- General hackathon patterns that the official Kane rubric already encodes (and that the August recap confirms): a 3-minute video that leads with the interesting moment; a working end-to-end path a judge can run in ~30 seconds; proof, not slides; tighter integration with the sponsor’s newest surface area.

Until a wider comparable set is opened, do not claim “this is how Browserbase/Stagehand hackathons were won.” That is a documented gap (`gaps.md`).

---

## C. Implications for kinds of solutions (still no specific ideas)

From this comparable set only:

- **Kinds that have already placed, so a new entry would need a clear upgrade, not a remake:** product-that-is-a-browser-agent (demo.studio); agent “done” gate / PRD-to-Kane workflow (GuardianKane); adversarial builder-vs-Kane game or escape room (KANE vs. ABLE, Room for Error).
- **Kinds that were publicly submitted and staff-amplified but did not place (August), so the bar is higher than “the loop works”:** a tight fail-fix-reverify agent on a spec (onred); an MCP `verify_with_kane` layer (Elenchos). The official idea menu still lists an MCP server and hook-on-save tools — they are valid, but they are no longer surprising by themselves.
- **Kinds the official menu still pushes that are less obviously already-won:** PRD-to-suite / requirements that test themselves (Lane 4; GuardianKane already used context/maintain, so a shallow remake is risky); Kane in CI on preview deploys; README-or-changelog drift detectors; self-healing checkout as a *visible* demo, not a blog post.
- **Phone-only constraint vs past winners:** GuardianKane is a Claude Code extension with local-browser Stop-hooks — hard to demo faithfully from a phone. demo.studio is a deployed web app Kane can be run against from CI — closer to a phone-only shape. Games/escape rooms can be web apps with Kane in Actions, but originality is now the issue.

Sources for this section are the same official recap, Luma pages, and X posts cited in `02-organizer.md`.
