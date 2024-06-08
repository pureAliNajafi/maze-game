import { Code } from "@nextui-org/code";
import React from "react";

type Props = {
  safeMoves: string[];
};

export const AvailableMoves = ({ safeMoves }: Props) => {
  return (
    <div className="my-1 /h-[28px] gap-1 flex justify-center flex-wrap">
      {safeMoves.map((move, index) => (
        <Code key={index} color={"success"}>
          {move}
        </Code>
      ))}
    </div>
  );
};
