import Projects from "@/components/projects-page/Projects";
import { getProjects } from "@/lib/services/project";

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <main>
      <Projects projects={projects} />
    </main>
  );
};
export default ProjectsPage;
