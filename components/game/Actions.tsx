"use client";
import { CurrentLocation, Difficulty } from "@/types";
import { mazeGenerator } from "@/util/mazeGenerator";
import { Button } from "@nextui-org/button";
import React, { useEffect } from "react";
import { GrFormNext } from "react-icons/gr";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { PiPathBold } from "react-icons/pi";
type Props = {
  currentLocation: CurrentLocation;
  setCurrentLocation: (location: { row: number; col: number }) => void;
  setSolved: (solved: boolean) => void;
  showSolutionPath: boolean;
  setShowSolutionPath: (solved: boolean) => void;
  solved: boolean;
  setIsNewMaze: (check: boolean) => void;
  difficulty: Difficulty;
  setMaze: (maze: number[][]) => void;
};

const Actions = ({
  currentLocation,
  setCurrentLocation,
  setSolved,
  showSolutionPath,
  setShowSolutionPath,
  solved,
  setIsNewMaze,
  difficulty,
  setMaze,
}: Props) => {
  const classNames =
    "relative z-50 h-[40px] w-[40px] min-w-0 p-1 bg-emerald-500 dark:bg-emerald-600 text-slate-200 rounded-none";
  const showSolution = () => {
    setShowSolutionPath(!showSolutionPath);
  };

  const startOver = () => {
    //$
    setIsNewMaze(false);
    setSolved(false);
    setShowSolutionPath(false);
    setCurrentLocation({ row: 0, col: 0 });
  };
  const newMaze = () => {
    setMaze(mazeGenerator(difficulty));
    setSolved(false);
    setShowSolutionPath(false);
    setCurrentLocation({ row: 0, col: 0 });
    setIsNewMaze(true);
  };
  useEffect(() => {
    newMaze();
  }, [difficulty]);
  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      event.key == "Enter" && solved && newMaze();
    };
    document.addEventListener("keydown", handleEnter);

    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [solved]);
  return (
    <div className="pt-2 flex justify-between">
      <Button onClick={() => showSolution()} className={classNames}>
        <PiPathBold size={24} />
      </Button>
      <Button
        onClick={() => startOver()}
        isDisabled={currentLocation.row == 0 && currentLocation.col == 0}
        className={classNames}
      >
        <HiMiniArrowPathRoundedSquare size={24} />
      </Button>
      <Button onClick={() => newMaze()} isDisabled={!solved} className={classNames}>
        <GrFormNext size={24} />
      </Button>
    </div>
  );
};

export default Actions;
