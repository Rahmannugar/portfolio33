"use client";

import ProfileCard from "../custom-ui/profile-card/profile-card";
import { handleContactClick } from "./Hero";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const heading = "About Me";

const Profile = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-100px" });

  return (
    <section className="relative mt-40" ref={sectionRef} id="profile">
      <motion.h2
        className="text-4xl font-bold uppercase inline-block"
        initial={{ x: -60, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
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

      <div className="flex flex-col items-start justify-between lg:justify-center gap-10 md:flex-row mt-10">
        <div className="lg:hidden flex justify-center w-full">
          <ProfileCard
            name="Adenuga Abdulrahmon"
            title="Software Engineer"
            handle="rahmannugar"
            status="Online"
            showBehindGradient={false}
            contactText="Contact Me"
            avatarUrl="/profile-image.jpg"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={handleContactClick}
            enableMobileTilt={true}
          />
        </div>
        <motion.article
          className="cursor-pointer
            flex flex-col gap-6 md:text-sm lg:text-lg font-semibold
            bg-white/30 border border-white/20
            rounded-2xl
            px-6 py-8 md:px-10 md:py-10
            backdrop-blur-[5px]
            w-full
            transition-all duration-300
            hover:bg-white/20
            active:bg-white/20
            text-white
          "
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p>
        I’m Abdulrahmon Adenuga, a software engineer with experience building scalable, high-performance systems across the stack. I design and develop responsive frontends and reliable backend systems, with a focus on clean architecture, performance, and long-term maintainability. My work includes building distributed systems and delivering production-ready software.
          </p>
          <p>
           I primarily work with TypeScript, using React and Next.js on the frontend, and Node.js for backend systems, alongside PostgreSQL for data storage. I care about writing clear, maintainable code and building systems that remain stable as they grow.
          </p>

          <p>
Outside of work, I spend time exploring new technologies, learning from open-source projects, and building tools that improve developer workflows.
          </p>
        </motion.article>
      </div>
    </section>
  );
};
export default Profile;
