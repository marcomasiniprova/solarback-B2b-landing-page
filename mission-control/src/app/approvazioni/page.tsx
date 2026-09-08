"use client";
import PageHeader from "@/components/PageHeader";
import ApprovalList from "@/components/ApprovalList";
import { useData } from "@/lib/store";
import { SectionTitle } from "@/components/ui";

export default function Page() {
  const { data } = useData();
  const pending = data.approvals.filter((a) => a.status === "pending");
  const done = data.approvals.filter((a) => a.status !== "pending").slice(0, 30);
  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader title="Approvazioni" sub="Il cancello: nulla esce verso l’esterno senza il tuo OK." />
      <SectionTitle title="In attesa" right={`${pending.length} bozze`} />
      <ApprovalList items={pending} />
      <div className="mt-10">
        <SectionTitle title="Decise di recente" right={`${done.length}`} />
        <ApprovalList items={done} showActions={false} />
      </div>
    </div>
  );
}
