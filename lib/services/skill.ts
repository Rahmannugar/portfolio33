import { Skill } from "../types/skill";
import { skillQuery } from "../hooks/useSkill";
import { client } from "./sanity";

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const skills = await client.fetch<Skill[]>(skillQuery);
    // console.log("Fetched skills:", skills);
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};
