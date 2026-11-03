import type { Metadata } from "next";
import { PageFrame } from "@/components/layout/PageFrame";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Image and video gallery for an unofficial MS Dhoni fan page. Media will be published from the CMS.",
};

export default function GalleryPage() {
  return (
    <PageFrame
      kicker="The frames"
      title="Gallery"
      summary="Photographs and video will share this page, with a lightbox for stills and a player for film, once the media library is connected."
    />
  );
}
