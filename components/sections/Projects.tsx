"use client";

import type { Project } from "@/lib/types/project";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollStack, { ScrollStackItem } from "../custom-ui/scroll-stack";
import Image from "next/image";
const heading = "Projects";
interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-100px" });

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
            <div
              className="cursor-pointer
            flex flex-col md:flex-row gap-5
             bg-[#1e1d1d]
              text-[#cccbcb]
            px-6 py-8 
            backdrop-blur-[5px]
            h-full w-full
            transition-all duration-300
      
       
          "
            >
              <Image
                src="/super.png"
                alt="Project 1"
                width={500}
                height={300}
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat sed maxime explicabo, eum magni, reiciendis aliquid
                harum nobis earum perspiciatis nam soluta. Reprehenderit quae
                deserunt libero quasi facilis architecto quos nostrum officia
                tempore commodi. Nesciunt consequuntur, laboriosam fuga vel
                sapiente in. Ipsum eaque voluptatem reiciendis totam odit a
                quasi harum.
              </p>
            </div>
          </ScrollStackItem>

          <ScrollStackItem>
            <div
              className="cursor-pointer
            flex flex-col md:flex-row gap-5
             bg-[#1e1d1d]
              text-[#cccbcb]
            px-6 py-8 
            backdrop-blur-[5px]
            h-full w-full
            transition-all duration-300
      
       
          "
            >
              <Image
                src="/super.png"
                alt="Project 1"
                width={500}
                height={300}
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat sed maxime explicabo, eum magni, reiciendis aliquid
                harum nobis earum perspiciatis nam soluta. Reprehenderit quae
                deserunt libero quasi facilis architecto quos nostrum officia
                tempore commodi. Nesciunt consequuntur, laboriosam fuga vel
                sapiente in. Ipsum eaque voluptatem reiciendis totam odit a
                quasi harum.
              </p>
            </div>
          </ScrollStackItem>

          <ScrollStackItem>
            <div
              className="cursor-pointer
            flex flex-col md:flex-row gap-5
             bg-[#1e1d1d]
              text-[#cccbcb]
            px-6 py-8 
            backdrop-blur-[5px]
            h-full w-full
            transition-all duration-300
      
       
          "
            >
              <Image
                src="/super.png"
                alt="Project 1"
                width={500}
                height={300}
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat sed maxime explicabo, eum magni, reiciendis aliquid
                harum nobis earum perspiciatis nam soluta. Reprehenderit quae
                deserunt libero quasi facilis architecto quos nostrum officia
                tempore commodi. Nesciunt consequuntur, laboriosam fuga vel
                sapiente in. Ipsum eaque voluptatem reiciendis totam odit a
                quasi harum.
              </p>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
};
export default Projects;
