import SingleExperience from "@/components/experience-page/SingleExperience";
import { getExperienceById } from "@/lib/services/experience";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await getExperienceById(id);
  if (!experience) return { title: "Experience" };
  return {
    title: experience.company,
    description: `My experience at ${experience.company}`,
  };
}

const SingleExperiencePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const experience = await getExperienceById(id);
  if (!experience) return notFound();

  return (
    <main>
      <SingleExperience experience={experience} />
    </main>
  );
};

export default SingleExperiencePage;
