"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
const PER_PAGE = 6;

const Projects = ({ projects }: ProjectsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(projects.length / PER_PAGE);

  const paginatedProjects = projects.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
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

      <div
        key={page}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 font-semibold relative z-20"
      >
        {paginatedProjects.map((project, idx) => (
          <motion.article
            key={project._id}
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.08 }}
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
              <h2 className="text-xl font-bold text-white">{project.title}</h2>
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
              <Link href={`/project/${project._id}`} className="w-full">
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
                className="!bg-transparent cursor-pointer !text-white hover:!bg-[#232222] transition"
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  href="#"
                  className={`!bg-transparent !text-white hover:!bg-[#232222] transition ${
                    page === i + 1
                      ? "!border-white !text-white !bg-[#232222]"
                      : ""
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
                className="!bg-transparent cursor-pointer !text-white hover:!bg-[#232222] transition"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};
export default Projects;
