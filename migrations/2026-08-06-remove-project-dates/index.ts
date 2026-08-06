import { defineMigration, at, unset } from "sanity/migrate";

export default defineMigration({
  title: "Remove project dates",
  documentTypes: ["project"],
  migrate: {
    document() {
      return [
        at("startDate", unset()),
        at("endDate", unset()),
        at("currentlyWorking", unset()),
      ];
    },
  },
});
