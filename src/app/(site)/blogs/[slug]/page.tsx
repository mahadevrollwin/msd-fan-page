import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogContent } from "@/components/blog/BlogContent";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { Container } from "@/components/ui/Container";
import { blogs, getBlogBySlug, getRelatedBlogs } from "@/data/blogs";
import { formatDate } from "@/lib/format";

type BlogDetailsProps = PageProps<"/blogs/[slug]">;

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) {
    return { title: "Essay not found" };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.featuredImage.src, alt: post.featuredImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.featuredImage.src],
    },
  };
}

function BlogDetailsFallback() {
  return (
    <main id="main" className="flex flex-1 flex-col" aria-busy="true">
      <Container className="py-14 sm:py-20">
        <div className="h-4 w-28 bg-gold/25" />
        <div className="mt-8 h-16 max-w-3xl bg-cream/10" />
        <div className="mt-10 aspect-[16/9] bg-cream/10" />
      </Container>
    </main>
  );
}

async function BlogDetailsContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogs(post.slug);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <Container className="py-14 sm:py-20">
        <Link
          href="/blogs"
          className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-gold"
        >
          Back to blogs
        </Link>
        <p className="mt-8 text-xs uppercase tracking-[0.28em] text-gold">
          {post.category.title}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.92] tracking-[0.03em] text-cream sm:text-7xl">
          {post.title}
        </h1>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-mist">
          <span>{post.author}</span>
          <span aria-hidden="true" className="text-gold/50">
            /
          </span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-ink">
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <BlogContent blocks={post.content} />
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <ShareLinks title={post.title} slug={post.slug} />
            <p className="text-sm leading-6 text-muted">
              Placeholder essay content for Phase 2. Portable Text from Sanity replaces this body later.
            </p>
          </aside>
        </div>
      </Container>

      <section className="border-t border-gold/15 bg-charcoal/40 py-16 sm:py-20">
        <Container>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Related essays</p>
          <h2 className="mt-3 font-display text-5xl tracking-[0.04em] text-cream">
            Keep reading
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <BlogCard key={item.id} post={item} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

export default function BlogDetailsPage({ params }: BlogDetailsProps) {
  return (
    <Suspense fallback={<BlogDetailsFallback />}>
      <BlogDetailsContent params={params} />
    </Suspense>
  );
}
