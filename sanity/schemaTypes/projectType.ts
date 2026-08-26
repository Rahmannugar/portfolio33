import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Display order",
      description: "Required position for this project. Lower numbers appear first.",
      type: "number",
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(1)
          .custom(async (value, context) => {
            if (typeof value !== "number") return true;

            const client = context.getClient({ apiVersion: "2025-10-06" });
            const documentId = context.document?._id;
            const baseDocumentId = documentId?.replace(/^drafts\./, "");
            const currentDocumentIds = baseDocumentId
              ? [baseDocumentId, `drafts.${baseDocumentId}`]
              : [];
            const duplicateCount = await client.fetch<number>(
              `count(*[_type == "project" && order == $order && !(_id in $currentDocumentIds)])`,
              {
                order: value,
                currentDocumentIds,
              }
            );

            return duplicateCount === 0 || "Each project must have a unique display order.";
          }),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "previewImage",
      title: "Preview Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
