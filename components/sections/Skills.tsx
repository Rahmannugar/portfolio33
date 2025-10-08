"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DomeGallery from "../custom-ui/skills-dome";

const heading = "Skills & Technologies";

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative mt-40 h-[4000px]" id="skills">
      <div className="flex justify-end w-full px-7 md:px-12">
        <motion.h2
          className="text-4xl font-bold uppercase inline-block text-right ml-auto"
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

      <div className="relative w-full mt-20">
        <div className="absolute left-1/2 -translate-x-1/2 w-screen">
          <div style={{ height: "100vh", width: "100vw" }}>
            <DomeGallery />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
