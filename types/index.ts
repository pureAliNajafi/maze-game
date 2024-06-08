import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type CurrentLocation = {
  row: number;
  col: number;
};
export interface Directions {
  label: string;
  direction: number[];
  deg: number;
}
export type Difficulty = "nov" | "mid" | "exp";

export type SolvedCounts = {
  nov: number;
  mid: number;
  exp: number;
};
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}
