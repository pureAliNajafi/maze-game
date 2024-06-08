import { directions } from "@/config/directions";

export const pathPrune = (path: number[][]): number[][] => {
  /* This function prunes a path by removing leaf nodes, keeping the last point intact.
   * It reduces the path to its main branch, effectively removing unnecessary parts.
   * https://en.wikipedia.org/wiki/Tree_(data_structure) */
  let newPath = [];
  let isLeafNode = false;
  for (let index = 0; index <= path.length - 1; index++) {
    if (isOnMainBranch(path, path[index], index))
      // If a point has more than one neighbor, it's part of the main branch, so add it to the new path.
      newPath.push(path[index]);
    else {
      isLeafNode = true;
      // break;
    }
  }
  if (!isLeafNode) {
    // If no leaf nodes were found, return the original path.
    console.log("pruned", path);
    return pruneDuplicates(path);
  }

  return pathPrune(newPath);
};
const isOnMainBranch = (path: number[][], point: number[], pointIndex: number) => {
  /* Except for the first and last points in the path, if a point is connected to the point thats index is higher than itself that means its on the main branch,
      other than that it means its meants it has only connected to one point that makes it a leafnode . */

  if (
    (point[0] == 0 && point[1] == 0) ||
    (point[0] == path[path.length - 1][0] && point[1] == path[path.length - 1][1])
  )
    return true;

  for (let index = 0; index < directions.length; index++) {
    // checking all Neighbors from all direction
    const neighborIndex = connectedNeighborIndex(path, [
      point[0] + directions[index].direction[0],
      point[1] + directions[index].direction[1],
    ]);
    if (directions[index].label !== "stay" && neighborIndex > pointIndex) return true;
  }
  return false;
};
const connectedNeighborIndex = (path: number[][], point: number[]) => {
  return path.findIndex((path) => path[0] === point[0] && path[1] === point[1]);
};
//
// https://stackoverflow.com/questions/20339466/how-to-remove-duplicates-from-a-two-dimensional-array
function pruneDuplicates(arr: number[][]) {
  var uniques = [];
  var itemsFound = new Map<string, boolean>();
  for (var i = 0, l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i]);
    if (itemsFound.has(stringified)) {
      continue;
    }
    uniques.push(arr[i]);
    itemsFound.set(stringified, true);
  }
  return uniques;
}
