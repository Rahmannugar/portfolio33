import { Experience } from "../types/experience";
import { sanityFetch } from "@/sanity/lib/live";
import { experienceQuery, singleExperienceQuery } from "../hooks/useExperience";

export const getExperience = async (): Promise<Experience[]> => {
  try {
    const { data: experiences } = await sanityFetch({
      query: experienceQuery,
    });
    // console.log("Fetched experiences:", experiences);
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
};

export const getExperienceById = async (
  id: string,
): Promise<Experience | null> => {
  if (!id) return null;
  try {
    const { data: experience } = await sanityFetch({
      query: singleExperienceQuery,
      params: { id },
    });
    // console.log("Fetched experience by ID:", experience);
    return experience;
  } catch (error) {
    console.error("Error fetching experience by ID:", error);
    return null;
  }
};
