import { motionProps } from "@/config/motion";
import { motion, AnimatePresence, easeIn } from "framer-motion";
import React from "react";

const Counter = ({ solvedCounts }: { solvedCounts: number }) => {
  return (
    <span className="inline-block relative z-40 flex-1">
      <AnimatePresence>
        {solvedCounts % 2 != 0 && (
          <motion.span
            className="absolute right-0 -top-1/2 "
            {...motionProps()}
            animate={{ x: 0, y: "-50%", scale: 1, rotate: 360, opacity: 1 }}
          >
            {solvedCounts}
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {solvedCounts % 2 == 0 && (
          <motion.span
            className="absolute right-0 -top-1/2 "
            {...motionProps()}
            animate={{ x: 0, y: "-50%", scale: 1, rotate: 360, opacity: 1 }}
          >
            {solvedCounts}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Counter;
