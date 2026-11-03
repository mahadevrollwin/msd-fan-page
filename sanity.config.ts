"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { assertSanityEnv, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { singletons } from "@/sanity/singletons";
import { structure } from "@/sanity/structure";

assertSanityEnv();

const singletonIds = new Set<string>(
  singletons.map((item) => item.documentId),
);

export default defineConfig({
  name: "msd-archive",
  title: "MSD Archive",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
  document: {
    singletons,
    actions: (prev, context) => {
      const documentId = context.documentId;
      if (!documentId || !singletonIds.has(documentId)) {
        return prev;
      }
      return prev.filter((action) => {
        const actionName = "action" in action ? action.action : undefined;
        return (
          actionName === "publish" ||
          actionName === "discardChanges" ||
          actionName === "restore"
        );
      });
    },
  },
});
