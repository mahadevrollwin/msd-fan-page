import type { Metadata } from "next";
import { AboutPreview } from "@/components/home/AboutPreview";
import { CareerHighlights } from "@/components/home/CareerHighlights";
import { FeaturedGallery } from "@/components/home/FeaturedGallery";
import { FeaturedMoments } from "@/components/home/FeaturedMoments";
import { FeaturedVideos } from "@/components/home/FeaturedVideos";
import { Hero } from "@/components/home/Hero";
import { LatestBlogs } from "@/components/home/LatestBlogs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { getHomeContent } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent();
  return buildPageMetadata({
    title: `${site.name} | Unofficial MS Dhoni Fan Page`,
    description: content.hero.description || site.description,
    path: "/",
    image: content.hero.image,
    absoluteTitle: true,
  });
}

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd data={websiteJsonLd()} />
      <Hero hero={content.hero} />
      <FeaturedMoments moments={content.moments} />
      <CareerHighlights highlights={content.highlights} />
      <LatestBlogs posts={content.featuredBlogs} />
      <FeaturedGallery images={content.featuredImages} />
      <FeaturedVideos videos={content.featuredVideos} />
      <AboutPreview aboutPreview={content.aboutPreview} />
    </main>
  );
}
