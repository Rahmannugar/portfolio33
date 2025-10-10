"use client";

import { Experience } from "@/lib/types/experience";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";

interface SingleExperienceProps {
  experience: Experience;
}
const SingleExperience = ({ experience }: SingleExperienceProps) => {
  return (
    <section>
      <motion.div
        whileHover={{ scale: 0.85 }}
        whileTap={{ scale: 0.85 }}
        className="bg-[#1e1d1d] w-fit p-2 rounded-full"
      >
        <Link href="/experience">
          <IoIosArrowRoundBack size={30} />
        </Link>
      </motion.div>
      {experience.company} - SingleExperiencePage
    </section>
  );
};
export default SingleExperience;
