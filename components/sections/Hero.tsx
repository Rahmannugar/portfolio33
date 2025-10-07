"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import ProfileCard from "../custom-ui/profile-card/profile-card";

export const handleContactClick = () => {
  window.location.href = "/#contact";
};

const Hero = () => {
  return (
    <section className="relative z-10 flex justify-between gap-10 items-start pt-40 lg:pt-48">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-purple-300 uppercase">
          Hi, I am Adenuga
        </h1>

        <div className="max-w-3xl h-[150px] md:h-[70px] w-[300px] md:w-[600px] lg:w-3xl text-lg lg:text-xl">
          <Typewriter
            options={{
              strings: [
                "Frontend engineer focused on crafting scalable, high-performance web applications with clean architecture and seamless user experiences.",
              ],
              autoStart: true,
              loop: false,
              delay: 40,
              deleteSpeed: 9999999,
            }}
          />
        </div>

        <div className="flex items-center space-x-3">
          <motion.a
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.5 }}
            href="https://www.github.com/Rahmannugar"
            target="_blank"
          >
            <FaGithub size={30} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.5 }}
            href="https://www.linkedin.com/in/Rahmannugar"
            target="_blank"
          >
            <FaLinkedin size={30} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 0.8 }}
            whileTap={{ scale: 0.8 }}
            href="https://docs.google.com/document/d/1ibsZ8pXdPh5WeA22O7mXJTckm9-3OWxYASYGmaO8f68"
            target="_blank"
          >
            <button className="cursor-pointer bg-white py-3 px-6 rounded-full text-lg font-semibold text-black">
              View Resume
            </button>
          </motion.a>
        </div>
      </div>

      <div className="hidden lg:block lg:mt-[-40px]">
        <ProfileCard
          name="Adenuga Abdulrahmon"
          title="Frontend Engineer"
          handle="rahmannugar"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/profile.JPG"
          showUserInfo={true}
          enableTilt={true}
          onContactClick={handleContactClick}
          enableMobileTilt={true}
        />
      </div>
    </section>
  );
};

export default Hero;
