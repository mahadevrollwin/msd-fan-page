import type { Metadata } from "next";
import { LegalBody } from "@/components/legal/LegalBody";
import { PageFrame } from "@/components/layout/PageFrame";
import { termsContent } from "@/data/legal";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: termsContent.title,
  description: termsContent.summary,
};

export default function TermsPage() {
  return (
    <PageFrame
      kicker="Legal"
      title={termsContent.title}
      summary={termsContent.summary}
    >
      <p className="mb-10 text-sm uppercase tracking-[0.18em] text-muted">
        Updated {formatDate(termsContent.updatedAt)}
      </p>
      <LegalBody blocks={termsContent.blocks} />
    </PageFrame>
  );
}
