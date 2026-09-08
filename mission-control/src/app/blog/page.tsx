"use client";
import PageHeader from "@/components/PageHeader";
import ApprovalList from "@/components/ApprovalList";
import { useData } from "@/lib/store";
import { Badge, SectionTitle } from "@/components/ui";

export default function Page() {
  const { data } = useData();
  const items = data.approvals.filter((a) => a.kind === "blog");
  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader title="Blog" sub="Articoli SEO per installatori fotovoltaici. Bozze qui, pubblicazione sul sito quando c’è solarback.it." />
      <div className="mb-6"><Badge tone="warn">In pausa: non prioritario. Si attiva dopo gli altri ruoli.</Badge></div>
      <SectionTitle title="Articoli" right={`${items.length}`} />
      <ApprovalList items={items} />
    </div>
  );
}
