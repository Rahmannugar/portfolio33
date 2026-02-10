import { defineMigration, at, set, unset } from "sanity/migrate";

/**
 * Migration: Rename 'languages' field to 'technologies' in project documents.
 */
export default defineMigration({
  title: "Rename languages to technologies",
  documentTypes: ["project"],

  migrate: {
    document(doc, context) {
      // Only migrate if 'languages' exists and 'technologies' doesn't
      if (doc.languages && !doc.technologies) {
        return [
          at("technologies", set(doc.languages)),
          at("languages", unset()),
        ];
      }
      return [];
    },
  },
});
