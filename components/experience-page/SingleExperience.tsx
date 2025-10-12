"use client";

import { Experience } from "@/lib/types/experience";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import { formatMonthYear } from "@/lib/utils/dateFormatter";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";

interface SingleExperienceProps {
  experience: Experience;
}

const SingleExperience = ({ experience }: SingleExperienceProps) => {
  return (
    <section className="mt-10">
      {/* Back Button */}
      <motion.div
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-32 left-8 md:left-12 bg-[#1e1d1d] w-fit p-2 rounded-full shadow-lg"
      >
        <Link href="/experience" aria-label="Back to Experience List">
          <IoIosArrowRoundBack size={30} />
        </Link>
      </motion.div>

      {/* Card */}
      <div className="bg-[#1e1d1d] rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-8 border border-[#232222]/60">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 1.08 }}
          >
            <Image
              src={urlFor(experience.image).url()}
              alt={experience.company}
              width={100}
              height={100}
              className="rounded-xl border border-[#232222]/50 bg-[#181818] object-contain"
            />
          </motion.div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{experience.position}</h2>
            <h3 className="text-lg font-semibold">{experience.company}</h3>
            <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <FaLocationDot />
                {experience.location}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarDays />
                {formatMonthYear(experience.startDate)} –{" "}
                {experience.currentlyWorking && !experience.endDate
                  ? "Present"
                  : formatMonthYear(experience.endDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/40 w-full my-2" />

        {/* Summary */}
        <div>
          <h4 className="font-bold text-xl mb-2">Summary</h4>
          <p className="text-base leading-relaxed">{experience.summary}</p>
        </div>

        {/* Highlights */}
        {experience.highlights && experience.highlights.length > 0 && (
          <div>
            <h4 className="font-bold text-xl mb-2">Highlights</h4>
            <ul className="list-disc list-inside space-y-2">
              {experience.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default SingleExperience;
