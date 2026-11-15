import type { Metadata } from "next";
import SkyHero from "./components/sky-hero";
import PerformanceStage from "./components/performance-stage";
import ShopCalculator from "./components/shop-calculator";
import ProofConveyor from "./components/proof-conveyor";
import VelaSection from "./components/vela-section";
import { FeatureBands, InstallBand, ShortBands, StatsBand, WorkflowBand } from "./components/home-bands";
import { SITE_NAME, TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME}. ${TAGLINE}` },
};

export default function HomePage() {
  return (
    <main>
      <SkyHero />
      <FeatureBands />
      <PerformanceStage />
      <ShortBands />
      <ProofConveyor />
      <WorkflowBand />
      <ShopCalculator />
      <VelaSection />
      <StatsBand />
      <InstallBand />
    </main>
  );
}
