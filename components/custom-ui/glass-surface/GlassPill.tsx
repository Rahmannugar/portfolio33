"use client";

import { motion } from "framer-motion";
import GlassSurface from "./glass-pill";

interface GlassPillProps {
  show: boolean;
  fadeOut: boolean;
  browser: string;
}

const GlassPill = ({ show, fadeOut, browser }: GlassPillProps) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: fadeOut ? 0 : 1,
        transition: { duration: 0.35, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      style={{
        position: "fixed",
        top: 150,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
        pointerEvents: "none",
        ...(browser !== "chrome" && {
          background: `linear-gradient(135deg, 
            rgba(255, 0, 0, 0.1), 
            rgba(255, 154, 0, 0.1),
            rgba(208, 222, 33, 0.1),
            rgba(79, 220, 74, 0.1),
            rgba(63, 218, 216, 0.1),
            rgba(47, 201, 226, 0.1),
            rgba(28, 127, 238, 0.1),
            rgba(95, 21, 242, 0.1),
            rgba(186, 12, 248, 0.1),
            rgba(251, 7, 217, 0.1)
          )`,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "50px",
          backdropFilter: "blur(0.7px) saturate(180%)",
          WebkitBackdropFilter: "blur(0.7px) saturate(180%)",
          boxShadow: `
            0 4px 6px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }),
      }}
    >
      {browser === "chrome" && <GlassSurface width="80vw" />}
      {browser !== "chrome" && (
        <div
          style={{
            width: "80vw",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}
    </motion.div>
  );
};

export default GlassPill;
