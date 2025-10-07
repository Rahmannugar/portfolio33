"use client";

import Image from "next/image";
import Link from "next/link";
import BlurText from "../custom-ui/blur-text";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const menuItems = [
  { label: "Experience", link: "/#experience" },
  { label: "Projects", link: "/#projects" },
  { label: "Blog", link: "/blog" },
  { label: "Contact", link: "/#contact" },
];

const socialItems = [
  {
    label: "Email",
    icon: <MdEmail size={30} />,
    link: "mailto:cladeadenugar@gmail.com",
  },
  {
    label: "GitHub",
    icon: <FaGithub size={30} />,
    link: "https://github.com/rahmannugar",
  },
  {
    label: "LinkedIn",
    icon: <FaLinkedin size={30} />,
    link: "https://linkedin.com/in/rahmannugar",
  },
  {
    label: "Twitter",
    icon: <FaSquareXTwitter size={30} />,
    link: "https://twitter.com/NugarRahman",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="w-[90%] flex items-center justify-between py-1 left-1/2 -translate-x-1/2 px-5 md:px-10 absolute top-7 mx-auto bg-white/30 backdrop-blur-[5px] border border-white/20 rounded-full max-w-7xl">
        <Link href="/">
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              delay: 1.8,
              ease: "easeOut",
            }}
          >
            <Image src="/33.png" alt="Logo" priority width={50} height={50} />
          </motion.div>
        </Link>

        {/* desktop nav */}
        <div className="hidden md:flex gap-8 text-xl font-semibold uppercase text-white">
          {menuItems.map((item, index) => (
            <Link key={item.label} href={item.link} className="relative group">
              <BlurText
                text={item.label}
                delay={150 + index * 50}
                animateBy="letters"
                direction="top"
                stepDuration={0.3}
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-[50%]"></span>
            </Link>
          ))}
        </div>

        {/* mobile navtools */}
        <motion.div
          className="md:hidden ml-auto"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: 1.8,
            ease: "easeOut",
          }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="w-8 h-8 flex items-center justify-center z-50"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <motion.div
                className="absolute h-[2px] w-6 bg-white rounded-full"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 0 : -4,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.23, 1, 0.32, 1],
                }}
              />
              <motion.div
                className="absolute h-[2px] w-6 bg-white rounded-full"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : 4,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.23, 1, 0.32, 1],
                }}
              />
            </div>
          </button>
        </motion.div>
      </nav>

      {/* mobile nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              className="fixed top-0 left-0 h-full w-[70%] bg-purple-400 p-8 z-40 md:hidden overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
            >
              <div className="mt-16 space-y-20">
                <ul className="space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2 + index * 0.1,
                        duration: 0.3,
                      }}
                      className="text-3xl uppercase font-bold"
                    >
                      <Link
                        href={item.link}
                        onClick={closeMenu}
                        className="text-black"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div>
                  <motion.h3
                    className="text-white font-bold mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + menuItems.length * 0.1,
                      duration: 0.3,
                    }}
                  >
                    Socials
                  </motion.h3>
                  <div className="flex space-x-6">
                    {socialItems.map((item, index) => (
                      <motion.span
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: (menuItems.length + 1 + index) * 0.1,
                          duration: 0.3,
                        }}
                      >
                        <Link
                          href={item.link}
                          target="_blank"
                          onClick={closeMenu}
                          className="text-black block"
                        >
                          {item.icon}
                        </Link>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
