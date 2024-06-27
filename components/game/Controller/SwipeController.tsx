"use client";
import React, { useState } from "react";
import { PanInfo, motion, useDragControls } from "framer-motion";
import { directions as dirs } from "@/config/directions";
interface SwipeControllerProps {
  setDirection: (direction: string) => void;
  controll: boolean;
}
const directions = dirs.filter((d) => d.label !== "stay");

const SwipeController = ({ setDirection, controll }: SwipeControllerProps) => {
  const degCalculator = (x: number, y: number) => {
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    x < 0 ? (deg += 180) : y < 0 && (deg += 360); // this line ... 🙂
    return -deg;
  };
  const findDirection = (x: number, y: number) => {
    const deg = degCalculator(x, y);
    console.log(deg, Math.abs(deg));
    if (Math.abs(deg) > 337.5) {
      setDirection("right"); // between -337.5 and 0
      return;
    }
    const closestDirectionObj = directions.find((d) => Math.abs(d.deg - deg) <= 22.5);
    let closestDirection = closestDirectionObj?.label;
    setDirection(closestDirection ? closestDirection : "stay");
  };

  return (
    <motion.div
      dragSnapToOrigin
      drag
      dragControls={useDragControls()}
      dragElastic={1}
      onDragEnd={(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // if (Math.abs(info.offset.x) > 75 || Math.abs(info.offset.y) > 75)
        findDirection(info.offset.x, -info.offset.y);
      }}
      className="cursor-move z-[1] absolute top-0 left-0 w-full h-full /bg-yellow-600"
    />
  );
};

export default SwipeController;
