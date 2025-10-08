import { type SchemaTypeDefinition } from "sanity";
import { skillType } from "./skill";
import { experienceType } from "./experience";
import { projectType } from "./projectType";
import { blogType } from "./blogType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skillType, experienceType, projectType, blogType],
};
