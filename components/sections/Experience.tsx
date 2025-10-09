"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassSurface from "../custom-ui/glass-pill";

const heading = "Experience";

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative mt-40" ref={sectionRef} id="experience">
      <motion.h2
        className="text-4xl font-bold uppercase inline-block"
        initial={{ x: -60, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {heading}
        <span
          aria-hidden
          className="block h-0.5 bg-white mt-1"
          style={{
            width: `calc(${heading.length / 2}ch)`,
          }}
        />
      </motion.h2>
      <GlassSurface>
        <h2>Glass Surface Content</h2>
      </GlassSurface>
      <div className="flex flex-col items-start justify-between lg:justify-center gap-8 md:flex-row mt-10">
        <motion.article
          className="cursor-pointer
            flex flex-col gap-6 md:text-sm lg:text-lg font-semibold
            bg-white/30 border border-white/20
            rounded-2xl
            px-6 py-8 md:px-10 md:py-10
            backdrop-blur-[5px]
            w-full
            transition-all duration-300
            hover:bg-white/20
            active:bg-white/20
            text-white
            select-none
          "
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        ></motion.article>
      </div>
    </section>
  );
};
export default Experience;
