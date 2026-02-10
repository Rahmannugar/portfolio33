import Projects from "@/components/projects-page/Projects";
import { getProjects } from "@/lib/services/project";

export const revalidate = 3600; // Revalidate every 1 hour
const projects = await getProjects();

const ProjectsPage = () => {
  return (
    <main>
      <Projects projects={projects} />
    </main>
  );
};
export default ProjectsPage;
