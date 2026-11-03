import { icons } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: icons.home,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "moments", title: "Moments" },
    { name: "highlights", title: "Highlights" },
    { name: "featured", title: "Featured content" },
    { name: "about", title: "About preview" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "kicker", type: "string", title: "Kicker" }),
        defineField({
          name: "brand",
          type: "string",
          title: "Brand line",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "heading",
          type: "string",
          title: "Heading",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          type: "text",
          title: "Description",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "image",
          type: "image",
          title: "Background image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "Href" }),
          ],
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "Href" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featuredMoments",
      title: "Featured moments",
      type: "array",
      group: "moments",
      of: [
        defineArrayMember({
          type: "object",
          name: "moment",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "year", type: "string", title: "Year / label" }),
            defineField({ name: "summary", type: "text", rows: 3 }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Alt text",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "year", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "careerHighlights",
      title: "Career highlights",
      type: "array",
      group: "highlights",
      of: [
        defineArrayMember({
          type: "object",
          name: "highlight",
          fields: [
            defineField({ name: "year", type: "string", title: "Year" }),
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "summary", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        }),
      ],
    }),
    defineField({
      name: "featuredBlogs",
      title: "Featured blogs",
      type: "array",
      group: "featured",
      of: [defineArrayMember({ type: "reference", to: [{ type: "blog" }] })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "featuredGalleryImages",
      title: "Featured gallery images",
      type: "array",
      group: "featured",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "galleryImage" }],
        }),
      ],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "featuredVideos",
      title: "Featured videos",
      type: "array",
      group: "featured",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "galleryVideo" }],
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "aboutPreview",
      title: "About preview",
      type: "object",
      group: "about",
      fields: [
        defineField({ name: "kicker", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "summary", type: "text", rows: 4 }),
        defineField({
          name: "image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
            }),
          ],
        }),
        defineField({
          name: "cta",
          title: "CTA",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
