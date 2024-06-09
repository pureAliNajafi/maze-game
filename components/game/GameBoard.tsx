import { CurrentLocation, Difficulty } from "@/types";
import React, { useEffect } from "react";
import Arrow from "./Arrow";
import { directions } from "@/config/directions";
import { motion, AnimatePresence } from "framer-motion";
import { RiFlag2Fill } from "react-icons/ri";
import { BsX } from "react-icons/bs";
import { motionProps } from "@/config/motion";
import ExpAnimation from "./ExpAnimation";
interface GameBoardProps {
  maze: number[][]; // 2D array representing the game board
  currentLocation: CurrentLocation;
  started: boolean;
  solved: boolean; // whether the game has ended
  showSolutionPath: boolean;
  solutionPath: any;
  currentDifficulty: Difficulty;
}
const GameBoard = ({
  maze,
  currentLocation,
  started,
  solved,
  showSolutionPath,
  solutionPath,
  currentDifficulty,
}: GameBoardProps) => {
  const findDeg = (dr: number, dc: number): number => {
    const currentIndex = solutionPath.findIndex((s: number[]) => s[0] == dr && s[1] == dc);
    if (
      solutionPath[currentIndex + 1] !== undefined &&
      solutionPath[currentIndex + 1][1] !== undefined
    ) {
      const degObj = directions.find(
        (d) =>
          d.direction[0] == solutionPath[currentIndex + 1][0] - solutionPath[currentIndex][0] &&
          d.direction[1] == solutionPath[currentIndex + 1][1] - solutionPath[currentIndex][1]
      );
      if (degObj) return degObj.deg;
    }
    return -1;
  };
  return (
    <>
      <div className=" my-2 w-[320px] relative z-20 overflow-x-auto aspect-square  bg-block dark:bg-dark-block flex items-center justify-center ">
        <motion.ul className="w-[280px] overflow-hidden flex items-start flex-wrap /gap-[1px]">
          {maze.map((row, rowIndex) =>
            row.map((col: number, colIndex: number) => (
              <motion.li
                key={`${rowIndex}-${colIndex}`}
                // style={{ width: cellSize + "px" }}
                style={{ width: 280 / maze[0].length + "px" }}
                className={`aspect-square flex items-center justify-center 
            ${
              col === 0
                ? rowIndex === currentLocation.row && colIndex === currentLocation.col
                  ? solved
                    ? "bg-emerald-500 dark:bg-emerald-600 "
                    : "bg-yellow-400 dark:bg-yellow-500"
                  : "bg-available dark:bg-dark-available /0"
                : "/bg-[#a6a6a8] /dark:bg-[#343a40] /1"
            }
             duration-200`}
              >
                <ExpAnimation
                  started={started}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  currentDifficulty={currentDifficulty}
                />

                {rowIndex == maze.length - 1 && colIndex == maze[0].length - 1 && (
                  <span className="w-full h-full flex items-center justify-center">
                    <RiFlag2Fill size={18} />
                  </span>
                )}
                <AnimatePresence>
                  {/*Solution Path Arrows */}
                  {showSolutionPath &&
                    solutionPath
                      .slice(0, -1) //dont want deg of last arrow
                      .some((s: any) => s[0] === rowIndex && s[1] === colIndex) && (
                      <motion.span {...motionProps()}>
                        {findDeg(rowIndex, colIndex) === -1 ? (
                          <BsX size={16} />
                        ) : (
                          <Arrow rotate={findDeg(rowIndex, colIndex)} />
                        )}
                      </motion.span>
                    )}
                </AnimatePresence>
              </motion.li>
            ))
          )}
        </motion.ul>
      </div>
    </>
  );
};

export default GameBoard;
