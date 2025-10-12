"use client";

import type { Project } from "@/lib/types/project";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollStack, { ScrollStackItem } from "../custom-ui/scroll-stack";
import Image from "next/image";
import Link from "next/link";
const heading = "Projects";
interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-100px" });
  const demoProjects = projects.slice(0, 5);

  return (
    <section className="relative mt-40" id="projects" ref={sectionRef}>
      <div className="flex justify-end w-full">
        <motion.h2
          className="text-4xl font-bold uppercase text-right"
          initial={{ x: "100vw", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {heading}
          <span
            aria-hidden
            className="block h-0.5 bg-black mt-1 ml-auto"
            style={{
              width: `calc(${heading.length / 2}ch)`,
            }}
          />
        </motion.h2>
      </div>

      <div className="relative">
        <ScrollStack>
          <ScrollStackItem>
            <div className="cursor-pointer bg-[#1e1d1d] rounded-lg px-6 py-8 backdrop-blur-[5px] h-full w-full transition-all duration-300">
              <div className="flex flex-col items-stretch md:flex-row gap-5">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">Bezal</h2>
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src="/super.png"
                      alt="Project 1"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[40%] justify-center">
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Placeat sed maxime explicabo, eum magni, reiciendis aliquid
                    harum nobis earum perspiciatis nam soluta. Reprehenderit
                    quae deserunt libero quasi facilis architecto quos nostrum
                    officia tempore commodi. Nesciunt consequuntur, laboriosam
                    fuga vel sapiente in. Ipsum eaque voluptatem reiciendis
                    totam odit a quasi harum.
                  </p>
                </div>
              </div>

              <Link href={`/projects/1`} className="flex justify-center mt-5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                  className="cursor-pointer bg-white py-2 px-5 rounded-full font-semibold text-black"
                >
                  View Project Details
                </motion.button>
              </Link>
            </div>
          </ScrollStackItem>

          <ScrollStackItem>
            <div className="cursor-pointer bg-[#1e1d1d] rounded-lg px-6 py-8 backdrop-blur-[5px] h-full w-full transition-all duration-300">
              <div className="flex flex-col items-stretch md:flex-row gap-5">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">Bezal</h2>
                  <div className="relative w-full md:w-[60%] aspect-[16/9]">
                    <Image
                      src="/super.png"
                      alt="Project 1"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[40%] justify-center">
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Placeat sed maxime explicabo, eum magni, reiciendis aliquid
                    harum nobis earum perspiciatis nam soluta. Reprehenderit
                    quae deserunt libero quasi facilis architecto quos nostrum
                    officia tempore commodi. Nesciunt consequuntur, laboriosam
                    fuga vel sapiente in. Ipsum eaque voluptatem reiciendis
                    totam odit a quasi harum.
                  </p>
                </div>
              </div>

              <Link href={`/projects/1`} className="flex justify-center mt-5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                  className="cursor-pointer bg-white py-2 px-5 rounded-full font-semibold text-black"
                >
                  View Project Details
                </motion.button>
              </Link>
            </div>
          </ScrollStackItem>

          <ScrollStackItem>
            <div className="cursor-pointer bg-[#1e1d1d] rounded-lg px-6 py-8 backdrop-blur-[5px] h-full w-full transition-all duration-300">
              <div className="flex flex-col items-stretch md:flex-row gap-5">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">Bezal</h2>
                  <div className="relative w-full md:w-[60%] aspect-[16/9]">
                    <Image
                      src="/super.png"
                      alt="Project 1"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[40%] justify-center">
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Placeat sed maxime explicabo, eum magni, reiciendis aliquid
                    harum nobis earum perspiciatis nam soluta. Reprehenderit
                    quae deserunt libero quasi facilis architecto quos nostrum
                    officia tempore commodi. Nesciunt consequuntur, laboriosam
                    fuga vel sapiente in. Ipsum eaque voluptatem reiciendis
                    totam odit a quasi harum.
                  </p>
                </div>
              </div>

              <Link href={`/projects/1`} className="flex justify-center mt-5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                  className="cursor-pointer bg-white py-2 px-5 rounded-full font-semibold text-black"
                >
                  View Project Details
                </motion.button>
              </Link>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>

      <div className="flex justify-center mt-10 relative z-20">
        <Link href="/projects">
          <button className="bg-purple-400 hover:bg-purple-300 active:bg-purple-300 duration-300 ease-in-out text-black py-3 font-semibold px-6 cursor-pointer rounded-full">
            View All Projects
          </button>
        </Link>
      </div>
    </section>
  );
};
export default Projects;
