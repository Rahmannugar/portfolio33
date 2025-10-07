import Image from "next/image";
import Link from "next/link";
import BlurText from "./custom-ui/blur-text";
import { motion } from "framer-motion";
import { useState } from "react";

const menuItems = [
  { label: "Experience", link: "/#experience" },
  { label: "Projects", link: "/#projects" },
  { label: "Blog", link: "/blog" },
  { label: "Contact", link: "/#contact" },
];

const socialItems = [
  { label: "Email", link: "mailto:cladeadenugar@gmail.com" },
  { label: "GitHub", link: "https://github.com/rahmannugar" },
  { label: "LinkedIn", link: "https://linkedin.com/in/rahmannugar" },
  { label: "Twitter", link: "https://twitter.com/NugarRahman" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="w-[90%] lg:w-full flex items-center justify-between py-1 left-1/2 -translate-x-1/2 px-5 md:px-10 absolute top-7 max-w-7xl mx-auto bg-white/10 backdrop-blur-[5px] border border-white/20 rounded-full">
        <Link href="/">
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: 1.8,
              ease: "easeOut",
            }}
          >
            <Image src="/33.png" alt="Logo" priority width={50} height={50} />
          </motion.div>
        </Link>

        {/* desktop nav */}
        <div className="hidden md:flex items-center ml-auto gap-8 text-xl font-semibold text-white">
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
          className="md:hidden ml-auto flex items-center"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: 1.8,
            ease: "easeOut",
          }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="relative w-8 h-8 flex items-center justify-center"
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

        {/* <div style={{ height: "100vh", background: "#fffff" }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={["#B19EEF", "#5227FF"]}
          logoUrl="/33.png"
          accentColor="#ff6b6b"
          onMenuOpen={() => console.log("Menu opened")}
          onMenuClose={() => console.log("Menu closed")}
          isFixed={false}
        />
      </div> */}
      </nav>

      {/* mobile nav */}
      <div className="md:hidden bg-white z-50 w-[70vw] h-[100vh]">
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
