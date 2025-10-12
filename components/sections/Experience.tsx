"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import GlassPill from "../custom-ui/glass-surface/GlassPill";
import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/lib/types/experience";
import { urlFor } from "@/lib/services/sanity";
import { formatMonthYear } from "@/lib/utils/dateFormatter";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";

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

  const articleRefs = useRef(
    Array.from({ length: demoExperiences.length }, () =>
      useRef<HTMLDivElement>(null)
    )
  );

  const articleInViews = articleRefs.current.map((ref) => useInView(ref));

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

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 font-semibold relative z-20">
        {demoExperiences.map((exp, idx) => (
          <motion.article
            key={exp._id}
            ref={articleRefs.current[idx]}
            initial={{ y: 40, opacity: 0 }}
            animate={articleInViews[idx] ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ willChange: "opacity, transform" }}
            className={`
              cursor-pointer
              flex flex-col gap-5 h-full w-full
              bg-[#1e1d1d]
              text-[#cccbcb]
              rounded-lg
              px-6 py-8
              transition-all duration-300
              hover:bg-[#232222]
              active:bg-[#232222]
              ${idx === 2 ? "sm:col-span-2 sm:mx-auto sm:max-w-[50%] lg:col-span-1 lg:max-w-full" : ""}
            `}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-lg">{exp.position}</h2>
              <h2 className="text-lg">{exp.company}</h2>
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
              <h2 className="flex items-center gap-2">
                <FaLocationDot />
                <span>{exp.location}</span>
              </h2>
              <h2 className="flex items-center gap-2">
                <FaCalendarDays />
                <span>
                  {formatMonthYear(exp.startDate)} –{" "}
                  {exp.currentlyWorking && !exp.endDate
                    ? "Present"
                    : formatMonthYear(exp.endDate)}
                </span>
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
