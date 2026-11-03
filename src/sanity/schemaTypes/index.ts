import type { SchemaTypeDefinition } from "sanity";
import { aboutPage } from "@/sanity/schemaTypes/aboutPage";
import { blog } from "@/sanity/schemaTypes/blog";
import { category } from "@/sanity/schemaTypes/category";
import { galleryImage } from "@/sanity/schemaTypes/galleryImage";
import { galleryVideo } from "@/sanity/schemaTypes/galleryVideo";
import { homePage } from "@/sanity/schemaTypes/homePage";
import { legalPage } from "@/sanity/schemaTypes/legalPage";
import { portableText } from "@/sanity/schemaTypes/objects/portableText";
import { siteSettings } from "@/sanity/schemaTypes/siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  aboutPage,
  legalPage,
  blog,
  category,
  galleryImage,
  galleryVideo,
  portableText,
];
