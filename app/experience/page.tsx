import Experiences from "@/components/experience-page/Experiences";
import { getExperience } from "@/lib/services/experience";

export const revalidate = 3600; // Revalidate every 1 hour
const ExperiencePage = async () => {
  const experiences = await getExperience();

  return (
    <main>
      <Experiences experiences={experiences} />
    </main>
  );
};
export default ExperiencePage;
