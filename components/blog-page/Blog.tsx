"use client";
import type { Blog } from "@/lib/types/blog";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { formatFullDate } from "@/lib/utils/dateFormatter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import Link from "next/link";
import { FaCalendarDays, FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { urlFor } from "@/lib/services/sanity";

interface BlogArticlesProps {
  blogArticles: Blog[];
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

const headingText = "Blog";
const PER_PAGE = 5;
const MAX_SUMMARY_LENGTH = 190;
const MAX_TITLE_LENGTH = 80;

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

const Blog = ({ blogArticles }: BlogArticlesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(blogArticles.length / PER_PAGE);

  const paginatedBlogArticles = blogArticles.slice(
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

      <div key={page} className="relative z-20 mt-12 grid gap-8">
        {paginatedBlogArticles.map((article, idx) => (
          <motion.div
            key={article._id}
            initial={{ x: idx % 2 === 0 ? -80 : 80, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.08 }}
            style={{ willChange: "opacity, transform" }}
          >
            <Link href={article.link} target="_blank" rel="noopener noreferrer">
              <article className="group grid cursor-pointer gap-5 overflow-hidden rounded-lg border border-white/10 bg-white/5 p-5 text-white/85 shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-300 active:bg-white/10 active:shadow-lg active:shadow-purple-300 md:grid-cols-[22rem_1fr] md:items-stretch">
                <div className="relative min-h-56 overflow-hidden rounded-lg bg-[#111] md:min-h-52">
                  <Image
                    src={urlFor(article.image).url()}
                    alt={article.title}
                    fill
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 22rem"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                </div>

                <div className="flex flex-col justify-between gap-8">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2 text-sm text-white/55">
                      <FaCalendarDays size={14} />
                      <span>{formatFullDate(article.publishedAt)}</span>
                    </div>

                    <h2
                      className="text-2xl font-bold leading-tight tracking-tight text-white"
                      title={article.title}
                    >
                      {truncateText(article.title, MAX_TITLE_LENGTH)}
                    </h2>

                    <p className="text-sm leading-7 text-white/70">
                      {truncateText(article.summary, MAX_SUMMARY_LENGTH)}
                    </p>
                  </div>

                  <div className="flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 font-semibold text-white transition duration-200 group-hover:scale-[1.03] group-hover:bg-white/25 group-active:scale-[0.98]">
                    <span>Read article</span>
                    <motion.span whileHover={{ x: 5 }} whileTap={{ x: 5 }}>
                      <FaArrowRight className="text-sm" />
                    </motion.span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>

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
export default Blog;
