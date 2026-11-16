import type { Metadata } from "next";
import Link from "next/link";
import DocsNav from "../components/docs-nav";
import { Actions, Crumb } from "../components/rebuild/bits";
import Subnav from "../components/rebuild/subnav";

export const metadata: Metadata = { title: "Docs" };

const CARDS = [
  ["Install", "/docs/install", "Secrets, the production URL variable, and the workflow that waits for Vercel.", "Repo secrets", "One workflow file"],
  ["The contract", "/docs/contract", "The How-to-test block Kane follows, including the three seeded bugs on main.", "Five required steps", "$19, $17.10, Pay"],
  ["Configuration", "/docs/configuration", "Action inputs, the allowlist, and how Receipt finds the preview URL.", "shop/**", "max-fixes 3"],
  ["Guardrails", "/docs/guardrails", "Shop application source only. No test or contract edits.", "PR #4 refused", "tests/checkout_test.md"],
  ["Limitations", "/docs/limitations", "Kane replay ignores --url. CI Chrome cannot resize to a phone.", "Phone layout (390px)", "pull_request path"],
];

export default function DocsIndexPage() {
  return (
    <>
      <header className="rb-ihero">
        <div className="rb-wrap rb-ihero-grid">
          <div>
            <Crumb items={[{ href: "/docs", label: "Docs" }]} />
            <p className="rb-pill">Docs</p>
            <h1 className="rb-h1">Set the contract,<br />then let Kane read it.</h1>
            <p className="rb-lead">Receipt is a composite GitHub Action. You point it at a public repository that deploys to Vercel, and at a How-to-test block in the README.</p>
            <Actions primary={{ href: "/docs/install", label: "Read the install" }} secondary={{ href: "/docs/contract", label: "The contract" }} />
          </div>
          <div className="rb-readme">
            <div className="rb-chrome"><span>README.md</span></div>
            <pre>
              <mark>{"<!-- kane:how-to-test -->"}</mark>
              {"\n"}1. Open /pricing. Pro is $19.
              {"\n"}2. Choose Pro. Continue to /checkout.
              {"\n"}3. Checkout must show $19.
              {"\n"}4. LAUNCH10 must total $17.10.
              {"\n"}5. Phone layout (390px), then Pay.
              {"\n"}<mark>{"<!-- /kane:how-to-test -->"}</mark>
            </pre>
          </div>
        </div>
      </header>
      <Subnav items={[
        { href: "/docs/install", label: "Install" },
        { href: "/docs/contract", label: "Contract" },
        { href: "/docs/configuration", label: "Configuration" },
        { href: "/docs/guardrails", label: "Guardrails" },
        { href: "/docs/limitations", label: "Limitations" },
      ]} />
      <div className="rb-wrap rb-docs-grid">
        <DocsNav />
        <div>
          <div className="rb-doc-cards">
            {CARDS.map(([title, href, body, a, b]) => (
              <Link key={href} href={href}>
                <strong>{title}</strong>
                <span>{body}</span>
                <span>{a}</span>
                <span>{b}</span>
              </Link>
            ))}
          </div>
          <p className="rb-banner">Receipt runs on GitHub Actions, Vercel previews, and Kane CLI.</p>
        </div>
      </div>
    </>
  );
}
