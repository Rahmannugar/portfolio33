"use client";

import { Project } from "@/lib/types/project";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/services/sanity";
import { useState } from "react";

interface SingleProjectProps {
  project: Project;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  const galleryImages = project.images?.length ? project.images : [];
  const heroImages = (
    galleryImages.length ? galleryImages : [project.previewImage]
  ).slice(0, 4);
  const [activeImage, setActiveImage] = useState<{
    alt: string;
    src: string;
  } | null>(null);

  return (
    <section className="grid gap-12 text-white/90">
      <div className="grid gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="flex flex-col justify-between gap-8">
          <div className="grid gap-5">
            <Link
              href="/projects"
              className="inline-flex w-fit items-center gap-3 text-sm font-semibold text-white/55 hover:text-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15">
                <FaArrowLeft className="text-xs" />
              </span>
              Back to projects
            </Link>

            <h1 className="text-4xl font-bold leading-none text-white md:text-5xl">
              {project.title}
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition-colors hover:bg-white/90"
              >
                <FaExternalLinkAlt className="text-xs" />
                Live Project
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.25fr_0.85fr] md:grid-rows-[16rem_7rem_13rem] xl:grid-rows-[18rem_8rem_15rem]">
          {heroImages.map((img, idx) => (
              <motion.button
                type="button"
                key={`${project.title}-hero-${idx}`}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() =>
                  setActiveImage({
                    src: urlFor(img).url(),
                    alt: `${project.title} screenshot ${idx + 1}`,
                  })
                }
                className={`relative aspect-video cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-[#080808] text-left shadow-lg transition-all duration-300 hover:border-white/25 hover:shadow-purple-300/30 active:shadow-purple-300/30 md:aspect-auto md:h-full ${
                  idx === 0
                    ? "md:col-start-1 md:row-span-2 md:row-start-1"
                    : idx === 1
                      ? "md:col-start-2 md:row-start-1"
                      : idx === 2
                        ? "md:col-start-2 md:row-span-2 md:row-start-2"
                        : "md:col-start-1 md:row-start-3"
                }`}
              >
                <Image
                  src={urlFor(img).url()}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  fill
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="object-cover"
                  sizes={
                    idx === 0
                      ? "(max-width: 1024px) 100vw, 34vw"
                      : idx === 3
                        ? "(max-width: 1024px) 100vw, 56vw"
                        : "(max-width: 1024px) 100vw, 22vw"
                  }
                />
              </motion.button>
          ))}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        {project.technologies && project.technologies.length > 0 && (
          <aside className="h-fit">
            <h2 className="mb-4 text-xl font-semibold">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs backdrop-blur-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </aside>
        )}

        <div className="grid gap-10">
          <div>
            <h2 className="mb-3 text-xl font-semibold">Description</h2>
            <p className="text-sm leading-8 text-white/75">
              {project.description}
            </p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h2 className="mb-3 text-xl font-semibold">Highlights</h2>
              <ul className="grid gap-0">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="border-t border-white/10 py-3 text-sm text-white/75"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              className="relative h-[80vh] w-full max-w-6xl overflow-hidden rounded-lg border border-white/15 bg-black"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-black"
                aria-label="Close image"
              >
                <FaTimes className="text-sm" />
              </button>
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SingleProject;
