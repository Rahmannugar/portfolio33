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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "previewImage",
      title: "Preview Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "currentlyWorking",
      title: "Currently Working On This Project?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      initialValue: false,
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
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
