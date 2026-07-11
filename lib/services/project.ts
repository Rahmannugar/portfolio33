import { Project } from "../types/project";
import { projectQuery, singleProjectQuery } from "../hooks/useProject";
import { client } from "@/sanity/lib/client";

export const getProjects = async (): Promise<Project[]> => {
  try {
    return await client.fetch<Project[]>(
      projectQuery,
      {},
      { cache: "no-store" },
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  if (!id) return null;
  try {
    const project = await client.fetch<Project | null>(
      singleProjectQuery,
      { id },
      { cache: "no-store" },
    );
    return project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
};
