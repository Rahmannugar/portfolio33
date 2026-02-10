import { defineField, defineType } from "sanity";

export const skillType = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "skill",
      title: "Skill name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
});
