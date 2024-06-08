import { motion, AnimatePresence, easeIn } from "framer-motion";
import React from "react";
import Counter from "./Counter";
import { Button } from "@nextui-org/button";
import { Difficulty, SolvedCounts } from "@/types";
import { Popover, PopoverTrigger } from "@nextui-org/react";
// interface SolvedCounts {
//   [key: string]: number;
// }

const Progress = ({
  solvedCounts,
  currentDifficulty,
  setDifficulty,
}: {
  solvedCounts: SolvedCounts;
  currentDifficulty: Difficulty;
  setDifficulty: (newDifficulty: Difficulty) => void;
}) => {
  const classNames =
    "overflow-visible z-40 dark:brightness-[0.9]  text-2xl flex-1 flex justify-between items-center min-w-0 rounded-none px-2";
  const difficulties = ["nov", "mid", "exp"] as (keyof typeof solvedCounts)[];

  return (
    <div className="flex gap-2 w-full ">
      {difficulties.map((difficulty) => (
        <Button
          key={difficulty}
          onClick={() => setDifficulty(difficulty)}
          // color={difficulty===currentDifficulty ?currentDifficulty === "nov" ?currentDifficulty === "success" ? difficulty === "mid" ? "warning" ?difficulty ===  "danger":"default"}
          color={
            difficulty == currentDifficulty
              ? difficulty === "nov"
                ? "success"
                : difficulty === "mid"
                ? "warning"
                : "danger"
              : "default"
          }
          className={classNames + (difficulty == currentDifficulty ? " text-[#fffcfd]" : "")}
        >
          <span>{difficulty}.</span>
          <Counter solvedCounts={solvedCounts[difficulty]} />
        </Button>
      ))}
    </div>
  );
};

export default Progress;

/*   return (
    <div className="flex gap-2 w-full">
      {Object.keys(solvedCounts).map((difficulty) => (
        <Button
          key={difficulty}
          onClick={() => setDifficulty(difficulty)}
          color={difficulty === "nov" ? "success" : difficulty === "mid" ? "warning" : "danger"}
          className={classNames}
        >
          <span>{difficulty}.</span>
          <Counter solvedCounts={solvedCounts[difficulty]} />
        </Button>
      ))}
    </div>
  );
};
 */
