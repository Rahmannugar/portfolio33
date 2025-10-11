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
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const h1InView = useInView(h1Ref, { once: true, margin: "-100px" });

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
        ref={h1Ref}
        className="text-5xl uppercase font-semibold"
        variants={containerVariants}
        initial="hidden"
        animate={h1InView ? "visible" : "hidden"}
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
            className={`
                      cursor-pointer
                      flex flex-col gap-5 h-full w-full
                      bg-[#1e1d1d]
                      rounded-lg
                      px-6 py-8
                      transition-all duration-300
                      hover:bg-[#232222]
                      active:bg-[#232222]
                    `}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-lg">{exp.position}</h2>
              <h2 className="">{exp.company}</h2>
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
              <h2>{exp.location}</h2>
              <h2>
                {formatMonthYear(exp.startDate)} -{" "}
                {formatMonthYear(exp.endDate)}
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

      <Pagination className="mt-12">
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
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => handlePageChange(i + 1)}
                href="#"
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
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};
export default Experiences;
