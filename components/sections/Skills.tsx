"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DomeGallery from "../custom-ui/skills-dome";
import type { Skill } from "@/lib/types/skill";

const heading = "Skills & Technologies";

interface SkillsProps {
  skills: Skill[];
}

const Skills = ({ skills }: SkillsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const skillImages = skills.map((skill) => ({
    src: skill.imageUrl,
    alt: skill.skill,
  }));

  return (
    <section ref={sectionRef} className="relative mt-40 min-h-screen" id="skills">
      <div className="flex justify-end w-full">
        <motion.h2
          className="text-4xl font-bold uppercase text-right"
          initial={{ x: "100vw", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {heading}
          <span
            aria-hidden
            className="block h-0.5 bg-white mt-1 ml-auto"
            style={{
              width: `calc(${heading.length / 2}ch)`,
            }}
          />
        </motion.h2>
      </div>

      <div className="relative w-full">
        <div className="absolute left-1/2 -translate-x-1/2 w-screen">
          <div style={{ height: "100vh", width: "100vw" }}>
            <DomeGallery images={skillImages} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
