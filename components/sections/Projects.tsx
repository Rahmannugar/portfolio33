"use client";

import type { Project } from "@/lib/types/project";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
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
            className="block h-0.5 bg-white mt-1 ml-auto"
            style={{
              width: `calc(${heading.length / 2}ch)`,
            }}
          />
        </motion.h2>
      </div>

      <div className="relative mt-10 grid gap-8">
        {demoProjects.map((project, idx) => (
          <motion.article
            key={project._id}
            initial={{ x: idx % 2 === 0 ? -80 : 80, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.55,
              ease: "easeOut",
              delay: idx * 0.08,
            }}
            className="group grid cursor-pointer gap-6 rounded-lg border border-white/10 bg-white/5 p-6 text-white/85 shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-300 active:bg-white/10 active:shadow-lg active:shadow-purple-300 lg:grid-cols-[1fr_1.05fr] lg:items-stretch"
          >
            <div className="order-2 flex flex-col justify-between gap-8 lg:order-1">
              <div className="grid gap-4">
                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/75"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <FaCalendarDay />
                  <span>
                    {formatMonthYear(project.startDate)} –{" "}
                    {project.currentlyWorking
                      ? "Present"
                      : formatMonthYear(project.endDate)}
                  </span>
                </div>

                {project.description && (
                  <p className="max-w-xl text-sm leading-7 text-white/75 md:text-base">
                    {project.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/projects/${project._id}`}
                  prefetch={false}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 font-semibold text-white transition duration-200 hover:scale-[1.03] hover:bg-white/25 active:scale-[0.98]"
                >
                  <FaCode className="text-xs" />
                  View Details
                </Link>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-white/95 px-5 py-2.5 font-semibold text-black transition duration-200 hover:scale-[1.03] hover:bg-white active:scale-[0.98]"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Live Project
                </Link>
              </div>
            </div>

            <div className="order-1 relative min-h-64 overflow-hidden rounded-lg border border-white/10 bg-white/5 lg:order-2">
              <Image
                src={urlFor(project.previewImage).url()}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.article>
        ))}
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
