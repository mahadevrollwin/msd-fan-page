import { defineSingleton } from "sanity";

export const singletons = [
  defineSingleton({
    documentId: "siteSettings",
    schemaType: "siteSettings",
  }),
  defineSingleton({
    documentId: "homePage",
    schemaType: "homePage",
  }),
  defineSingleton({
    documentId: "aboutPage",
    schemaType: "aboutPage",
  }),
  defineSingleton({
    documentId: "terms-and-conditions",
    schemaType: "legalPage",
  }),
  defineSingleton({
    documentId: "privacy-policy",
    schemaType: "legalPage",
  }),
];
