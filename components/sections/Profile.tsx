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

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:items-start">
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
          className="lg:col-start-2 grid gap-6 border-y border-white/20 py-8 text-white"
          initial={{ opacity: 0, x: 90, scale: 0.98 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xl font-semibold leading-relaxed md:text-2xl">
            I'm Abdulrahmon Adenuga, a Software Engineer specializing in
            building applications across the stack. I'm experienced in designing
            backend systems and user interfaces, with a focus on delivering
            well-engineered software.
          </p>
          <p className="max-w-3xl text-base font-medium leading-8 text-white/75 md:text-lg">
            I primarily work with TypeScript, using React on the frontend, and
            Node.js for backend systems, alongside PostgreSQL for data storage.
            I care about writing clear, maintainable code and building systems
            that remain stable as they grow.
          </p>

          <p className="max-w-3xl text-base font-medium leading-8 text-white/75 md:text-lg">
            Outside of work, I spend time exploring new technologies, learning
            from open-source projects, and building tools that improve developer
            workflows.
          </p>
        </motion.article>
      </div>
    </section>
  );
};
export default Profile;
