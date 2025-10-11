import { getProjectById } from "@/lib/services/project";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: `Details about ${project.title}`,
  };
}

const SingleProjectPage = async ({ params }: { params: { id: string } }) => {
  const project = await getProjectById(params.id);
  if (!project) return notFound();

  return <main></main>;
};

export default SingleProjectPage;
