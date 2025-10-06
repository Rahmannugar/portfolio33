"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="h-screen w-screen flex flex-col items-center justify-center bg-black fixed top-0 left-0 z-50"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <Image
              src="/33.png"
              alt="33 Logo"
              width={100}
              height={100}
              className="mb-8"
              priority
            />
          </motion.div>

          <motion.div
            className="w-48 h-3 bg-black border border-white overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
