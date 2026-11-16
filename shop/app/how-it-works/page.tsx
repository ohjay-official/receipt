import type { Metadata } from "next";
import Link from "next/link";
import { Actions, Crumb, ProofLedger, Rows, I } from "../components/rebuild/bits";
import Rail from "../components/rebuild/rail";
import Subnav from "../components/rebuild/subnav";
import { KANE_STEPS_RED, PR3, PR4 } from "@/lib/site";

export const metadata: Metadata = { title: "How it works" };

const MOVES = [
  {
    id: "preview",
    pill: "Preview",
    title: <>Wait for Vercel.<br />Then remap the origin.</>,
    lead: "On a pull request, Receipt waits for the Vercel commit status and rewrites the recorded start URL onto that preview.",
    log: "vercel commit status: success\nremap origin → preview\nkane:how-to-test\npull request #3",
  },
  {
    id: "kane",
    pill: "Kane",
    title: <>Kane reads the contract.<br />A miss exits 1.</>,
    lead: "The How-to-test block is five required steps. On PR #3, step 3 failed because checkout showed $29.",
    log: "kane exit 1\nstep 3 of 5 failed\ncheckout showed $29\nrun 43698574333",
  },
  {
    id: "fix",
    pill: "Fix",
    title: <>One fenced patch.<br />Shop source only.</>,
    lead: "Gemini may edit shop/** application source. Commit 186ecdc changed shop/lib/prices.ts and shop/lib/checkout.ts only.",
    log: "receipt-fix: 1\n186ecdc\nshop/lib/prices.ts\nshop/lib/checkout.ts",
  },
  {
    id: "reverify",
    pill: "Re-verify",
    title: <>Same contract.<br />New preview.</>,
    lead: "A receipt-fix commit is pushed with the git token. Vercel builds again. Kane runs the same five steps, cap 3.",
    log: "kane exit 0\n5 steps passed\ngreen run 43699955024\nattempt 1 of 3",
  },
  {
    id: "receipt",
    pill: "Receipt",
    title: <>The card stays<br />on the pull request.</>,
    lead: "The comment lists what Kane saw, the fix or the refusal, the attempt count, and the evidence pack.",
    log: "Pull request #3\nVERIFIED\nred 43698574333\nfix 186ecdc\ngreen 43699955024",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="rb">
      <Rail />
      <header className="rb-ihero">
        <div className="rb-wrap rb-ihero-grid">
          <div>
            <Crumb items={[{ href: "/how-it-works", label: "How it works" }]} />
            <p className="rb-pill">The loop</p>
            <h1 className="rb-h1">From a lying preview<br />to a receipt.</h1>
            <p className="rb-lead">Receipt is a composite GitHub Action. It does not replace Kane. It starts Kane, pins what Kane saw, and, when the contract fails, offers one tightly fenced patch.</p>
            <Actions
              primary={{ href: "/docs/guardrails", label: "Read the guardrails" }}
              secondary={{ href: "/proof", label: "See the proof" }}
            />
          </div>
          <div className="rb-loop-diagram" aria-label="PR #3 loop">
            <article><i /><div><strong>Preview</strong><span>vercel: ready</span></div></article>
            <article><i /><div><strong>Kane</strong><span>exit 1 · checkout showed $29</span></div></article>
            <article><i /><div><strong>Fix</strong><span>receipt-fix: 1 · {PR3.fixSha}</span></div></article>
            <article><i /><div><strong>Re-verify</strong><span>green run 43699955024</span></div></article>
            <article><i /><div><strong>Receipt</strong><span>VERIFIED · 1 / 3</span></div></article>
          </div>
        </div>
      </header>
      <Subnav items={[
        { href: "#preview", label: "Preview" },
        { href: "#kane", label: "Kane" },
        { href: "#fix", label: "Fix" },
        { href: "#reverify", label: "Re-verify" },
        { href: "#receipt", label: "Receipt" },
        { href: "#guardrails", label: "Guardrails" },
      ]} />
      {MOVES.map((move, index) => (
        <section className="rb-sec" id={move.id} key={move.id}>
          <div className={index % 2 ? "rb-wrap rb-pair is-flip" : "rb-wrap rb-pair"}>
            <div>
              <p className="rb-pill">{move.pill}</p>
              <h2 className="rb-h2">{move.title}</h2>
              <p className="rb-lead">{move.lead}</p>
            </div>
            <div className="rb-terminal"><pre>{move.log}</pre></div>
          </div>
        </section>
      ))}
      <section className="rb-sec" id="guardrails">
        <div className="rb-wrap">
          <p className="rb-pill">Guardrails</p>
          <h2 className="rb-h2">Allowed, and refused.<br />The fence is the product.</h2>
          <div className="rb-allow">
            <article>
              <h3>Allowed</h3>
              <p>shop/** application source. PR #3 changed prices.ts and checkout.ts only.</p>
            </article>
            <article>
              <h3>Refused</h3>
              <p>tests/, the README contract, .github, action.yml, and src. PR #4 touched tests/checkout_test.md and was refused.</p>
              <p className="rb-stamp is-bad" style={{ position: "static", marginTop: 16 }}>REFUSED</p>
            </article>
          </div>
          <div className="rb-paper rb-ledger" style={{ marginTop: 24 }}>
            <p className="rb-slip-k">Pull request #4</p>
            <h3>REFUSED · 0 / 3</h3>
            <ol>
              {KANE_STEPS_RED.map((step) => (
                <li key={step.label}>{step.status} · {step.label}</li>
              ))}
            </ol>
            <p>{PR4.note}. Run 43700368892.</p>
            <p><a href={PR4.url}>Open the pull request</a></p>
          </div>
          <Rows
            items={[
              { icon: I.lock, title: "No test edits", body: "A patch that touches the Kane test or shop unit tests is refused before any push." },
              { icon: I.stamp, title: "No price weakening", body: "Deleting a step or moving PRO_PLAN_USD off 19 is treated as weakening." },
            ]}
          />
          <p className="rb-lead"><Link href="/docs/guardrails">Read the guardrails</Link> · <Link href="/docs/limitations">Limitations</Link></p>
        </div>
      </section>
      <section className="rb-sec" id="runs">
        <div className="rb-wrap">
          <h2 className="rb-h2">Runs still open.<br />Nothing here is merged.</h2>
          <p className="rb-lead">Production on main keeps the seeded bugs.</p>
          <ProofLedger />
        </div>
      </section>
    </main>
  );
}
