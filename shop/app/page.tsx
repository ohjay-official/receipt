import type { Metadata } from "next";
import SkyHero from "./components/sky-hero";
import Rail from "./components/rebuild/rail";
import LoopSection from "./components/rebuild/loop-section";
import PreviewCards from "./components/rebuild/preview-cards";
import PreviewSplit from "./components/rebuild/preview-split";
import CapSection from "./components/rebuild/cap-section";
import ProofWindows from "./components/rebuild/proof-windows";
import RecordBoard from "./components/rebuild/record-board";
import ShopCalculator from "./components/shop-calculator";
import VelaCards from "./components/rebuild/vela-cards";
import InstallPrint from "./components/rebuild/install-print";
import { SITE_NAME, TAGLINE } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

const HOME_DESCRIPTION =
  "Receipt is a GitHub Action. It waits for the Vercel preview, runs Kane on the README How-to-test contract, and leaves the card on the pull request.";

export const metadata: Metadata = {
  ...pageMeta(`${SITE_NAME}. ${TAGLINE}`, HOME_DESCRIPTION, "/", "Previewed. Verified."),
  title: { absolute: `${SITE_NAME}. ${TAGLINE}` },
};

export default function HomePage() {
  return (
    <main>
      <SkyHero />
      <div className="rb">
        <div className="rb-journey">
          <Rail />
          <LoopSection />
          <PreviewCards />
          <PreviewSplit />
          <CapSection />
          <ProofWindows />
          <RecordBoard />
          <ShopCalculator />
          <VelaCards />
          <InstallPrint />
        </div>
      </div>
    </main>
  );
}
