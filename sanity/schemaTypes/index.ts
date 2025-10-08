import { type SchemaTypeDefinition } from "sanity";
import { skillType } from "./skill";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skillType],
};
