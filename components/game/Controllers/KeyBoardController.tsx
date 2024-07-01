"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ControllersProps } from ".";

function KeyBoardController({ setDirection, availableMoves, controll }: ControllersProps) {
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

  return <></>;
}

export default KeyBoardController;
