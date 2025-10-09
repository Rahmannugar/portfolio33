import { Experience } from "../types/experience";
import { client } from "./sanity";
import { experienceQuery, singleExperienceQuery } from "../hooks/useExperience";

export const getExperience = async (): Promise<Experience[]> => {
  try {
    const experiences = await client.fetch<Experience[]>(experienceQuery);
    // console.log("Fetched experiences:", experiences);
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
};

export const getExperienceById = async (
  id: string
): Promise<Experience | null> => {
  try {
    const experience = await client.fetch<Experience | null>(
      singleExperienceQuery,
      { id }
    );
    // console.log("Fetched experience by ID:", experience);
    return experience;
  } catch (error) {
    console.error("Error fetching experience by ID:", error);
    return null;
  }
};
