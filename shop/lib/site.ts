/** Public URLs and copy facts used by the marketing pages. Do not invent numbers. */
export const SITE_NAME = "Receipt";
export const TAGLINE = "Don't merge a preview without a Receipt.";
export const REPO_URL = "https://github.com/ohjay-official/receipt";
export const PRODUCTION_URL = "https://receiptci.vercel.app";

export const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/docs", label: "Docs" },
  { href: "/proof", label: "Proof" },
  { href: "/shop", label: "Demo shop" },
] as const;

export const DOC_NAV = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/install", label: "Install" },
  { href: "/docs/contract", label: "The contract" },
  { href: "/docs/configuration", label: "Configuration" },
  { href: "/docs/guardrails", label: "Guardrails" },
  { href: "/docs/limitations", label: "Limitations" },
] as const;

export const PR3 = {
  url: "https://github.com/ohjay-official/receipt/pull/3",
  preview: "https://receipt-git-demo-t3-three-bugs-oh-jay-s-projects.vercel.app",
  redRun: "https://github.com/ohjay-official/receipt/actions/runs/43698574333",
  redEvidence:
    "https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14155571858",
  fixSha: "186ecdc",
  fixUrl: "https://github.com/ohjay-official/receipt/commit/186ecdc",
  greenRun: "https://github.com/ohjay-official/receipt/actions/runs/43699955024",
  greenEvidence:
    "https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14156410343",
  attempts: "1 / 3",
};

export const PR4 = {
  url: "https://github.com/ohjay-official/receipt/pull/4",
  run: "https://github.com/ohjay-official/receipt/actions/runs/43700368892",
  evidence:
    "https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14155439852",
  note: "Receipt refused fix: touched tests/checkout_test.md",
};

export const EARLIER = {
  pr1: "https://github.com/ohjay-official/receipt/pull/1",
  pr2: "https://github.com/ohjay-official/receipt/pull/2",
  pr2Fix: "https://github.com/ohjay-official/receipt/commit/e7542b0",
};

export const KANE_STEPS_GREEN = [
  { status: "passed" as const, label: "Open the pricing page and confirm Pro is $19" },
  { status: "passed" as const, label: "Choose Pro and continue to checkout" },
  { status: "passed" as const, label: "Checkout must show $19 for Pro" },
  { status: "passed" as const, label: "LAUNCH10 takes 10% off Pro" },
  { status: "passed" as const, label: "Pay works in the phone layout" },
];

export const KANE_STEPS_RED = [
  { status: "passed" as const, label: "Open the pricing page and confirm Pro is $19" },
  { status: "passed" as const, label: "Choose Pro and continue to checkout" },
  { status: "failed" as const, label: "Checkout must show $19 for Pro" },
  { status: "skipped" as const, label: "LAUNCH10 takes 10% off Pro" },
  { status: "skipped" as const, label: "Pay works in the phone layout" },
];

export const HACKATHON_URL = "https://luma.com/kanecli-online-hackathon";

export const PR1 = {
  url: "https://github.com/ohjay-official/receipt/pull/1",
  redRun: "https://github.com/ohjay-official/receipt/actions/runs/43683895636",
  greenRun: "https://github.com/ohjay-official/receipt/actions/runs/43684482513",
  fixSha: "9492501",
  fixUrl: "https://github.com/ohjay-official/receipt/commit/9492501",
};

export const PR5 = {
  url: "https://github.com/ohjay-official/receipt/pull/5",
  preview: "https://receipt-git-demo-t12-site-loop-oh-jay-s-projects.vercel.app",
  redRun: "https://github.com/ohjay-official/receipt/actions/runs/43701888824",
  redEvidence:
    "https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14157390481",
  fixSha: "55b2815",
  fixUrl: "https://github.com/ohjay-official/receipt/commit/55b2815",
  greenRun: "https://github.com/ohjay-official/receipt/actions/runs/43702361655",
  greenEvidence:
    "https://evidence.lambdatest.com/?pack=gh-artifact%3Aohjay-official%2Freceipt%2F14156718986",
  attempts: "1 / 3",
};

export const PROOF_ROWS = [
  {
    n: 1,
    title: "Pull request #1",
    verdict: "VERIFIED" as const,
    attempts: "1 / 3",
    red: "43683895636",
    redUrl: PR1.redRun,
    fix: "9492501",
    fixUrl: PR1.fixUrl,
    green: "43684482513",
    greenUrl: PR1.greenRun,
    prUrl: PR1.url,
    story: "First live Kane run. The seeded checkout was $29, then the fix went green.",
  },
  {
    n: 2,
    title: "Pull request #2",
    verdict: "VERIFIED" as const,
    attempts: "1 / 3",
    red: "43686930592",
    redUrl: "https://github.com/ohjay-official/receipt/actions/runs/43686930592",
    fix: "e7542b0",
    fixUrl: EARLIER.pr2Fix,
    green: "43687402846",
    greenUrl: "https://github.com/ohjay-official/receipt/actions/runs/43687402846",
    prUrl: EARLIER.pr2,
    story: "Receipt auto-starts on pull_request. Red run, then fix e7542b0, then green.",
  },
  {
    n: 3,
    title: "Pull request #3",
    verdict: "VERIFIED" as const,
    attempts: "1 / 3",
    red: "43698574333",
    redUrl: PR3.redRun,
    fix: "186ecdc",
    fixUrl: PR3.fixUrl,
    green: "43699955024",
    greenUrl: PR3.greenRun,
    prUrl: PR3.url,
    story: "Checkout showed $29. The fixer committed 186ecdc, shop source only, and the re-run went green.",
  },
  {
    n: 4,
    title: "Pull request #4",
    verdict: "REFUSED" as const,
    attempts: "0 / 3",
    red: "43700368892",
    redUrl: PR4.run,
    fix: "—",
    fixUrl: "",
    green: "—",
    greenUrl: "",
    prUrl: PR4.url,
    story: "Receipt fed the fixer path a scripted cheat diff (RECEIPT_DEMO_CHEAT) that weakens tests/checkout_test.md. The guardrail refused it and nothing was pushed.",
  },
  {
    n: 5,
    title: "Pull request #5",
    verdict: "VERIFIED" as const,
    attempts: "1 / 3",
    red: "43701888824",
    redUrl: PR5.redRun,
    fix: "55b2815",
    fixUrl: PR5.fixUrl,
    green: "43702361655",
    greenUrl: PR5.greenRun,
    prUrl: PR5.url,
    story: "The same loop after the site rebuild. Red, a shop-only fix, then green.",
  },
] as const;

export type BeltVerdict = "passed" | "refused";

/** Home proof belt. Every figure is from a real run. */
export const BELT = [
  {
    id: "pr1",
    title: "Pull request #1",
    href: PR1.url,
    lines: ["First live Kane run", "Seeded checkout was $29", "Red run 43683895636"],
    verdict: "passed" as BeltVerdict,
    attempts: "1 / 3",
    commit: PR1.fixSha,
    note: "Green run 43684482513",
    links: [
      { label: "Pull request", href: PR1.url },
      { label: PR1.fixSha, href: PR1.fixUrl },
      { label: "Green run", href: PR1.greenRun },
    ],
  },
  {
    id: "pr2",
    title: "Pull request #2",
    href: EARLIER.pr2,
    lines: ["Auto-starts on pull_request", "Red run 43686930592", "Fix e7542b0"],
    verdict: "passed" as BeltVerdict,
    attempts: "1 / 3",
    commit: "e7542b0",
    note: "Green run 43687402846",
    links: [
      { label: "Pull request", href: EARLIER.pr2 },
      { label: "e7542b0", href: EARLIER.pr2Fix },
    ],
  },
  {
    id: "pr3",
    title: "Pull request #3",
    href: PR3.url,
    lines: ["Checkout showed $29", "Coupon and Pay skipped", "Red run 43698574333"],
    verdict: "passed" as BeltVerdict,
    attempts: PR3.attempts,
    commit: PR3.fixSha,
    note: "Green run 43699955024",
    links: [
      { label: "Pull request", href: PR3.url },
      { label: PR3.fixSha, href: PR3.fixUrl },
      { label: "Green run", href: PR3.greenRun },
    ],
  },
  {
    id: "pr4",
    title: "Pull request #4",
    href: PR4.url,
    lines: ["Checkout failed at $29", "Proposed a test-file edit", "Run 43700368892"],
    verdict: "refused" as BeltVerdict,
    attempts: "0 / 3",
    commit: "nothing pushed",
    note: PR4.note,
    links: [
      { label: "Pull request", href: PR4.url },
      { label: "Run", href: PR4.run },
      { label: "Evidence", href: PR4.evidence },
    ],
  },
  {
    id: "pr5",
    title: "Pull request #5",
    href: PR5.url,
    lines: ["Loop after the rebuild", "Red run 43701888824", "Fix 55b2815"],
    verdict: "passed" as BeltVerdict,
    attempts: PR5.attempts,
    commit: PR5.fixSha,
    note: "Green run 43702361655",
    links: [
      { label: "Pull request", href: PR5.url },
      { label: PR5.fixSha, href: PR5.fixUrl },
      { label: "Green run", href: PR5.greenRun },
    ],
  },
] as const;
