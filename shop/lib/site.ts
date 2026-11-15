/** Public URLs and copy facts used by the marketing pages. Do not invent numbers. */
export const SITE_NAME = "Receipt";
export const TAGLINE = "Don't merge a preview without a Receipt.";
export const REPO_URL = "https://github.com/ohjay-official/receipt";
export const PRODUCTION_URL = "https://receipt-taupe-one.vercel.app";

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
