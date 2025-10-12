"use client";

import { Experience } from "@/lib/types/experience";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import { formatMonthYear } from "@/lib/utils/dateFormatter";
import { urlFor } from "@/lib/services/sanity";
import Image from "next/image";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";

interface SingleExperienceProps {
  experience: Experience;
}

const SingleExperience = ({ experience }: SingleExperienceProps) => {
  return (
    <section>
      {/* Card */}
      <div className="bg-[#1e1d1d] max-w-3xl rounded-2xl shadow-xl p-8 flex flex-col gap-8 border border-[#232222]/60">
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
              <span className="flex items-center gap-2">
                <FaLocationDot />
                {experience.location}
              </span>
              <span className="flex items-center gap-2">
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
              {experience.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}

        <Link href="/experience" className="w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full cursor-pointer bg-white/10 border border-white/20 py-2.5 px-5 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
          >
            <FaBriefcase className="text-xs" />
            Back to all experiences
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default SingleExperience;
