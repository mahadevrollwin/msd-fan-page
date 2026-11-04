import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  caption,
  hotspot,
  crop
`;

const categoryFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  description
`;

const blogCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  author,
  publishedAt,
  seoTitle,
  seoDescription,
  category->{
    ${categoryFields}
  },
  featuredImage{
    ${imageFields}
  }
`;

const galleryImageFields = /* groq */ `
  _id,
  title,
  description,
  category,
  altText,
  publishedAt,
  image{
    ${imageFields}
  }
`;

const galleryVideoFields = /* groq */ `
  _id,
  title,
  description,
  category,
  publishedAt,
  videoUrl,
  thumbnail{
    ${imageFields}
  },
  videoFile{
    asset->{
      url
    }
  }
`;

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    siteName,
    tagline,
    jerseyNumber,
    disclaimer,
    footerText,
    logo{
      ${imageFields}
    },
    navigation[]{
      label,
      href,
      note
    },
    socialLinks[]{
      label,
      href,
      hint
    }
  }
`);

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "homePage"][0]{
    hero{
      kicker,
      brand,
      heading,
      description,
      primaryCta{ label, href },
      secondaryCta{ label, href },
      image{
        ${imageFields}
      }
    },
    featuredMoments[]{
      title,
      year,
      summary,
      image{
        ${imageFields}
      }
    },
    careerHighlights[]{
      year,
      title,
      summary
    },
    featuredBlogs[]->{
      ${blogCardFields}
    },
    featuredGalleryImages[]->{
      ${galleryImageFields}
    },
    featuredVideos[]->{
      ${galleryVideoFields}
    },
    aboutPreview{
      kicker,
      title,
      summary,
      cta{ label, href },
      image{
        ${imageFields}
      }
    }
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "aboutPage"][0]{
    hero{
      kicker,
      title,
      summary
    },
    fanPage{
      title,
      body,
      image{
        ${imageFields}
      }
    },
    journey{
      title,
      summary,
      beats[]{ title, text },
      image{
        ${imageFields}
      }
    },
    milestones[]{
      year,
      title,
      summary
    },
    legacy{
      title,
      summary,
      points,
      image{
        ${imageFields}
      }
    }
  }
`);

export const LEGAL_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "legalPage" && pageKey == $pageKey][0]{
    title,
    pageKey,
    summary,
    updatedAt,
    content
  }
`);

export const CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "category"] | order(title asc){
    ${categoryFields},
    "count": count(*[_type == "blog" && references(^._id)])
  }
`);

export const BLOGS_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && defined(slug.current) && (!defined($category) || category->slug.current == $category)]
    | order(publishedAt desc)[$start...$end]{
      ${blogCardFields}
    }
`);

export const BLOGS_COUNT_QUERY = defineQuery(/* groq */ `
  count(*[_type == "blog" && defined(slug.current) && (!defined($category) || category->slug.current == $category)])
`);

export const BLOG_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && slug.current == $slug][0]{
    ${blogCardFields},
    content[]{
      ...,
      _type == "image" => {
        ...,
        ${imageFields}
      }
    }
  }
`);

export const BLOG_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && defined(slug.current)].slug.current
`);

export const BLOG_SITEMAP_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && defined(slug.current)] | order(publishedAt desc){
    "slug": slug.current,
    publishedAt
  }
`);

export const RELATED_BLOGS_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && defined(slug.current) && slug.current != $slug]
    | order(select(category._ref == $categoryId => 0, 1) asc, publishedAt desc)[0...$limit]{
      ${blogCardFields}
    }
`);

export const GALLERY_IMAGES_QUERY = defineQuery(/* groq */ `
  *[_type == "galleryImage"] | order(publishedAt desc){
    ${galleryImageFields}
  }
`);

export const GALLERY_VIDEOS_QUERY = defineQuery(/* groq */ `
  *[_type == "galleryVideo"] | order(publishedAt desc){
    ${galleryVideoFields}
  }
`);

/** Latest CMS items for the home page feed sections (always sync to newest). */
export const HOME_LATEST_BLOGS_QUERY = defineQuery(/* groq */ `
  *[_type == "blog" && defined(slug.current)]
    | order(publishedAt desc)[0...3]{
      ${blogCardFields}
    }
`);

/** Prefer the curated “MSD The IPL GOD” still; fall back to newest gallery image. */
export const HOME_LATEST_IMAGES_QUERY = defineQuery(/* groq */ `
  *[
    _type == "galleryImage" &&
    _id == coalesce(
      *[_type == "galleryImage" && title == "MSD The IPL GOD"][0]._id,
      *[_type == "galleryImage"] | order(publishedAt desc)[0]._id
    )
  ][0...1]{
    ${galleryImageFields}
  }
`);

export const HOME_LATEST_VIDEOS_QUERY = defineQuery(/* groq */ `
  *[_type == "galleryVideo"] | order(publishedAt desc)[0...3]{
    ${galleryVideoFields}
  }
`);
