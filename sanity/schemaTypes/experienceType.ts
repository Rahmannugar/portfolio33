import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "companyUrl",
      title: "Company Website",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "image",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "currentlyWorking",
      title: "Currently Working Here?",
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
            return "End Date is required if not currently working here";
          }
          if (currentlyWorking && endDate) {
            return "End Date should be empty if currently working here";
          }
          return true;
        }),
    }),
    defineField({
      name: "summary",
      title: "Summary",
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
  ],
});
