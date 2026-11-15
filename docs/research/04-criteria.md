# Phase 1.5 — Judging criteria (verbatim) and what organizers are encouraging

**Researched:** Thu 12 Nov 2026, Africa/Lagos.  
Quotes below are copied from the public official pages. Minor punctuation/whitespace normalized only where the page used zero-width or list bullets. Source URLs are next to each block.

---

## 1. The three “ready to ship” bars (must clear these first)

Luma, under “What ‘ready to ship’ means” ([source](https://luma.com/kanecli-online-hackathon)):

> Your submission has to clear three bars. Miss one and the judges can't score the rest of what you built.
>
> 1. The app works end to end. A user can load it, complete the primary flow, and get a result. Screenshots and mocks don't count. We need the real thing, deployed or runnable locally with one command.
>
> 2. Kane CLI caught something or proved something. Show one of two things. Either "Kane CLI caught this bug during the build, here's the failed run," or "Kane CLI verifies these flows pass, here's the green run." Both count. What doesn't count: Kane CLI installed but never run, or one trivial flow added at the end just to qualify.
>
> 3. Your agent and Kane CLI talked to each other. The agent's output triggered a Kane CLI run, or a Kane CLI result triggered the agent to act. The cleanest version: a hook runs Kane CLI on save, the run fails, the agent reads the failure, edits the code, and the next save runs Kane CLI again. Show us that moment. The tighter the loop, the higher the score.

kaneclihack.sh, shorter form ([source](https://www.kaneclihack.sh/)):

> Ready to ship means
>
> 1. It works end to end
> 2. Kane CLI caught or proved something
> 3. Your agent and Kane CLI talked to each other
>
> Miss a bar and the judges can't score the rest.

**Fact:** these bars are a gate, not a fourth scored dimension. A submission that misses one is, as written, unscored on Ships/Verified/Closed loop/Craft.

---

## 2. Four scored dimensions, weighted equally (25% each on the official site)

### Luma wording ([source](https://luma.com/kanecli-online-hackathon))

> Every submission is scored by a panel of TestMu AI engineers across four dimensions, weighted equally.
>
> - Ships: a working app with a real flow that runs end-to-end, built and running, beyond slides.
> - Verified: Kane CLI actually exercised the app and caught or confirmed something meaningful.
> - Closed loop: agent built, Kane verified, result fed back to the agent. The tighter the integration, the higher the score.
> - Craft: did you reach for something interesting? Does this feel like a thing a developer would want to install tonight?

> A polished todo app with one Kane flow tacked on at the end will lose to a weirder, scrappier thing where a hook fires Kane and the agent re-prompts itself based on what Kane finds. Both are valid submissions. The second is the one we're really hoping to see.
>
> Three judges score every submission independently. Scores are averaged. Ties break on Verified, then Closed loop.

### kaneclihack.sh wording ([source](https://www.kaneclihack.sh/))

> Scored by three TestMu AI engineers. Clear the three bars first, then four dimensions, weighted equally.

> 01 · 25% Ships — A real flow that runs end to end. Not slides.
> 02 · 25% Verified — Kane CLI caught or confirmed something meaningful.
> 03 · 25% Closed loop — Kane's result feeds back to the agent. Tighter is better.
> 04 · 25% Craft — Would a developer want to install this tonight?
>
> Scores are averaged. Ties break on Verified, then Closed loop.

The 25% figures are **explicit only on kaneclihack.sh**. Luma’s “weighted equally” is the same math if there are four dimensions and no other scored category.

**Launch buzz** (official site only): “Launch buzz is required: post about your project at least twice on Hacker News, X, Reddit or LinkedIn. More posts, reach and engagement earn brownie points.” It is **not** listed as a fifth scored dimension with a weight. **Inference:** it is an eligibility or bonus item, not 20% of the score, unless Slack says otherwise.

---

## 3. Event objective (stated)

Luma “Why this exists” ([source](https://luma.com/kanecli-online-hackathon)):

> AI coding agents have changed how software gets written. Features ship from prompts. Bugs get fixed in seconds. But one part of the loop never closed: the agent that writes the code has no way to verify it on web or mobile before handing it off.
>
> That's the bottleneck now. Writing the code got easy. Trusting it didn't.
>
> Kane CLI was built for that gap. Describe a flow as a natural language prompt and run it from your terminal. No selectors. No framework. Kane CLI runs it in a real browser, or on an iOS simulator or Android emulator, and returns a pass or fail with a video trace. Every check it runs can become a permanent test in your CI, right next to your existing automation.
>
> It works as a developer utility. It also works as a tool any AI coding agent can call directly.
>
> That second part is the interesting one. An agent that writes code but can't check its own work is running open-loop. An agent that calls Kane CLI sees what it just shipped, reads the failure, and fixes it before anyone reviews the PR.
>
> We want to see what builders do when they close that loop. Bring any agent you like.

The challenge itself:

> Build a working web app with an AI coding agent. Verify it with Kane CLI. Ship by 11:59 PM IST on 19 November.
>
> That's the whole brief.

(The official site’s first sentence is slightly wider: “Build an app, an agent or a workflow… on web or mobile.”)

Three rules, Luma:

> - Any agent, any stack. … We don't care which agent. We care that it does real work.
> - Kane CLI verifies the app. At minimum, show it in your demo. The strongest submissions wire Kane CLI into the agent loop itself: a hook that runs Kane CLI on every save, an agent that reads Kane CLI's NDJSON output and iterates until the flow passes, or a spec that compiles down to Kane CLI flows.
> - It runs, it ships, and you can demo it on video.

---

## 4. What organizers are really trying to encourage (inference, labeled)

The following is **inference** from the official wording, the August recap, and staff posts — not a hidden official rubric.

1. **They are product-marketing a verification layer for coding agents.** The event exists to produce shareable proof that Kane belongs *in the agent loop*, in CI, and sometimes *as the product’s hands*. Winners get a blog feature and channel amplification; “Verified with Kane CLI” badges go to everyone who ships.
2. **“Meaningful” in the Verified bar is the anti-cheat clause.** A trivial “open the homepage” flow “just to qualify” is explicitly called out as not counting.
3. **Closed loop is both a bar and a tie-break (after Verified).** Tightness is the scoring gradient: hook-on-save or agent-reads-NDJSON-and-iterates is the “cleanest version” they wrote down.
4. **Craft is “would a developer install this tonight?”** plus “weirder, scrappier” over polished generic apps. Spectacle is welcome (Lane 3 / “Pure chaos”) but usefulness is the Craft test as written.
5. **They will have seen last edition’s winners.** A remake of demo.studio, GuardianKane, or KANE vs. ABLE without a clear upgrade is a weak Craft/novelty position (inference from the existence of a public winners blog).
6. **Demo first impressions matter.** “Judges watch this first, so lead with the interesting part.” Luma: they stop at 3:00. Official site allows ~3–5 minutes. Lead with the fail→fix→pass moment, not setup.
7. **Lane 4 (PRD → `_test.md` → evidence pack / coverage against ACs)** is the newest surface on the idea menu and matches 0.10.x “assurance” commands in the README. Encouraging use of the *latest* Kane capabilities is a reasonable reading of why that lane exists, not a stated bonus weight.

---

## 5. Practical mapping of criteria → evidence a judge can see

Not official instructions; a checklist derived from the quoted rules:

| Criterion | What would make it easy to score |
|---|---|
| Bar 1 / Ships | Live URL or one-command run; primary flow completes; README “do X, see Y” |
| Bar 2 / Verified | In the video: a real failed Kane run *or* a green run of a non-trivial flow, plus the evidence pack / video trace |
| Bar 3 / Closed loop | In the video: agent (or hook) triggers Kane, Kane output comes back, agent changes code, Kane runs again |
| Ships 25% | Same as bar 1, but quality of the actual product |
| Verified 25% (tie-break 1) | “Meaningful” catch or confirmation, not a smoke open |
| Closed loop 25% (tie-break 2) | Tightness of integration (hook, NDJSON iteration, spec→flows) |
| Craft 25% | Specific, installable, or memorably weird; not a generic todo |

Phone-only implication: the video must show the loop even if Kane ran in GitHub Actions. CI logs + evidence artifact + an agent commit that reacted to a failed run can be that moment, if it is filmed clearly.
