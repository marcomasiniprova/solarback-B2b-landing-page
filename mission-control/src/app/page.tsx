"use client";
import PageHeader from "@/components/PageHeader";
import HealthBanner from "@/components/HealthBanner";
import KpiGrid from "@/components/KpiGrid";
import CostPanel from "@/components/CostPanel";
import TeamGrid from "@/components/TeamGrid";
import FeedRail from "@/components/FeedRail";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader title="Mission Control" sub="La squadra SolarBack, in un colpo d’occhio." />
      <HealthBanner />
      <KpiGrid />
      <CostPanel />
      <div className="grid grid-cols-1 gap-8 2xl:grid-cols-[1fr_380px]">
        <TeamGrid />
        <FeedRail />
      </div>
    </div>
  );
}
