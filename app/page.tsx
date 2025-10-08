import Hero from "@/components/sections/Hero";
import Profile from "@/components/sections/Profile";
import Skills from "@/components/sections/Skills";
import { getSkills } from "@/lib/services/skill";

export const revalidate = 86400; // Revalidate every 24 hours

async function Home() {
  const skills = await getSkills();

  return (
    <main>
      <Hero />
      <Profile />
      <Skills skills={skills} />
    </main>
  );
}

export default Home;
