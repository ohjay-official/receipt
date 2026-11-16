import { Node, SectionHead } from "./bits";

export default function VelaCards() {
  return (
    <section className="rb-sec" id="why" aria-labelledby="why-title">
      <div className="rb-wrap">
        <Node />
        <SectionHead
          id="why-title"
          pill="Why it exists"
          title={<>A preview can lie.<br />The receipt says so.</>}
          lead="Kane drives a real browser against the contract. The card is the record of what that browser saw."
        />
        <div className="rb-velas">
          <article>
            <div className="rb-vela-art">
              <div className="rb-mini-check">
                <p>Checkout</p>
                <strong>$29</strong>
                <span>Expected $19</span>
              </div>
            </div>
            <h3>The catch is a real browser</h3>
            <p>Kane opened the preview and read the checkout total. The plans page still said $19.</p>
            <ul>
              <li>Step 3 of 5 failed</li>
              <li>Red run 43698574333</li>
              <li>Pull request #3</li>
            </ul>
          </article>
          <article>
            <div className="rb-vela-art">
              <ol className="rb-spark">
                <li data-tone="ok"><span>#1</span></li>
                <li data-tone="ok"><span>#2</span></li>
                <li data-tone="ok"><span>#3</span></li>
                <li data-tone="bad"><span>#4</span></li>
                <li data-tone="ok"><span>#5</span></li>
              </ol>
            </div>
            <h3>The runs stay attached</h3>
            <p>Each pull request keeps its red run, its fix commit, and its green run. PR #4 has no fix.</p>
            <ul>
              <li>Four green re-runs</li>
              <li>One refusal</li>
              <li>Nothing merged</li>
            </ul>
          </article>
          <article>
            <div className="rb-vela-art">
              <ul className="rb-tree">
                <li className="is-open">shop/**</li>
                <li>tests/</li>
                <li>.github/</li>
                <li>src/</li>
                <li>action.yml</li>
                <li>README</li>
              </ul>
            </div>
            <h3>Fenced</h3>
            <p>The fixer may edit shop source. Tests, the contract, workflows, and the action are refused.</p>
            <ul>
              <li>186ecdc, two shop files</li>
              <li>PR #4 refused a test edit</li>
              <li>Cap is 3 commits</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
