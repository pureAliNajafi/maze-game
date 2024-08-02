"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, PanInfo, motion, useDragControls } from "framer-motion";
import { directions as dirs } from "@/config/directions";
import { dir } from "console";
import { ControllersProps } from "@/types";

const directions = dirs.filter((d) => d.label !== "stay");

const degCalculator = (x: number, y: number) => {
  let deg = (Math.atan(y / x) * 180) / Math.PI;
  x < 0 ? (deg += 180) : y < 0 && (deg += 360); // this line ... 🙂
  return -deg;
};

const SwipeController = ({ setDirection, availableMoves }: ControllersProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(1);
  const [startY, setStartY] = useState(1);
  const [currentX, setCurrentX] = useState(startX);
  const [currentY, setCurrentY] = useState(startY);
  const [dirIsSafe, setDirIsSafe] = useState(false);
  const goDirection = (x: number, y: number, dirIsSafe = false) => {
    const deg = degCalculator(x, y);
    let dir = "stay";
    // console.log(deg, Math.abs(deg));
    if (Math.abs(deg) > 337.5) {
      dir = "right"; // between -337.5 and 0
    } else {
      const closestDirectionObj = directions.find((d) => Math.abs(d.deg - deg) <= 22.5);
      let closestDirection = closestDirectionObj?.label;
      dir = closestDirection ? closestDirection : "stay";
    }

    const isAvailable = availableMoves.some((m) => m === dir);
    if (isAvailable) {
      if (dirIsSafe) return isAvailable;
      setDirection(dir);
    }
  };

  const handleOnMouseDown = (event: React.MouseEvent) => {
    setIsDrawing(true);
    setCurrentX(event.clientX);
    setCurrentY(event.clientY);
    setStartX(event.clientX);
    setStartY(event.clientY);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setIsDrawing(true);
    const touch = event.touches[0];
    setCurrentX(touch.clientX);
    setCurrentY(touch.clientY);
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const handleUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDrawing) {
      setCurrentX(event.clientX);
      setCurrentY(event.clientY);
    }
  };
  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (isDrawing) {
      setCurrentX(touch.clientX);
      setCurrentY(touch.clientY);
    }
  };
  useEffect(() => {
    const check = goDirection(currentX - startX, -(currentY - startY), true);
    setDirIsSafe(check ? check : false);
    // console.log(dirIsSafe);
    console.log(currentX);
  }, [currentX, currentY, startX, startY]);
  const [z, setZ] = useState(45);
  return (
    <>
      <motion.div
        dragSnapToOrigin
        drag
        dragControls={useDragControls()}
        dragElastic={1}
        onDragEnd={(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
          goDirection(info.offset.x, -info.offset.y);
        }}
        onMouseDown={() => setZ(1000)}
        onTouchStart={() => setZ(1000)}
        onMouseUp={() => setZ(40)}
        onTouchEnd={() => setZ(40)}
        style={{ zIndex: z }}
        className="/bg-red-500 cursor-move /z-[45] absolute top-0 left-0 w-full h-full"
      >
        <motion.div
          onMouseDown={handleOnMouseDown}
          onTouchStart={handleTouchStart}
          //
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          //

          onMouseUp={handleUp}
          onTouchEnd={handleUp}
          className="w-full h-full"
        ></motion.div>
      </motion.div>
      <AnimatePresence>
        {isDrawing ? (
          <motion.svg
            initial={{}}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { ease: "easeOut", duration: 0.3 },
            }}
            style={{ zIndex: z - 20 }}
            className="w-full h-full absolute left-0 top-0 /z-[44]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.line
              x1={startX}
              y1={startY}
              x2={currentX}
              y2={currentY}
              stroke="#cccccc"
              strokeWidth="5"
            />

            <g
              className={`${
                dirIsSafe ? "fill-green-500 " : "fill-red-400"
              } stroke-dark-available  duration-200`}
              // /* fill={`${dirIsSafe ? "lime" : "red"}`} */ stroke="#cecece"
              strokeWidth={3}
            >
              <circle cx={startX} cy={startY} r="5" />
              <circle cx={currentX} cy={currentY} r="5" />
            </g>
          </motion.svg>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default SwipeController;
