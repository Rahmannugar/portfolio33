import { Skill } from "../types/skill";
import { skillQuery } from "../hooks/useSkill";
import { sanityFetch } from "@/sanity/lib/live";

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const { data: skills } = await sanityFetch({ query: skillQuery });
    // console.log("Fetched skills:", skills);
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};
