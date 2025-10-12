"use client";

import { Project } from "@/lib/types/project";

interface SingleProjectProps {
  project: Project;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return <div>{project.title}</div>;
};
export default SingleProject;
