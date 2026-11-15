# Submission draft — Receipt

**Written:** Thu 12 Nov 2026, Africa/Lagos  
**Rule:** fill this draft now; anything that does not exist until after the build is marked `TBD-post-build:`. Filling a form and pressing Submit are **two later, separate approvals** (Phase 7). Do not submit from this draft.

Safe bar until the Luma vs kaneclihack.sh mismatch is clarified: public repo, YouTube unlisted video with the money shot in the first 10 seconds and a hard stop by 3:00 (length no more than 5:00), a live URL **and** a one-line install, one paragraph covering the agent + Kane, and readiness to fill **both** forms. Launch posts (required only on kaneclihack.sh): at least two, TBD later.

Deadline: **Thu 19 Nov 2026, 7:29 PM WAT** (19 Nov, 11:59 PM IST). No pushes after that.

---

## 1. SurveyMonkey (Luma)

Form: https://www.surveymonkey.com/r/kane-cli-hackathon-submission  
Fields verified from the live form on 12 Nov 2026 (title: “Kane CLI Online Hackathon Project Submission Survey”).

| # | Field | Value |
|---|---|---|
| 1 | Are you participating as a solo participant or as a team? (Required) | **Solo** |
| 2 | Did you sign up on TestMu AI and claim your 10,000 free Kane CLI credits before building the project? | **Yes** — complete T0 / step A in `plan.md` **before** the first code push |
| 3 | What is your name or your team members name? (Required) | **Oh-Jay** (`TBD-post-build:` use legal name if the form/rules later require it) |
| 4 | Emails of your teammates, or, if "Solo," write yours. (Required) | `TBD-post-build:` Oh-Jay’s email — same email as Luma + TestMu |
| 5 | What is your GitHub repository link? (Required) | `TBD-post-build:` https://github.com/ohjay-official/receipt (create after 11:30 PM WAT on 12 Nov) |
| 6 | What is your demo video link (YouTube unlisted or Drive) (Required) | `TBD-post-build:` YouTube **unlisted** URL (safe bar: YouTube, not only Drive). Test in an incognito window. |
| 7 | Provide a one-paragraph description of your project, covering what you built, which coding agent you used, and what Kane CLI verifies. (Required) | See draft below. After the build, add the live URL and the exact agent name(s) actually used. |
| 8 | Provide a live URL or install command. | `TBD-post-build:` production `https://…vercel.app` **and** the install line: `uses: ohjay-official/receipt@main` (see README). |
| 9 | Which lane does your project fit? | **Verification baked into your workflow** (recommended: the product is the drop-in Action). Alternative if we re-pitch the shop as the hero: “Apps that verify themselves.” Other official choices: “Browser agents in the wild,” “Requirements that test themselves,” “Other.” |
| 10 | Which coding agents did you use? | **Cursor** (planned). Also tick **Other** and name any other cloud agent actually used. Official choices: Claude Code, Cursor, Copilot, Codex, Windsurf, Kiro, Other. `TBD-post-build:` tick only what was really used. |

### Question 7 — paragraph draft

> Receipt is a drop-in GitHub Action that runs Kane CLI on the Vercel preview of a pull request against a tagged How-to-test contract in the README. The demo shop’s pricing page promises Pro at $19 while checkout is seeded at $29; Kane catches that mismatch and pins the sealed evidence on the PR. A fixer agent reads Kane’s Result.md, may only patch allowlisted app source (never the README contract or the workflows), and Kane replays the same saved `_test.md` until the flow is green, at most three tries. Built with Cursor cloud agents on a phone-only GitHub → Vercel workflow.

`TBD-post-build:` swap in the final production URL and the agent names that actually landed the commits.

---

## 2. kaneclihack.sh `/o/submit`

Form: https://www.kaneclihack.sh/o/submit (login wall; exact boxes not fully inventoried on 12 Nov). Official site public copy asks for at least:

| Field (from public rules / site copy) | Value |
|---|---|
| GitHub URL — repo started on or after 12 Nov; must be public | `TBD-post-build:` https://github.com/ohjay-official/receipt |
| Written explanation of the project / how Kane and the agent were used | Reuse the Question 7 paragraph |
| Demo video — YouTube, about 3 to 5 minutes | `TBD-post-build:` same unlisted YouTube URL |
| Live URL — “if your project is deployed. Optional.” | `TBD-post-build:` provide it anyway (safer Luma bar) |
| Launch buzz — at least two public posts (HN, X, Reddit, or LinkedIn), required on this site only | `TBD-post-build:` draft posts in Phase 6–7; do not post until the builder asks |

Until Slack or email says which form is authoritative, **be ready to file both**, with the same repo, video, and paragraph.

---

## 3. Material that is not on the forms but must exist

- Public README with a For Judges path and the tagged How-to-test block.
- Demo script: `docs/brief.md` (138 words, product on screen in the first 10 seconds). Record so the $19 vs $29 evidence is visible immediately. No secrets on screen.
- Live production URL + a PR that shows red evidence → fixer → green replay.
- `TBD-post-build:` YouTube unlisted, incognito-tested; two launch posts if required; payout / prize contact only if a form asks (never commit a wallet to the repo).

---

## 4. Do not submit yet

Phase 7: the builder reviews the filled form. Pressing Submit is a separate approval.
