import { I, Node, Rows, SectionHead } from "./bits";

export default function PreviewSplit() {
  return (
    <section className="rb-sec" id="wait" aria-labelledby="wait-title">
      <div className="rb-wrap rb-split">
        <Node label="Kane" />
        <div className="rb-split-main">
          <SectionHead
            id="wait-title"
            pill="Preview"
            title={<>Wait for the preview.<br />Zero new tools.</>}
            lead="The action listens for the Vercel commit status, then remaps the recorded origin onto that preview."
            href="/how-it-works#preview"
            link="Learn more →"
          />
          <Rows
            items={[
              { icon: I.git, title: "Listens on pull_request", body: "Auto-started since PR #2. The workflow waits for the Vercel commit status on the head SHA." },
              { icon: I.file, title: "Reads the README contract", body: "Kane follows the <!-- kane:how-to-test --> block, the same five steps as the committed test file." },
              { icon: I.lock, title: "Secrets stay in GitHub", body: "LambdaTest, Gemini, and the git token are repository secrets. The workflow never prints them." },
            ]}
          />
        </div>
        <div className="rb-panel" aria-hidden="false">
          <article className="rb-svc">
            <i data-tone="ok" />
            <div>
              <strong>Vercel preview</strong>
              <span>receipt-git-…vercel.app</span>
              <em>Ready</em>
            </div>
          </article>
          <div className="rb-conn">
            <span>commit status: success</span>
            <span>remap origin</span>
            <span>kane:how-to-test</span>
          </div>
          <article className="rb-svc">
            <i data-tone="bad" />
            <div>
              <strong>Kane</strong>
              <span>step 3 failed: checkout showed $29</span>
              <em>Run 43698574333</em>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
