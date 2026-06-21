import { Project } from "../types/project";
import { projectQuery, singleProjectQuery } from "../hooks/useProject";
import { sanityFetch } from "@/sanity/lib/live";

export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data: projects } = await sanityFetch({ query: projectQuery });
    // console.log("Fetched projects:", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  if (!id) return null;
  try {
    const { data: project } = await sanityFetch({
      query: singleProjectQuery,
      params: { id },
    });
    // console.log("Fetched project by ID:", project);
    return project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
};
