import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string,
) =>
  S.listItem()
    .title(title)
    .id(documentId)
    .child(S.document().schemaType(schemaType).documentId(documentId).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("MSD Archive")
    .items([
      singleton(S, "Site settings", "siteSettings", "siteSettings"),
      singleton(S, "Home page", "homePage", "homePage"),
      singleton(S, "About page", "aboutPage", "aboutPage"),
      S.divider(),
      singleton(S, "Terms & Conditions", "legalPage", "terms-and-conditions"),
      singleton(S, "Privacy Policy", "legalPage", "privacy-policy"),
      S.divider(),
      S.documentTypeListItem("blog").title("Blogs"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("galleryImage").title("Gallery images"),
      S.documentTypeListItem("galleryVideo").title("Gallery videos"),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return ![
          "siteSettings",
          "homePage",
          "aboutPage",
          "legalPage",
          "blog",
          "category",
          "galleryImage",
          "galleryVideo",
          "portableText",
        ].includes(id ?? "");
      }),
    ]);
