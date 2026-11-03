import type { Metadata } from "next";
import { LegalBody } from "@/components/legal/LegalBody";
import { PageFrame } from "@/components/layout/PageFrame";
import { privacyContent } from "@/data/legal";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: privacyContent.title,
  description: privacyContent.summary,
};

export default function PrivacyPage() {
  return (
    <PageFrame
      kicker="Legal"
      title={privacyContent.title}
      summary={privacyContent.summary}
    >
      <p className="mb-10 text-sm uppercase tracking-[0.18em] text-muted">
        Updated {formatDate(privacyContent.updatedAt)}
      </p>
      <LegalBody blocks={privacyContent.blocks} />
    </PageFrame>
  );
}
