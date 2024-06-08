// "use client";
import { mazeGenerator } from "@/util/mazeGenerator";
import MazeGame from "@/components/game/MazeGame";
export default function GamePage() {
  const firstMaze = mazeGenerator("nov");

  return <MazeGame firstMaze={firstMaze} />;
}
