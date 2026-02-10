import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
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
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "currentlyWorking",
      title: "Currently Working On This Project?",
      type: "boolean",
      validation: (rule) => rule.required(),
      initialValue: false,
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const currentlyWorking = (context.parent as any)?.currentlyWorking;
          if (!currentlyWorking && !endDate) {
            return "End Date is required if not currently working on this project";
          }
          if (currentlyWorking && endDate) {
            return "End Date should be empty if currently working on this project";
          }
          return true;
        }),
    }),
  ],
});
