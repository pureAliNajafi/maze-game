import { motionProps } from "@/config/motion";
import { Difficulty } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type Props = {
  started: boolean;
  rowIndex: number;
  colIndex: number;
  currentDifficulty: Difficulty;
};

const ExpAnimation = ({ started, rowIndex, colIndex, currentDifficulty }: Props) => {
  const duration = ((rowIndex + 1) * (colIndex + 1)) / 9;

  return (
    <AnimatePresence>
      {started && currentDifficulty === "exp" && (
        <motion.span
          className="w-full h-full bg-[#a6a6a8] dark:bg-[#343a40]"
          {...motionProps()}
          transition={{
            duration,
            ease: "easeOut",
          }}
          // exit={{
          //   ...motionPropsObj.exit,
          //   transition: { duration, ease: "easeOut" },
          // }}
          exit={{
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            rotate: 0,
            scale: 0,
            opacity: 0,
            transition: { ease: "easeOut", duration },
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default ExpAnimation;
