import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogListing } from "@/components/blog/BlogListing";
import { PageFrame } from "@/components/layout/PageFrame";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Essays and match notes from an unofficial MS Dhoni fan archive. Newest writing first.",
};

type BlogsPageProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

async function BlogListingSection({ searchParams }: BlogsPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

  return <BlogListing category={params.category} page={safePage} />;
}

export default function BlogsPage({ searchParams }: BlogsPageProps) {
  return (
    <PageFrame
      kicker="The writing"
      title="Blogs"
      summary="Match notes and longer reads, newest first. Category filters and pagination are wired for Phase 2 placeholders."
    >
      <Suspense
        fallback={
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3" aria-busy="true">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-[16/10] bg-cream/10" />
            ))}
          </div>
        }
      >
        <BlogListingSection searchParams={searchParams} />
      </Suspense>
    </PageFrame>
  );
}
