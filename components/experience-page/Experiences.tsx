"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import type { Experience } from "@/lib/types/experience";
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
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";

interface ExperienceProps {
  experiences: Experience[];
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

const headingText = "Experience";
const PER_PAGE = 3;

const Experiences = ({ experiences }: ExperienceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(experiences.length / PER_PAGE);

  const paginatedExperiences = experiences.slice(
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
      <div
        key={page}
        className="relative z-20 mt-12 grid gap-6 font-semibold"
      >
        {paginatedExperiences.map((exp, idx) => (
          <motion.article
            key={exp._id}
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.08 }}
            style={{ willChange: "opacity, transform" }}
            className="group grid cursor-pointer gap-6 rounded-lg border border-white/10 bg-white/5 p-6 text-white/85 shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-300 active:bg-white/10 active:shadow-lg active:shadow-purple-300 md:grid-cols-[5rem_1fr] lg:grid-cols-[5rem_minmax(0,1fr)_minmax(15rem,auto)_auto] lg:items-center"
          >
            <div>
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 1.08 }}
              >
                <Image
                  src={urlFor(exp.image).url()}
                  alt={exp.company}
                  width={100}
                  height={100}
                  className="max-h-16 max-w-16 object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </motion.div>
            </div>

            <div className="grid gap-4">
              <div>
                <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                  {exp.position}
                </h2>
                <h2 className="mt-1 text-lg text-white/70">{exp.company}</h2>
              </div>
              <div className="flex flex-col gap-2 text-sm text-white/60 sm:flex-row sm:items-center sm:gap-5">
                <h2 className="flex items-center gap-2">
                  <FaLocationDot />
                  <span>{exp.location}</span>
                </h2>
              </div>
            </div>

            <h2 className="flex items-center gap-2 text-sm text-white/55 lg:min-w-48 lg:justify-center lg:pt-2">
              <FaCalendarDays />
              <span>
                {formatMonthYear(exp.startDate)} –{" "}
                {exp.currentlyWorking || !exp.endDate
                  ? "Present"
                  : formatMonthYear(exp.endDate)}
              </span>
            </h2>

            <Link
              href={`/experience/${exp._id}`}
              className="flex justify-start lg:justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-white/25 sm:w-auto"
              >
                <FaBriefcase className="text-xs" />
                View Work Details
              </motion.button>
            </Link>
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
export default Experiences;
