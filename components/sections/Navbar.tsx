"use client";

import Image from "next/image";
import Link from "next/link";
import BlurText from "../custom-ui/blur-text";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Experience",
      link: pathname === "/" ? "/#experience" : "/experience",
    },
    {
      label: "Projects",
      link: pathname === "/" ? "/#projects" : "/projects",
    },
    { label: "Blog", link: "/blog" },
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
            <Image
              src="/33.png"
              alt="Logo"
              width={50}
              height={50}
              loading="eager"
              priority
            />
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
              className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-purple-400 px-8 pb-10 pt-24 [will-change:clip-path,opacity] md:hidden"
              initial={{
                opacity: 0,
                clipPath: "circle(20px at calc(100% - 3.25rem) 3.25rem)",
              }}
              animate={{
                opacity: 1,
                clipPath: "circle(155% at calc(100% - 3.25rem) 3.25rem)",
              }}
              exit={{
                opacity: 0,
                clipPath: "circle(20px at calc(100% - 3.25rem) 3.25rem)",
              }}
              transition={{
                duration: 0.78,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                onClick={closeMenu}
                className="absolute right-8 top-8 z-50 cursor-pointer text-black transition-transform duration-200 hover:scale-110"
                aria-label="Close menu"
              >
                <FaTimes size={28} />
              </button>

              <div className="flex min-h-full flex-col">
                <ul className="grid flex-1 place-content-center justify-items-center gap-12 text-center">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                      animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                      transition={{
                        delay: 0.18 + index * 0.075,
                        duration: 0.58,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-[clamp(2.15rem,9vw,3rem)] font-bold leading-[1]"
                    >
                      <Link
                        href={item.link}
                        onClick={closeMenu}
                        className="text-black/80 transition-colors hover:text-black"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap justify-center gap-8 pb-2">
                  {socialItems.map((item, index) => (
                    <motion.span
                      key={item.label}
                      initial={{ opacity: 0, y: 18, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{
                        delay: 0.34 + index * 0.05,
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="block text-black transition-transform duration-200 hover:scale-110"
                        aria-label={item.label}
                      >
                        {item.icon}
                      </Link>
                    </motion.span>
                  ))}
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
