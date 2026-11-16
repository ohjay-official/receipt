"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Node, SectionHead } from "./bits";

const TABS = ["Preview", "Kane", "Fix", "Re-verify", "Receipt"] as const;

const ROWS = [
  { name: "Vercel preview ready", tone: "ok" },
  { name: "Kane run 43698574333 failed: checkout showed $29", tone: "bad" },
  { name: "receipt-fix: 1 · 186ecdc", tone: "" },
  { name: "Kane run 43699955024 passed", tone: "ok" },
] as const;

export default function LoopSection() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setStep((n) => (n + 1) % TABS.length), 3500);
    return () => window.clearInterval(id);
  }, [paused]);

  const rowOn = step === 4 ? -1 : step;

  return (
    <section className="rb-sec rb-s1" id="loop" aria-labelledby="loop-title">
      <div className="rb-wrap">
        <Node label="Preview" />
        <SectionHead
          id="loop-title"
          pill="The loop"
          title={<>Kane reads the preview.<br />The receipt stays on the PR.</>}
          lead="Connect the pull request. Receipt waits for Vercel, runs Kane on your README contract, and leaves the card."
          href="/how-it-works"
          link="Learn more →"
        />
        <div
          className="rb-frame"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="rb-chrome">
            <span className="rb-crumb-full">ohjay-official / receipt / pull/3</span>
            <span className="rb-crumb-short">receipt / pull/3</span>
            <div className="rb-chrome-tabs">
              <span>Conversation</span>
              <span aria-current="true">Checks</span>
              <span>Files changed</span>
            </div>
          </div>
          <div className="rb-canvas">
            <ol className="rb-timeline">
              {ROWS.map((row, index) => (
                <li key={row.name} className={rowOn === index ? "is-on" : undefined} data-tone={row.tone}>
                  <i />
                  <span>{row.name}</span>
                </li>
              ))}
            </ol>
            <aside className={step === 4 ? "rb-float is-hot" : "rb-float"} aria-label="Pull request #3 receipt">
              <p className="rb-slip-k">Receipt</p>
              <h3>Pull request #3</h3>
              <p className="rb-verdict">VERIFIED</p>
              <dl>
                <div><dt>Red</dt><dd>43698574333</dd></div>
                <div><dt>Fix</dt><dd>186ecdc</dd></div>
                <div><dt>Green</dt><dd>43699955024</dd></div>
              </dl>
              <span className="rb-stamp">VERIFIED</span>
            </aside>
          </div>
          <div className="rb-tabbar" role="tablist" aria-label="Loop">
            {TABS.map((tab, index) => (
              <button key={tab} type="button" role="tab" aria-selected={step === index} onClick={() => setStep(index)}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <ul className="rb-feats">
          <li>
            <strong>Waits for the preview</strong>
            <p>The action holds until Vercel reports the commit status, then points Kane at that URL.</p>
          </li>
          <li>
            <strong>Runs your README contract</strong>
            <p>Kane follows the How-to-test block. A required failure exits 1 and starts the card.</p>
          </li>
          <li>
            <strong>Leaves a receipt on the PR</strong>
            <p>The comment shows Kane&apos;s verdict for each step, the attempt count, and a link to the evidence pack.</p>
          </li>
        </ul>
        <div className="rb-runs">
          <span>Runs on</span>
          <ul>
            <li>GitHub Actions</li>
            <li>Vercel</li>
            <li>Kane CLI</li>
            <li>Gemini</li>
          </ul>
          <Link href="/docs/install">Install</Link>
        </div>
      </div>
    </section>
  );
}
