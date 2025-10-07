"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className="relative min-h-screen -mx-7 md:-mx-12">
      {/* Content */}
      <div className="relative z-10 container pt-40 lg:pt-48 px-7 md:px-12">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-5xl font-bold text-purple-300 uppercase">
            Hi, I am Adenuga
          </h1>
          <p className="mt-4 max-w-3xl text-lg lg:text-xl">
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
          </p>

          
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
      </div>
    </section>
  );
};

export default Hero;
