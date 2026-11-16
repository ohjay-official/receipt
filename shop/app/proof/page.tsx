import type { Metadata } from "next";
import { Actions, Crumb, MiniSlip } from "../components/rebuild/bits";
import ProofWindows from "../components/rebuild/proof-windows";
import Rail from "../components/rebuild/rail";
import Subnav from "../components/rebuild/subnav";
import { PRODUCTION_URL, PROOF_ROWS } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "Proof",
  "Five pull requests ran the loop. Each receipt links its red run, its fix, and its green run. None should be merged. Main still has the seeded bugs.",
  "/proof",
);

export default function ProofPage() {
  return (
    <main className="rb">
      <Rail />
      <header className="rb-ihero">
        <div className="rb-wrap rb-ihero-grid">
          <div>
            <Crumb items={[{ href: "/proof", label: "Proof" }]} />
            <p className="rb-pill">Proof</p>
            <h1 className="rb-h1">What Kane actually ran.</h1>
            <p className="rb-lead">These are live pull requests and Actions runs. Production on main still shows the seeded bugs. None of these pull requests should be merged.</p>
            <Actions
              primary={{ href: PRODUCTION_URL, label: "Live site" }}
              secondary={{ href: "/shop/pricing", label: "Demo plans" }}
            />
          </div>
          <div className="rb-stack" aria-label="Pull request receipts, with the refusal on top">
            <i /><i />
            <MiniSlip row={PROOF_ROWS[3]} />
          </div>
        </div>
      </header>
      <Subnav items={[
        { href: "#belt", label: "Pull requests" },
        { href: "#cards", label: "Cards" },
        { href: "#shop", label: "Seeded shop" },
      ]} />
      <section className="rb-sec" id="belt">
        <div className="rb-wrap">
          <p className="rb-pill">Five slips</p>
          <h2 className="rb-h2">Every run id<br />is on the slip.</h2>
          <ProofWindows bare />
        </div>
      </section>
      <section className="rb-sec" id="cards">
        <div className="rb-wrap">
          <div className="rb-prgrid">
            {PROOF_ROWS.map((row) => (
              <article className="rb-prcard" key={row.n}>
                <header className={row.verdict === "REFUSED" ? "rb-prhead is-bad" : "rb-prhead"}>
                  <strong>{row.verdict}</strong>
                  <p>Kane {row.attempts}</p>
                  <p>red {row.red}</p>
                  <p>fix {row.fix}</p>
                  <p>green {row.green}</p>
                </header>
                <div>
                  <h3>{row.title}</h3>
                  <p>{row.story}</p>
                  <p className="rb-links">
                    <a href={row.prUrl}>Pull request</a>
                    {row.fixUrl ? <a href={row.fixUrl}>{row.fix}</a> : null}
                    {row.greenUrl ? <a href={row.greenUrl}>Green run</a> : <a href={row.redUrl}>Run</a>}
                  </p>
                </div>
              </article>
            ))}
            <article className="rb-prcard" id="shop">
              <header className="rb-prhead is-bad">
                <strong>SEEDED</strong>
                <p>Still on main</p>
                <p>plans $19</p>
                <p>checkout $29</p>
                <p>LAUNCH10 no-op</p>
              </header>
              <div>
                <h3>The seeded shop is still on main</h3>
                <p>/pricing lists Pro at $19. /checkout totals $29. LAUNCH10 does not take 10% off. Pay is covered in Phone layout and at 900px and below.</p>
                <p className="rb-links">
                  <a href={PRODUCTION_URL}>Live site</a>
                  <a href={`${PRODUCTION_URL}/pricing`}>Plans</a>
                  <a href={`${PRODUCTION_URL}/checkout`}>Checkout</a>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
