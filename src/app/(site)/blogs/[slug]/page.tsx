import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogContent } from "@/components/blog/BlogContent";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { PortableTextBody } from "@/components/portable-text/PortableTextBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/format";
import { articleJsonLd, buildPageMetadata } from "@/lib/seo";
import {
  getBlogBySlug,
  getBlogSlugs,
  getRelatedBlogs,
} from "@/sanity/lib/fetch";

type BlogDetailsProps = PageProps<"/blogs/[slug]">;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    return { title: "Essay not found", robots: { index: false, follow: false } };
  }

  return buildPageMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blogs/${post.slug}`,
    image: post.featuredImage,
    type: "article",
    publishedTime: post.publishedAt,
  });
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
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogs(post.slug, post.category.id);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd
        data={articleJsonLd({
          title: post.seoTitle || post.title,
          description: post.seoDescription || post.excerpt,
          path: `/blogs/${post.slug}`,
          imageSrc: post.featuredImage.src,
          author: post.author,
          publishedAt: post.publishedAt,
          category: post.category.title,
        })}
      />
      <Container className="py-14 sm:py-20">
        <Link
          href="/blogs"
          className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.2em] text-gold"
        >
          Back to blogs
        </Link>
        <p className="mt-8 text-xs uppercase tracking-[0.28em] text-gold">
          <Link
            href={`/blogs?category=${post.category.slug}`}
            className="transition-colors hover:text-cream"
          >
            {post.category.title}
          </Link>
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
            {...(post.featuredImage.blurDataURL
              ? {
                  placeholder: "blur" as const,
                  blurDataURL: post.featuredImage.blurDataURL,
                }
              : {})}
          />
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article>
            {post.portableText?.length ? (
              <PortableTextBody value={post.portableText} />
            ) : (
              <BlogContent blocks={post.content} />
            )}
          </article>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <ShareLinks title={post.title} slug={post.slug} />
            <p className="text-sm leading-6 text-muted">
              Essays are edited in Sanity Studio and rendered here from Portable Text.
            </p>
          </aside>
        </div>
      </Container>

      {related.length > 0 ? (
        <section
          className="border-t border-gold/15 bg-charcoal/40 py-16 sm:py-20"
          aria-labelledby="related-essays-heading"
        >
          <Container>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Related essays</p>
            <h2
              id="related-essays-heading"
              className="mt-3 font-display text-5xl tracking-[0.04em] text-cream"
            >
              Keep reading
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
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
