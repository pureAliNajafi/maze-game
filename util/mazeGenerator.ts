import { Difficulty } from "@/types";
import { mazePathFinder } from "./mazePathFinder";

export function mazeGenerator(difficulty: Difficulty) {
  let rowNum = 0,
    colNum = 0;
  const r = (Math.random() * 3) | 0;

  difficulty === "nov" ? ([rowNum, colNum] = [7, 7 + r]) : ([rowNum, colNum] = [14, 14 + r]);

  const maze = Array.from({ length: rowNum }, () => Array.from({ length: colNum }, () => 0));
  while (true) {
    for (let r = 0; r < rowNum; r++)
      for (let c = 0; c < colNum; c++) {
        if (r == 0 && c == 0) continue;
        maze[r][c] = Math.round(Math.random());
      }

    if (mazePathFinder(maze)?.length !== undefined) return maze;
  }
}
