import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/services/project";
import { getExperience } from "@/lib/services/experience";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const experiences = await getExperience();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://rahmannugar.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: "https://rahmannugar.vercel.app/blog",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: "https://rahmannugar.vercel.app/projects",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://rahmannugar.vercel.app/experience",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  const projectRoutes = projects.map((project) => ({
    url: `https://rahmannugar.vercel.app/projects/${project._id}`,
    lastModified: new Date(
      project._updatedAt || project._createdAt || new Date()
    ),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const experienceRoutes = experiences.map((exp) => ({
    url: `https://rahmannugar.vercel.app/experience/${exp._id}`,
    lastModified: new Date(exp._updatedAt || exp._createdAt || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...experienceRoutes];
}
