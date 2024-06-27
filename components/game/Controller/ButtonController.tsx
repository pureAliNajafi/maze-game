"use client";
import React from "react";
import { useState, useEffect } from "react";
import Arrow from "../Arrow";
import { Button } from "@nextui-org/button";
import { directions } from "@/config/directions";
interface ButtonControllerProps {
  setDirection: (direction: string) => void;
  availableMoves: string[];
  controll: boolean;
}
function ButtonController({ setDirection, availableMoves, controll }: ButtonControllerProps) {
  // const [direction, setDirection] = useState<string | null>(null);

  useEffect(() => {}, [controll]);
  /// get from parent

  return (
    <>
      <div className="relative z-40 bg-[#d4d4d8] dark:bg-[#3f3f46] duration-250">
        <ul className="w-[90px] short:w-[100px] tall:w-[110px] landscape:w-[120px] res-controller bg-opacity-25 aspect-square flex items-start flex-wrap origin-bottom ">
          {directions.map((item) =>
            item.label == "stay" ? (
              <li
                key={item.label}
                className="w-1/3 aspect-square  flex items-center justify-center"
              >
                <Button
                  isDisabled={controll}
                  className="min-w-0 max-w-full gap-0 p-0 m-0 rounded-none w-full h-full flex items-center justify-center"
                />
              </li>
            ) : (
              <li key={item.label} className={`w-1/3 aspect-square  duration-200`}>
                <Button
                  isDisabled={controll}
                  onClick={() => setDirection(item.label)}
                  className={`min-w-0 max-w-full gap-0 p-0 m-0 rounded-none w-full h-full flex items-center justify-center ${
                    availableMoves.some((move) => move == item.label)
                      ? "text-emerald-700 dark:text-emerald-500 scale-[1.2]"
                      : ""
                  }`}
                >
                  <Arrow rotate={item.deg} />
                </Button>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}

export default ButtonController;
