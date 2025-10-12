"use client";

import type { Project } from "@/lib/types/project";

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  return <div>Projects</div>;
};
export default Projects;
