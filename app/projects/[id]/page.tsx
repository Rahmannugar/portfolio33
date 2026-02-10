import SingleProject from "@/components/projects-page/SingleProject";
import { getProjectById } from "@/lib/services/project";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: `Details about ${project.title}`,
  };
}

const SingleProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return notFound();

  return (
    <main>
      <SingleProject project={project} />
    </main>
  );
};

export default SingleProjectPage;
