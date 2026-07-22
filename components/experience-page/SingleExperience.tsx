"use client";

import { Experience } from "@/lib/types/experience";
import Link from "next/link";
import { motion } from "motion/react";
import { formatMonthYear } from "@/lib/utils/dateFormatter";
import { urlFor } from "@/lib/services/sanity";
import Image from "next/image";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { FaArrowLeft, FaBriefcase } from "react-icons/fa";
import CompanyLink from "../custom-ui/company-link";

interface SingleExperienceProps {
  experience: Experience;
}

const SingleExperience = ({ experience }: SingleExperienceProps) => {
  return (
    <section className="grid gap-12 text-white/90">
      <motion.div
        className="grid cursor-pointer gap-8 rounded-lg border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-300 active:bg-white/10 active:shadow-lg active:shadow-purple-300 md:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch"
        initial={{ y: 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col justify-between gap-10">
          <div className="grid gap-6">
            <Link
              href="/experience"
              className="inline-flex w-fit items-center gap-3 text-sm font-semibold text-white/55 hover:text-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15">
                <FaArrowLeft className="text-xs" />
              </span>
              Back to experience
            </Link>

            <motion.div
              className="flex h-32 w-32 items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 1.08 }}
            >
              <Image
                src={urlFor(experience.image).url()}
                alt={experience.company}
                width={200}
                height={200}
                loading="eager"
                className="max-h-28 max-w-28 object-contain md:max-h-32 md:max-w-32"
                style={{ width: "auto", height: "auto" }}
              />
            </motion.div>
          </div>

          <div className="grid gap-4">
            <h1 className="text-2xl font-bold leading-tight text-white md:text-4xl">
              {experience.position}
            </h1>
            <h2 className="text-xl font-semibold text-white/70">
              <CompanyLink
                company={experience.company}
                companyUrl={experience.companyUrl}
              />
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:border-l lg:border-white/10 lg:pl-8">
          <div className="grid gap-3 rounded-lg border border-white/10 bg-black/15 p-5 sm:grid-cols-2">
            <span className="flex items-center gap-2 text-sm text-white/60">
              <FaLocationDot />
              {experience.location}
            </span>
            <span className="flex items-center gap-2 text-sm text-white/60 sm:justify-end">
              <FaCalendarDays />
              {formatMonthYear(experience.startDate)} –{" "}
              {experience.currentlyWorking || !experience.endDate
                ? "Present"
                : formatMonthYear(experience.endDate)}
            </span>
          </div>

          <div className="grid gap-3 rounded-lg border border-white/10 bg-black/15 p-5">
            <h2 className="text-xl font-semibold text-white">Summary</h2>
            <p className="text-sm leading-8 text-white/75">
              {experience.summary}
            </p>
          </div>
        </div>
      </motion.div>

      {experience.highlights && experience.highlights.length > 0 && (
        <motion.div
          className="grid gap-4"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
        >
          <div className="flex items-center gap-3">
            <FaBriefcase className="text-sm text-white/55" />
            <h2 className="text-3xl font-bold text-white">Highlights</h2>
          </div>

          <ul className="grid gap-3">
            {experience.highlights.map((highlight) => (
              <motion.li
                key={highlight}
                whileHover={{ x: 6 }}
                className="cursor-pointer rounded-lg border border-white/10 bg-white/5 p-5 text-sm leading-8 text-white/75 transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-300 active:bg-white/10 active:shadow-lg active:shadow-purple-300"
              >
                {highlight}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </section>
  );
};

export default SingleExperience;
