"use client";
import { motion, useInView } from "framer-motion";
import { Experience } from "@/lib/types/experience";
import { useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/services/sanity";
import Link from "next/link";
import { formatMonthYear } from "@/lib/utils/dateFormatter";

interface ExperienceProps {
  experiences: Experience[];
}

const Experiences = ({ experiences }: ExperienceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  return (
    <section ref={sectionRef}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 font-semibold relative z-20">
        {experiences.map((exp, idx) => (
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
    </section>
  );
};
export default Experiences;
