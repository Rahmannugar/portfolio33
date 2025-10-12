"use client";

import type { Project } from "@/lib/types/project";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollStack, { ScrollStackItem } from "../custom-ui/scroll-stack";
import Image from "next/image";
import { urlFor } from "@/lib/services/sanity";
import { FaCalendarDay, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { formatMonthYear } from "@/lib/utils/dateFormatter";
import Link from "next/link";
const heading = "Projects";
interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-100px" });

  const demoProjects = projects.slice(0, 5);

  return (
    <section className="relative mt-40" id="projects" ref={sectionRef}>
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
            className="block h-0.5 bg-black mt-1 ml-auto"
            style={{
              width: `calc(${heading.length / 2}ch)`,
            }}
          />
        </motion.h2>
      </div>

      <div className="relative mt-10">
        <ScrollStack>
          {demoProjects.map((project, idx) => (
            <ScrollStackItem key={project._id}>
              <motion.article
                key={project._id}
                initial={{ y: 40, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: idx * 0.08,
                }}
                style={{ willChange: "opacity, transform" }}
                className={`
                              flex flex-col gap-5 h-full w-full
                              bg-[#1e1d1d]
                              text-white/85
                              rounded-lg
                              px-6 py-8
                              transition-all duration-300
                              hover:bg-[#232222]
                              hover:shadow-lg active:shadow-lg hover:shadow-purple-300 active:shadow-purple-300
                              group
                            `}
              >
                <div className="flex flex-col gap-2 items-start">
                  <h2 className="text-xl font-bold text-white">
                    {project.title}
                  </h2>
                  <div className="flex gap-2">
                    {project.languages &&
                      project.languages.slice(0, 3).map((lang, i) => (
                        <span
                          key={i}
                          className="text-xs py-1 px-2 bg-white/10 rounded-full backdrop-blur-sm"
                        >
                          {lang}
                        </span>
                      ))}
                  </div>
                </div>

                <motion.div
                  className="relative w-full h-48 overflow-hidden rounded-lg border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={urlFor(project.previewImage).url()}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <div className="flex items-center gap-2 text-sm text-white/70">
                  <FaCalendarDay />
                  <span>
                    {formatMonthYear(project.startDate)} –{" "}
                    {project.currentlyWorking
                      ? "Present"
                      : formatMonthYear(project.endDate)}
                  </span>
                </div>

                {project.description && (
                  <p className="text-sm line-clamp-3 text-white/80">
                    {project.description}
                  </p>
                )}

                <div className="mt-auto flex flex-col gap-3">
                  <Link href={`/projects/${project._id}`} className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full cursor-pointer bg-white/10 border border-white/20 py-2.5 px-5 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                    >
                      <FaCode className="text-xs" />
                      View Details
                    </motion.button>
                  </Link>

                  <Link
                    href={project.link}
                    className="w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full cursor-pointer bg-white py-2.5 px-5 rounded-lg font-semibold text-black flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Live Project
                    </motion.button>
                  </Link>
                </div>
              </motion.article>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      <div className="flex justify-center mt-16 relative z-20">
        <Link href="/projects">
          <button className="bg-purple-400 hover:bg-purple-300 active:bg-purple-300 duration-300 ease-in-out text-black py-3 font-semibold px-6 cursor-pointer rounded-full">
            View All Projects
          </button>
        </Link>
      </div>
    </section>
  );
};
export default Projects;
