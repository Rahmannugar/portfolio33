"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Experience } from "@/lib/types/experience";
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
const PER_PAGE = 6;

const Experiences = ({ experiences }: ExperienceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  const articleRefs = useRef(
    Array.from({ length: experiences.length }, () =>
      useRef<HTMLDivElement>(null)
    )
  );

  const articleInViews = articleRefs.current.map((ref) => useInView(ref));

  // Pagination state
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(experiences.length / PER_PAGE);

  const paginatedExperiences = experiences.slice(
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
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 font-semibold relative z-20">
        {paginatedExperiences.map((exp, idx) => (
          <motion.article
            key={exp._id}
            ref={articleRefs.current[idx]}
            initial={{ y: 40, opacity: 0 }}
            animate={articleInViews[idx] ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ willChange: "opacity, transform" }}
            className={`
                  cursor-pointer
                  flex flex-col gap-5 h-full w-full
                  bg-[#1e1d1d]
                  text-[#cccbcb]
                  rounded-lg
                  px-6 py-8
                  transition-all duration-300
                  hover:bg-[#232222]
                  active:bg-[#232222]  
                `}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-lg">{exp.position}</h2>
              <h2 className="text-lg">{exp.company}</h2>
            </div>
            <motion.div
              className="flex justify-center w-full items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
            >
              <Image
                src={urlFor(exp.image).url()}
                alt={exp.company}
                width={100}
                height={100}
              />
            </motion.div>
            <div className="flex flex-col gap-2">
              <h2 className="flex items-center gap-1">
                <FaLocationDot />
                <span>{exp.location}</span>
              </h2>
              <h2 className="flex items-center gap-1">
                <FaCalendarDays />
                <span>
                  {formatMonthYear(exp.startDate)} –{" "}
                  {exp.currentlyWorking && !exp.endDate
                    ? "Present"
                    : formatMonthYear(exp.endDate)}
                </span>
              </h2>
            </div>
            <Link
              href={`/experience/${exp._id}`}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                className="cursor-pointer bg-white py-2 px-5 rounded-full font-semibold text-black"
              >
                View Work Details
              </motion.button>
            </Link>
          </motion.article>
        ))}
      </div>
      {/* Pagination Controls */}

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
              className="!bg-transparent !text-white hover:!bg-[#232222] transition"
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
              className="!bg-transparent !text-white hover:!bg-[#232222] transition"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};
export default Experiences;
