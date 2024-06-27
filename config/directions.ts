// sorting is wierd for mapping the controols arrow well

import { Directions } from "@/types";

const directions: Directions[] = [
  { label: "up_left", direction: [-1, -1], deg: -135 },
  { label: "up", direction: [-1, 0], deg: -90 },
  { label: "up_right", direction: [-1, 1], deg: -45 },
  { label: "left", direction: [0, -1], deg: -180 },
  { label: "stay", direction: [0, 0], deg: -1 },
  { label: "right", direction: [0, 1], deg: 0 },
  { label: "down_left", direction: [1, -1], deg: -225 },
  { label: "down", direction: [1, 0], deg: -270 },
  { label: "down_right", direction: [1, 1], deg: -315 },
];

export { directions };
