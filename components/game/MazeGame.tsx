"use client";
import { useEffect, useMemo, useState } from "react";
import GameBoard from "@/components/game/GameBoard";
import { directions } from "@/config/directions";
import Controllers from "@/components/game/Controllers";
import { mazePathFinder } from "@/util/mazePathFinder";
import Actions from "./Actions";
import Progress from "./Progress";
import { AvailableMoves, CurrentLocation, Difficulty, SolvedCounts } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/config/redux/store";
import { incrementSolvedCount } from "@/config/redux/slices/solvedCountsSlice";
import { mazeGenerator } from "@/util/mazeGenerator";

export default function MazeGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("nov");
  const [maze, setMaze] = useState<number[][]>(mazeGenerator("nov"));
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>({ row: 0, col: 0 });
  const [availableMoves, setAvailableMoves] = useState<AvailableMoves>([]);
  const [direction, setDirection] = useState<string>("stay");
  const [isNewMaze, setIsNewMaze] = useState<boolean>(true);
  const [started, setStarted] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const [showSolutionPath, setShowSolutionPath] = useState<boolean>(false);

  const memoizedSolutionPath = useMemo(() => {
    // caching the solution path to avoid re-rendering the component when maze is being solved
    return mazePathFinder(maze);
  }, [maze]);
  const solutionPath = memoizedSolutionPath;

  const dispatch = useDispatch();
  const solvedCounts = useSelector((state: RootState) => state.solvedCounts);

  const isMazeSolved = (): boolean => {
    if (currentLocation.row == maze.length - 1 && currentLocation.col == maze[0].length - 1) {
      setSolved(true);
      return true;
    } else {
      setSolved(false);
      return false;
    }
  };
  const isCellValid = (row: number, col: number): boolean => {
    return !(maze[row] == undefined || maze[row][col] == undefined || maze[row][col] == 1);
  };
  const isValidMove = (row: number, col: number) => {
    isMazeSolved();

    const newRow = currentLocation.row + row;
    const newCellIndex = currentLocation.col + col;

    return isCellValid(newRow, newCellIndex);
  };

  // const applyMove = (r:number,c:number) => {
  const applyMove = (rowMove: number, colMove: number) => {
    if (isValidMove(rowMove, colMove)) {
      const { row, col } = currentLocation;
      const newRow = row + rowMove;
      const newCol = col + colMove;
      setCurrentLocation({ row: newRow, col: newCol });

      setDirection("stay");
    }
  };

  useEffect(() => {
    setStarted(!(currentLocation.row === 0 && currentLocation.col === 0));
  }, [currentLocation]);

  useEffect(() => {
    const directionObject = directions.find((d) => d.label === direction);
    directionObject && applyMove(directionObject.direction[0], directionObject.direction[1]);
    setAvailableMoves(
      directions.filter((d) => isValidMove(d.direction[0], d.direction[1])).map((d) => d.label)
    );
  }, [maze, started, direction, solved]);

  useEffect(() => {
    isNewMaze && solved && dispatch(incrementSolvedCount(difficulty));
  }, [isNewMaze, solved]);

  return (
    <section className="w-full h-[calc(100dvh-100px)] lg:h-[calc(100dvh-120px)]  flex flex-col /justify-between justify-around items-center landscape:flex-row">
      <div className="/relative /z-[60] /scale-[0.7]  origin-top /average:scale-[1] average:mt-2 ">
        <div className=" pt-1 pb-2 dark:text-[#a6a6a8] text-[#343a40] flex justify-between items-center">
          <Progress
            solvedCounts={solvedCounts}
            currentDifficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </div>
        <GameBoard
          maze={maze}
          currentLocation={currentLocation}
          currentDifficulty={difficulty}
          solutionPath={solutionPath}
          showSolutionPath={showSolutionPath}
          started={started}
          solved={solved}
        />
        <Actions
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          solved={solved}
          setSolved={setSolved}
          showSolutionPath={showSolutionPath}
          setShowSolutionPath={setShowSolutionPath}
          setIsNewMaze={setIsNewMaze}
          difficulty={difficulty}
          setMaze={setMaze}
        />
      </div>
      <Controllers setDirection={setDirection} availableMoves={availableMoves} controll={solved} />
    </section>
  );
}
