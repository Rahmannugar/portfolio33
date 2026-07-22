"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import GlassPill from "../custom-ui/glass-surface/GlassPill";
import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/lib/types/experience";
import { urlFor } from "@/lib/services/sanity";
import { formatMonthYear } from "@/lib/utils/dateFormatter";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import CompanyLink from "../custom-ui/company-link";

interface ExperienceProps {
  experiences: Experience[];
}

const heading = "Experience";

// Browser detection function
const getBrowser = () => {
  if (typeof window === "undefined") return "unknown";
  if (/Firefox/.test(navigator.userAgent)) return "firefox";
  if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))
    return "safari";
  return "chrome";
};

const Experience = ({ experiences }: ExperienceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const demoExperiences = experiences.slice(0, 3);

  const inView = useInView(sectionRef, { margin: "-100px" });

  const [showOverlay, setShowOverlay] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [browser, setBrowser] = useState("unknown");

  useEffect(() => {
    setBrowser(getBrowser());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      if (sectionTop < 120 && sectionBottom > 220) {
        setShowOverlay(true);
        setFadeOut(false);
      } else if ((sectionTop >= 120 || sectionBottom <= 220) && showOverlay) {
        setFadeOut(true);
        setTimeout(() => {
          setShowOverlay(false);
        }, 350);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOverlay]);

  return (
    <section className="relative mt-28" ref={sectionRef} id="experience">
      <motion.h2
        className="text-4xl font-bold uppercase inline-block"
        initial={{ x: -60, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {heading}
        <span
          aria-hidden
          className="block h-0.5 bg-white mt-1"
          style={{
            width: `calc(${heading.length / 2}ch)`,
          }}
        />
      </motion.h2>

      {/* GlassSurface overlay */}
      <GlassPill show={showOverlay} fadeOut={fadeOut} browser={browser} />

      <div className="mt-10 grid gap-6 font-semibold relative z-20">
        {demoExperiences.map((exp, idx) => (
          <motion.article
            key={exp._id}
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.08 }}
            style={{ willChange: "opacity, transform" }}
            className="group grid cursor-pointer gap-6 rounded-lg border border-white/10 bg-white/5 p-6 text-white/85 shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-300 active:bg-white/10 active:shadow-lg active:shadow-purple-300 md:grid-cols-[5rem_1fr] lg:grid-cols-[5rem_minmax(0,1fr)_minmax(15rem,auto)_auto] lg:items-center"
          >
            <div>
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 1.08 }}
              >
                <Image
                  src={urlFor(exp.image).url()}
                  alt={exp.company}
                  width={100}
                  height={100}
                  className="max-h-16 max-w-16 object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </motion.div>
            </div>

            <div className="grid gap-4">
              <div>
                <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                  {exp.position}
                </h2>
                <h2 className="mt-1 text-lg text-white/70">
                  <CompanyLink
                    company={exp.company}
                    companyUrl={exp.companyUrl}
                  />
                </h2>
              </div>
              <div className="flex flex-col gap-2 text-sm text-white/60 sm:flex-row sm:items-center sm:gap-5">
                <h2 className="flex items-center gap-2">
                  <FaLocationDot />
                  <span>{exp.location}</span>
                </h2>
              </div>
            </div>

            <h2 className="flex items-center gap-2 text-sm text-white/55 lg:justify-center">
              <FaCalendarDays />
              <span>
                {formatMonthYear(exp.startDate)} –{" "}
                {exp.currentlyWorking || !exp.endDate
                  ? "Present"
                  : formatMonthYear(exp.endDate)}
              </span>
            </h2>

            <Link
              href={`/experience/${exp._id}`}
              prefetch={false}
              className="flex justify-start lg:justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-white/25 sm:w-auto"
              >
                <FaBriefcase className="text-xs" />
                View Work Details
              </motion.button>
            </Link>
          </motion.article>
        ))}
      </div>

      <div className="flex justify-center mt-16 relative z-20">
        <Link href="/experience">
          <button className="bg-purple-400 hover:bg-purple-300 active:bg-purple-300 duration-300 ease-in-out text-black py-3 font-semibold px-6 cursor-pointer rounded-full">
            View Entire Work History
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Experience;
