"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const heading = "Skills";

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  return (
    <section ref={sectionRef} className="relative mt-40" id="skills">
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
    </section>
  );
};

export default Skills;
