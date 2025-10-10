import Experiences from "@/components/experience-page/Experiences";
import { getExperience } from "@/lib/services/experience";

export const revalidate = 86400; // Revalidate every 24 hours
const experiences = await getExperience();

const ExperiencePage = () => {
  return (
    <main>
      <Experiences experiences={experiences} />
    </main>
  );
};
export default ExperiencePage;
