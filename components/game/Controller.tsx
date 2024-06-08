"use client";
import React from "react";
import { useState, useEffect } from "react";
import Arrow from "./Arrow";
import { Button } from "@nextui-org/button";
import { directions } from "@/config/directions";
interface ControllerProps {
  setDirection: (direction: string) => void;
  availableMoves: string[];
  controll: boolean;
}
function Controller({ setDirection, availableMoves, controll }: ControllerProps) {
  const [keys, setKeys] = useState({
    ArrowLeft: false,
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
  });
  // const [direction, setDirection] = useState<string | null>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key in keys) {
        //keys[event.key]
        setKeys((prevKeys) => ({ ...prevKeys, [event.key]: true }));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key in keys) {
        setKeys((prevKeys) => ({ ...prevKeys, [event.key]: false }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keys]);

  useEffect(() => {
    const checkDirection = () => {
      if (keys["ArrowUp"] && keys["ArrowRight"]) {
        setDirection("up_right");
      } else if (keys["ArrowUp"] && keys["ArrowLeft"]) {
        setDirection("up_left");
      } else if (keys["ArrowDown"] && keys["ArrowRight"]) {
        setDirection("down_right");
      } else if (keys["ArrowDown"] && keys["ArrowLeft"]) {
        setDirection("down_left");
      } else if (keys["ArrowUp"]) {
        setDirection("up");
      } else if (keys["ArrowRight"]) {
        setDirection("right");
      } else if (keys["ArrowDown"]) {
        setDirection("down");
      } else if (keys["ArrowLeft"]) {
        setDirection("left");
      }
    };

    !controll && checkDirection();
  }, [keys, setDirection, controll]);
  /// get from parent

  return (
    <div

    // className="fixed bottom-[40px] right-[25px] z-30 duration-200"
    >
      <ul className="bg-gray-300 bg-opacity-25  w-[100px] aspect-square flex items-start flex-wrap fixed bottom-[50px] left-1/2 -translate-x-1/2 ">
        {directions.map((item) =>
          item.label == "stay" ? (
            <li key={item.label} className="w-1/3 aspect-square  flex items-center justify-center">
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
  );
}

export default Controller;
