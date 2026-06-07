"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import type { Project } from "@/lib/types/project";
import Image from "next/image";
import { urlFor } from "@/lib/services/sanity";
import Link from "next/link";
import { formatMonthYear } from "@/lib/utils/dateFormatter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { FaCalendarDay, FaCode, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectsProps {
  projects: Project[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const letterVariants = {
  hidden: { y: 0, scale: 1, opacity: 0 },
  visible: {
    y: [-10, 0],
    scale: [1.2, 1],
    opacity: 1,
    transition: {
      y: { type: "spring", stiffness: 500, damping: 20 },
      scale: { type: "spring", stiffness: 500, damping: 20 },
      opacity: { duration: 0.15 },
      duration: 0.4,
    },
  },
};

const headingText = "Projects";
const PER_PAGE = 5;

const Projects = ({ projects }: ProjectsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(projects.length / PER_PAGE);

  const paginatedProjects = projects.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <section ref={sectionRef}>
      <motion.h1
        className="text-5xl uppercase font-semibold"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {headingText.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            className="inline-block"
            style={{
              display: char === " " ? "inline-block" : undefined,
              minWidth: char === " " ? "0.5em" : undefined,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>

      <div key={page} className="relative z-20 mt-12 grid gap-8">
        {paginatedProjects.map((project, idx) => (
          <motion.article
            key={project._id}
            initial={{ x: idx % 2 === 0 ? -80 : 80, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.08 }}
            style={{ willChange: "opacity, transform" }}
            className="group grid cursor-pointer gap-6 rounded-lg border border-white/10 bg-white/5 p-6 text-white/85 shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-300 active:bg-white/10 active:shadow-lg active:shadow-purple-300 lg:grid-cols-[1fr_1.05fr] lg:items-stretch"
          >
            <div className="order-2 flex flex-col justify-between gap-8 lg:order-1">
              <div className="grid gap-4">
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  {project.title}
                </h2>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="mt-12 bg-[#181818]/80 border border-[#232222] rounded-xl shadow-lg px-4 py-2 w-fit mx-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                aria-disabled={page === 1}
                tabIndex={page === 1 ? -1 : 0}
                style={{
                  pointerEvents: page === 1 ? "none" : undefined,
                  opacity: page === 1 ? 0.5 : 1,
                }}
                className="bg-transparent cursor-pointer text-white hover:bg-[#232222] transition"
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  href="#"
                  className={`bg-transparent text-white hover:bg-[#232222] transition ${
                    page === i + 1 ? "border-white text-white bg-[#232222]" : ""
                  }`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                aria-disabled={page === totalPages}
                tabIndex={page === totalPages ? -1 : 0}
                style={{
                  pointerEvents: page === totalPages ? "none" : undefined,
                  opacity: page === totalPages ? 0.5 : 1,
                }}
                className="bg-transparent cursor-pointer text-white hover:bg-[#232222] transition"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};
export default Projects;
