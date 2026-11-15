import { KANE_STEPS_GREEN, PR3 } from "@/lib/site";

type Step = { status: "passed" | "failed" | "skipped"; label: string };

export default function ReceiptSlip({
  title = "Pull request #3",
  verdict = "passed",
  attempts = PR3.attempts,
  steps = KANE_STEPS_GREEN,
  href = PR3.url,
  footnote = "Kane on the preview · shop files only",
}: {
  title?: string;
  verdict?: "passed" | "failed";
  attempts?: string;
  steps?: Step[];
  href?: string;
  footnote?: string;
}) {
  return (
    <aside className={`slip ${verdict === "failed" ? "slip-failed" : "slip-passed"}`} aria-label={`${title}, ${verdict}`}>
      <div className="perforation" aria-hidden="true" />
      <div className="slip-body">
        <p className="slip-kicker">Receipt</p>
        <h2 className="slip-title">{title}</h2>
        <p className={`slip-verdict ${verdict}`}>{verdict}</p>
        <p className="slip-meta">
          Kane <span className="tabular">{attempts}</span> attempts
        </p>
        <ol className="slip-steps">
          {steps.map((step) => (
            <li key={step.label}>
              <span className={`step-mark ${step.status}`}>{step.status}</span>
              <span>{step.label}</span>
            </li>
          ))}
        </ol>
        <p className="slip-foot">{footnote}</p>
        <a className="slip-link" href={href}>
          Open the pull request
        </a>
      </div>
      <div className="perforation perforation-bottom" aria-hidden="true" />
    </aside>
  );
}
