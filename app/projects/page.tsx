import Projects from "@/components/projects-page/Projects";
import { getProjects } from "@/lib/services/project";

export const revalidate = 86400; // Revalidate every 24 hours
const projects = await getProjects();

const ProjectsPage = () => {
  return (
    <main>
      <Projects projects={projects} />
    </main>
  );
};
export default ProjectsPage;
