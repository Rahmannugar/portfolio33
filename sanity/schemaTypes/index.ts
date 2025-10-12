import { type SchemaTypeDefinition } from "sanity";
import { skillType } from "./skillType";
import { experienceType } from "./experienceType";
import { projectType } from "./projectType";
import { blogType } from "./blogType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skillType, experienceType, projectType, blogType],
};
