import { Skill } from "../types/skill";
import { skillQuery } from "../hooks/useSkill";
import { client } from "@/sanity/lib/client";

export const getSkills = async (): Promise<Skill[]> => {
  try {
    return await client.fetch<Skill[]>(skillQuery, {}, { cache: "no-store" });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};
