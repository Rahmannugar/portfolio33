import { Experience } from "../types/experience";
import { client } from "@/sanity/lib/client";
import { experienceQuery, singleExperienceQuery } from "../hooks/useExperience";

export const getExperience = async (): Promise<Experience[]> => {
  try {
    return await client.fetch<Experience[]>(
      experienceQuery,
      {},
      { cache: "no-store" },
    );
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
    const experience = await client.fetch<Experience | null>(
      singleExperienceQuery,
      { id },
      { cache: "no-store" },
    );
    return experience;
  } catch (error) {
    console.error("Error fetching experience by ID:", error);
    return null;
  }
};
