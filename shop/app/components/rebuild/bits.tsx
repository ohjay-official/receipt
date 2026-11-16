import Link from "next/link";
import type { ReactNode } from "react";
import { PROOF_ROWS } from "@/lib/site";

export function Icon({ d, d2 }: { d: string; d2?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
      {d2 ? <path d={d2} /> : null}
    </svg>
  );
}

export const I = {
  eye: "M1.5 9S4.2 4.5 9 4.5 16.5 9 16.5 9 13.8 13.5 9 13.5 1.5 9 1.5 9Z M9 11.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z",
  file: "M4 2.5h6.2L14 6.2V15.5H4V2.5Z M10 2.8V6.4h3.5",
  stamp: "M5 11.5h8v2.2H5V11.5Z M6.2 11.5V8.2a2.8 2.8 0 0 1 5.6 0v3.3 M4 15.2h10",
  lock: "M5 8.2V6.4a4 4 0 0 1 8 0v1.8 M4 8.2h10V15.5H4V8.2Z",
  git: "M6 12.5v-2.2 M6 6.2v2.2 M6 8.4h4.2a2 2 0 0 0 2-2V5",
  bolt: "M10 2.5 4.8 9.6h3.4L8 15.5l5.4-7.2H10L10 2.5Z",
  check: "M3.5 9.2 7.2 13 14.5 5",
  shield: "M9 2.4 14.5 4.6v4.4c0 3.4-2.3 5.6-5.5 6.6-3.2-1-5.5-3.2-5.5-6.6V4.6L9 2.4Z",
  list: "M4 5h10 M4 9h10 M4 13h7",
};

export function Node({ label }: { label?: string }) {
  return (
    <span className={label ? "rb-node" : "rb-node is-quiet"}>
      {label ? <em>{label}</em> : null}
    </span>
  );
}

export function SectionHead({
  id,
  pill,
  title,
  lead,
  href,
  link,
}: {
  id?: string;
  pill: string;
  title: ReactNode;
  lead: ReactNode;
  href?: string;
  link?: string;
}) {
  return (
    <div className="rb-copy">
      <p className="rb-pill">{pill}</p>
      <h2 className="rb-h2" id={id}>{title}</h2>
      <p className="rb-lead">
        {lead}
        {href && link ? <> <Link href={href}>{link}</Link></> : null}
      </p>
    </div>
  );
}

export function Rows({
  items,
}: {
  items: { title: string; body: string; icon: string }[];
}) {
  return (
    <ul className="rb-rows">
      {items.map((item) => (
        <li key={item.title}>
          <span className="rb-ico"><Icon d={item.icon} /></span>
          <div>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MiniSlip({
  row,
  active,
}: {
  row: (typeof PROOF_ROWS)[number];
  active?: boolean;
}) {
  const refused = row.verdict === "REFUSED";
  return (
    <article className={active ? "rb-slip is-active" : "rb-slip"}>
      {active ? <span className="rb-scan" aria-hidden="true" /> : null}
      <p className="rb-slip-k">Receipt</p>
      <h3>{row.title}</h3>
      <p className={refused ? "rb-verdict is-bad" : "rb-verdict"}>{row.verdict}</p>
      <p className="rb-slip-meta">Kane {row.attempts}</p>
      <dl>
        <div><dt>Red</dt><dd>{row.redUrl ? <a href={row.redUrl}>{row.red}</a> : row.red}</dd></div>
        <div><dt>Fix</dt><dd>{row.fixUrl ? <a href={row.fixUrl}>{row.fix}</a> : row.fix}</dd></div>
        <div><dt>Green</dt><dd>{row.greenUrl ? <a href={row.greenUrl}>{row.green}</a> : row.green}</dd></div>
      </dl>
      <span className={refused ? "rb-stamp is-bad" : "rb-stamp"}>{refused ? "REFUSED" : "VERIFIED"}</span>
    </article>
  );
}

export function ProofLedger() {
  return (
    <div className="rb-paper rb-ledger">
      <p className="rb-slip-k">Receipt ledger</p>
      <div className="rb-table-wrap">
        <table>
          <thead>
            <tr>
              <th>PR</th>
              <th>Red run</th>
              <th>Fix</th>
              <th>Green run</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            {PROOF_ROWS.map((row) => (
              <tr key={row.n} className={row.verdict === "REFUSED" ? "is-refused" : undefined}>
                <td><a href={row.prUrl}>#{row.n}</a></td>
                <td>{row.redUrl ? <a href={row.redUrl}>{row.red}</a> : row.red}</td>
                <td>{row.fixUrl ? <a href={row.fixUrl}>{row.fix}</a> : row.fix}</td>
                <td>{row.greenUrl ? <a href={row.greenUrl}>{row.green}</a> : row.green}</td>
                <td>{row.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Crumb({ items }: { items: { href: string; label: string }[] }) {
  return (
    <p className="rb-crumb">
      <Link href="/">Home</Link>
      {items.map((item) => (
        <span key={item.href}>
          <span aria-hidden="true"> / </span>
          <Link href={item.href}>{item.label}</Link>
        </span>
      ))}
    </p>
  );
}

export function Actions({
  primary,
  secondary,
}: {
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="rb-actions">
      <Link className="rb-btn rb-btn-paper" href={primary.href}>{primary.label}</Link>
      {secondary ? <Link className="rb-btn rb-btn-ghost" href={secondary.href}>{secondary.label}</Link> : null}
    </div>
  );
}
