"use client";

import { Project } from "@/lib/types/project";
import {
  FaCalendarDay,
  FaCode,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/services/sanity";
import { formatMonthYear } from "@/lib/utils/dateFormatter";

interface SingleProjectProps {
  project: Project;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return (
    <section>
      <div className="max-w-3xl bg-[#1e1d1d] rounded-2xl shadow-xl border border-[#232222]/60 p-8 flex flex-col gap-10 text-white/90">
        {/* Title & Dates */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {project.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <FaCalendarDay />
            <span>
              {formatMonthYear(project.startDate)} –{" "}
              {project.currentlyWorking
                ? "Present"
                : formatMonthYear(project.endDate)}
            </span>
          </div>
        </div>

        {/* Preview Image */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <Image
            src={urlFor(project.previewImage).url()}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-base leading-relaxed">{project.description}</p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Highlights</h2>
            <ul className="list-disc list-inside space-y-2">
              {project.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages/Technologies */}
        {project.languages && project.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.languages.map((lang, i) => (
                <span
                  key={i}
                  className="text-xs py-1 px-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/10"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Images */}
        {project.images && project.images.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10"
                >
                  <Image
                    src={urlFor(img).url()}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto"
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
          <Link href="/projects" className="w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full cursor-pointer bg-white/10 border border-white/20 py-2.5 px-5 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
            >
              <FaCode className="text-xs" />
              Back to Projects
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SingleProject;
