import { SVGProps } from "react";

export interface IconSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
}
export type CurrentLocation = {
  row: number;
  col: number;
};
export type Directions = {
  label: string;
  direction: number[];
  deg: number;
};
export type Difficulty = "nov" | "mid" | "exp";

export type AvailableMoves = string[];
export type Controll = boolean;

export type ControllersProps = {
  setDirection: (direction: string) => void;
  availableMoves: AvailableMoves;
  controll: boolean;
};
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
