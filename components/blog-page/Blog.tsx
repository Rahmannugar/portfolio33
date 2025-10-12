"use client";
import type { Blog } from "@/lib/types/blog";
import { motion, useInView } from "framer-motion";
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
const PER_PAGE = 6;
const MAX_SUMMARY_LENGTH = 150;
const MAX_TITLE_LENGTH = 50;

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

const Blog = ({ blogArticles }: BlogArticlesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  const articleRefs = useRef(
    Array.from({ length: blogArticles.length }, () =>
      useRef<HTMLDivElement>(null)
    )
  );

  const articleInViews = articleRefs.current.map((ref) => useInView(ref));

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

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 font-semibold relative z-20">
        {paginatedBlogArticles.map((article, idx) => (
          <motion.article
            key={article._id}
            ref={articleRefs.current[idx]}
            initial={{ y: 40, opacity: 0 }}
            animate={articleInViews[idx] ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ willChange: "opacity, transform" }}
            className="
              cursor-pointer
              flex flex-col h-full w-full
              bg-[#1e1d1d]
              text-white/85
              rounded-lg overflow-hidden
              transition-all duration-300
              hover:bg-[#232222]
              active:bg-[#232222]
            "
          >
            {/* Image container with overlay gradient */}
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={urlFor(article.image).url()}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1d1d] to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white/90 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                <FaCalendarDays size={12} />
                <span>{formatFullDate(article.publishedAt)}</span>
              </div>
            </div>

            {/* Content section */}
            <div className="flex flex-col gap-4 p-6">
              <h2
                className="text-xl font-bold tracking-tight line-clamp-2"
                title={article.title}
              >
                {truncateText(article.title, MAX_TITLE_LENGTH)}
              </h2>

              <p className="text-sm text-gray-300 line-clamp-3">
                {truncateText(article.summary, MAX_SUMMARY_LENGTH)}
              </p>

              {/* Read more link */}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`${article.link}`}
                className="mt-auto flex items-center gap-2 group"
              >
                <span className="text-white group-hover:underline">
                  Read article
                </span>
                <motion.div whileHover={{ x: 5 }} whileTap={{ x: 5 }}>
                  <FaArrowRight className="text-white text-sm" />
                </motion.div>
              </Link>
            </div>
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
export default Blog;
