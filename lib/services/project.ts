import { Project } from "../types/project";
import { client } from "./sanity";
import { projectQuery, singleProjectQuery } from "../hooks/useProject";

export const getProjects = async (): Promise<Project[]> => {
  try {
    const projects = await client.fetch<Project[]>(projectQuery);
    // console.log("Fetched projects:", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const project = await client.fetch<Project | null>(singleProjectQuery, {
      id,
    });
    // console.log("Fetched project by ID:", project);
    return project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
};
