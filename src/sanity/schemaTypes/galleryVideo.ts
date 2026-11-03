import { icons } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const galleryVideo = defineType({
  name: "galleryVideo",
  title: "Gallery video",
  type: "document",
  icon: icons.play,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videoFile",
      title: "Uploaded video file",
      type: "file",
      options: {
        accept: "video/*",
      },
      description: "Provide either an uploaded file or an external video URL.",
    }),
    defineField({
      name: "videoUrl",
      title: "External video URL",
      type: "url",
      description: "Direct video file URL or streamable source.",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      if (!doc) return true;
      const hasFile = Boolean(doc.videoFile);
      const hasUrl = Boolean(doc.videoUrl);
      if (hasFile || hasUrl) return true;
      return "Add either an uploaded video file or an external video URL.";
    }),
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      subtitle: "category",
    },
  },
});
