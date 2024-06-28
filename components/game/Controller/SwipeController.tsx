"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, PanInfo, motion, useDragControls } from "framer-motion";
import { directions as dirs } from "@/config/directions";
import { ControllerProps } from ".";
import { dir } from "console";

const directions = dirs.filter((d) => d.label !== "stay");

const SwipeController = ({ setDirection, availableMoves, controll }: ControllerProps) => {
  const [isGoodToGO, setIsGoodToGO] = useState(false);
  const degCalculator = (x: number, y: number) => {
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    x < 0 ? (deg += 180) : y < 0 && (deg += 360); // this line ... 🙂
    return -deg;
  };
  const goDirection = (x: number, y: number, hoverIsSafe = false) => {
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
    /// just want the boolean value
    if (hoverIsSafe) return availableMoves.some((m) => m === dir);
    setDirection(dir);
  };

  ///////////

  useEffect(() => {
    goDirection;
  }, []);
  /////////
  ///////
  /////
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(1);
  const [startY, setStartY] = useState(1);

  const [currentX, setCurrentX] = useState(startX);
  const [currentY, setCurrentY] = useState(startY);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDrawing(true);
    setCurrentX(event.clientX);
    setCurrentY(event.clientY);
    setStartX(event.clientX);
    setStartY(event.clientY);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    setIsDrawing(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDrawing) {
      setCurrentX(event.clientX);
      setCurrentY(event.clientY);
    }
  };
  const [dirIsSafe, setDirIsSafe] = useState(false);
  useEffect(() => {
    const check = goDirection(currentX - startX, -(currentY - startY), true);
    setDirIsSafe(check ? check : false);
    console.log(dirIsSafe);
  }, [currentX, currentY, startX, startY]);

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
        className="cursor-move z-[6] absolute top-0 left-0 w-full h-full"
      >
        <motion.div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
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
            className="w-full h-full absolute left-0 top-0 z-[5]"
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
/* 

"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, PanInfo, motion, useDragControls } from "framer-motion";
import { directions as dirs } from "@/config/directions";
interface SwipeControllerProps {
  setDirection: (direction: string) => void;
  controll: boolean;
}
const directions = dirs.filter((d) => d.label !== "stay");

const SwipeController = ({ setDirection, controll }: SwipeControllerProps) => {
  const [isGoodToGO,setIsGoodToGO]=useState()
  const degCalculator = (x: number, y: number) => {
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    x < 0 ? (deg += 180) : y < 0 && (deg += 360); // this line ... 🙂
    return -deg;
  };
  const goDirection = (x: number, y: number) => {
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
  ///////////
  /////////
  ///////
  /////
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(1);
  const [startY, setStartY] = useState(1);

  const [currentX, setCurrentX] = useState(startX);
  const [currentY, setCurrentY] = useState(startY);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDrawing(true);
    setCurrentX(event.clientX);
    setCurrentY(event.clientY);
    setStartX(event.clientX);
    setStartY(event.clientY);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    setIsDrawing(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDrawing) {
      setCurrentX(event.clientX);
      setCurrentY(event.clientY);
    }
  };

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
        className="cursor-move z-[6] absolute top-0 left-0 w-full h-full"
      >
        <motion.div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
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
            className="w-full h-full absolute left-0 top-0 z-[5]"
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

            <g fill="lime" stroke="#cccccc" strokeWidth={3}>
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

*/
