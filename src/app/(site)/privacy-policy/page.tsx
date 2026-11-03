import type { Metadata } from "next";
import { LegalBody } from "@/components/legal/LegalBody";
import { PageFrame } from "@/components/layout/PageFrame";
import { PortableTextBody } from "@/components/portable-text/PortableTextBody";
import { formatDate } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo";
import { getLegalContent } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalContent("privacy-policy");
  return buildPageMetadata({
    title: content.title,
    description: content.summary,
    path: "/privacy-policy",
  });
}

export default async function PrivacyPage() {
  const content = await getLegalContent("privacy-policy");

  return (
    <PageFrame kicker="Legal" title={content.title} summary={content.summary}>
      <p className="mb-10 text-sm uppercase tracking-[0.18em] text-muted">
        Updated {formatDate(content.updatedAt)}
      </p>
      {content.portableText?.length ? (
        <PortableTextBody value={content.portableText} className="space-y-8" />
      ) : (
        <LegalBody blocks={content.blocks} />
      )}
    </PageFrame>
  );
}
