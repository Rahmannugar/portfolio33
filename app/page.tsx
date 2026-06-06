import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Profile from "@/components/sections/Profile";
import Skills from "@/components/sections/Skills";
import { getSkills } from "@/lib/services/skill";
import { getExperience } from "@/lib/services/experience";
import { getProjects } from "@/lib/services/project";
import Projects from "@/components/sections/Projects";

export const revalidate = 3600; // Revalidate every 1 hour

async function HomePage() {
  const skills = await getSkills();
  const experiences = await getExperience();
  const projects = await getProjects();

  return (
    <main>
      <Hero />
      <Profile />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
    </main>
  );
}

export default HomePage;
