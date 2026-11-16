import type { Metadata } from "next";
import { Actions, Crumb } from "../components/rebuild/bits";
import Rail from "../components/rebuild/rail";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "Privacy",
  "This site stores no accounts and sets no cookies of its own. The demo shop takes no payment. Vercel Web Analytics records anonymous page views.",
);

export default function PrivacyPage() {
  return (
    <main className="rb">
      <Rail />
      <header className="rb-ihero">
        <div className="rb-wrap rb-ihero-grid">
          <div>
            <Crumb items={[{ href: "/privacy", label: "Privacy" }]} />
            <p className="rb-pill">Privacy</p>
            <h1 className="rb-h1">What this site keeps.</h1>
            <p className="rb-lead">
              Receipt the website does not ask you to sign in. The demo shop does not charge a card. The GitHub Action runs in your repository, with your secrets, not on this page.
            </p>
            <Actions primary={{ href: "/docs/install", label: "Read the install" }} secondary={{ href: "/", label: "Back to Receipt" }} />
          </div>
          <aside className="rb-paper rb-privacy-slip" aria-label="What is collected">
            <p className="rb-slip-k">Receipt</p>
            <h3>This visit</h3>
            <ul className="rb-kv">
              <li><span>Accounts</span><span>none</span></li>
              <li><span>Cookies set here</span><span>none</span></li>
              <li><span>Payment</span><span>not taken</span></li>
              <li><span>Page views</span><span>anonymous</span></li>
            </ul>
            <p className="rb-stamp">NO ACCOUNT</p>
          </aside>
        </div>
      </header>
      <section className="rb-sec">
        <div className="rb-wrap rb-pair">
          <div>
            <p className="rb-pill">Collected</p>
            <h2 className="rb-h2">Anonymous page views.<br />Nothing you can sign in with.</h2>
            <p className="rb-lead">
              Vercel Web Analytics counts pages people open. It does not use cookies and it does not identify a person. That is the only measurement this site adds.
            </p>
          </div>
          <div className="rb-terminal">
            <pre>{`collected
  page path
  referrer
  country, coarse
not collected
  name, email, account
  cookie id from this site
  card number`}</pre>
          </div>
        </div>
      </section>
      <section className="rb-sec">
        <div className="rb-wrap rb-pair is-flip">
          <div>
            <p className="rb-pill">The shop</p>
            <h2 className="rb-h2">The demo takes<br />no real payment.</h2>
            <p className="rb-lead">
              Pro is listed at $19. Checkout on main shows $29. LAUNCH10 does not change that total. Pay is a seeded control, not a charge. There is no account to create.
            </p>
          </div>
          <div className="rb-paper" style={{ padding: 20 }}>
            <p className="rb-slip-k">Demo shop</p>
            <ul className="rb-kv">
              <li><span>Plans</span><span>$19</span></li>
              <li className="is-bad"><span>Checkout on main</span><span>$29</span></li>
              <li className="is-bad"><span>LAUNCH10</span><span>no-op</span></li>
              <li className="is-bad"><span>Pay</span><span>not a charge</span></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="rb-sec">
        <div className="rb-wrap">
          <p className="rb-pill">The action</p>
          <h2 className="rb-h2">Gemini runs in your repo.<br />Not on this website.</h2>
          <p className="rb-lead">
            This site has no model endpoint. The fixer is the GitHub Action in the repository you install it on. Secrets stay in that repository. The cap is three receipt-fix commits, and the allowlist is shop source.
          </p>
        </div>
      </section>
    </main>
  );
}
