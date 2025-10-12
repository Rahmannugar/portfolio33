"use client";

import CalForm from "../custom-ui/cal-embed";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCode, FaSearch, FaLightbulb, FaPencilAlt } from "react-icons/fa";

const heading = "Services";

const services = [
  {
    id: 1,
    title: "Web Development & Design",
    icon: <FaCode className="text-3xl" />,
    description:
      "Building responsive, modern websites and applications that work across all devices and browsers.",
    features: [
      "Custom website & application development",
      "UI/UX implementation",
      "Responsive design for all devices",
      "Performance optimization",
    ],
  },
  {
    id: 2,
    title: "SEO Optimization",
    icon: <FaSearch className="text-3xl" />,
    description:
      "Improving your website's visibility in search engines to drive more organic traffic and reach more customers.",
    features: [
      "Technical SEO audits",
      "Performance & accessibility improvement",
      "Content optimization strategies",
      "SEO-friendly web development",
    ],
  },
  {
    id: 3,
    title: "Technical Consulting & Writing",
    icon: <FaPencilAlt className="text-3xl" />,
    description:
      "Sharing expertise through documentation, articles, and direct consulting to help teams build better web products.",
    features: [
      "Technical documentation",
      "Developer-focused technical articles",
      "Code reviews & architecture advice",
      "Technology selection guidance",
    ],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-100px" });

  const articleRefs = useRef(
    Array.from({ length: services.length }, () => useRef<HTMLDivElement>(null))
  );

  const articleInViews = articleRefs.current.map((ref) => useInView(ref));

  return (
    <section className="relative mt-40" id="services" ref={sectionRef}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {services.map((service, idx) => (
          <motion.article
            key={service.id}
            className={`
            cursor-pointer
              flex flex-col gap-6 font-semibold
              bg-white/10 border border-white/20
              rounded-2xl
              px-6 py-8
              backdrop-blur-[5px]
              h-full
              transition-all duration-300
              hover:bg-white/15
              hover:border-white/30
              text-white
                        ${idx === 2 ? "sm:col-span-2 sm:mx-auto sm:max-w-[50%] lg:col-span-1 lg:max-w-full" : ""}
            `}
            ref={articleRefs.current[idx]}
            initial={{ y: 40, opacity: 0 }}
            animate={articleInViews[idx] ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ willChange: "opacity, transform" }}
          >
            {/* Icon and title */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold">{service.title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-200 leading-relaxed">
              {service.description}
            </p>

            {/* Features list */}
            <ul className="space-y-2 mt-auto">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Ready to work together?
        </h3>
        <CalForm />
      </div>
    </section>
  );
};
export default Services;
