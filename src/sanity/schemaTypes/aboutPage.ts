import { icons } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: icons.users,
  groups: [
    { name: "intro", title: "Intro", default: true },
    { name: "journey", title: "Journey" },
    { name: "legacy", title: "Legacy" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "intro",
      fields: [
        defineField({ name: "kicker", type: "string" }),
        defineField({
          name: "title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "summary",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "fanPage",
      title: "About the fan page",
      type: "object",
      group: "intro",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({
          name: "body",
          type: "portableText",
        }),
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
      ],
    }),
    defineField({
      name: "journey",
      title: "Cricket journey",
      type: "object",
      group: "journey",
      fields: [
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
          name: "beats",
          title: "Story beats",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "beat",
              fields: [
                defineField({ name: "title", type: "string" }),
                defineField({ name: "text", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "milestones",
      title: "Career milestones",
      type: "array",
      group: "journey",
      of: [
        defineArrayMember({
          type: "object",
          name: "milestone",
          fields: [
            defineField({ name: "year", type: "string" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "summary", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        }),
      ],
    }),
    defineField({
      name: "legacy",
      title: "Achievements and legacy",
      type: "object",
      group: "legacy",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "summary", type: "text", rows: 4 }),
        defineField({
          name: "points",
          title: "Legacy points",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
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
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});
