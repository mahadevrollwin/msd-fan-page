import { AboutPreview } from "@/components/home/AboutPreview";
import { CareerHighlights } from "@/components/home/CareerHighlights";
import { FeaturedGallery } from "@/components/home/FeaturedGallery";
import { FeaturedMoments } from "@/components/home/FeaturedMoments";
import { FeaturedVideos } from "@/components/home/FeaturedVideos";
import { Hero } from "@/components/home/Hero";
import { LatestBlogs } from "@/components/home/LatestBlogs";

export default function HomePage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <Hero />
      <FeaturedMoments />
      <CareerHighlights />
      <LatestBlogs />
      <FeaturedGallery />
      <FeaturedVideos />
      <AboutPreview />
    </main>
  );
}
