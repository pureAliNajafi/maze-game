import { directions } from "@/config/directions";
import { Stack } from "./stack";
import { pathPrune } from "./mazePathPrune";

export function mazePathFinder(maze: number[][]) {
  const maxRow = maze.length - 1;
  const maxCol = maze[0].length - 1;

  const stack = new Stack();
  const visited: { row: number; col: number }[] = [];

  const start = { row: 0, col: 0 };

  stack.push({ row: start.row, col: start.col, distance: 0 });
  let path = [];

  while (!stack.isEmpty()) {
    const current = stack.pop();
    path.push([current.row, current.col]);

    if (current.row == maxRow && current.col == maxCol) {
      console.log(path);
      const prunedPath = pathPrune(path);
      return prunedPath;
    }
    visited.push({ row: current.row, col: current.col });

    directions
      .map((d) => d.direction)
      .forEach(([dr, dc]) => {
        const newR = current.row + dr; // the new row index
        const newC = current.col + dc;

        newR >= 0 &&
          newR <= maxRow &&
          newC >= 0 &&
          newC <= maxCol &&
          maze[newR][newC] !== 1 &&
          !visited.some((v) => v.row === newR && v.col === newC) &&
          // getting nearest to end
          ((newR === maxRow && newC === maxCol) || current.distance + 1 <= newR * newC) &&
          stack.push({ row: newR, col: newC, distance: current.distance + 1 });
      });
  }
  console.log("No exit found");
}
