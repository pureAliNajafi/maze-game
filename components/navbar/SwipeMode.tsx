"use client";
import { toggleSwipeMode } from "@/config/redux/slices/swipeModeSlice";
import { RootState } from "@/config/redux/store";
import React from "react";
import { PiHandSwipeRight, PiHandSwipeRightDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const SwipeMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.swipeMode);
  const handleSwitchMode = () => {
    dispatch(toggleSwipeMode());
  };
  return (
    <div onClick={handleSwitchMode} className="cursor-pointer text-default-500 text-[28px]">
      {mode ? (
        <div className="text-primary-500">
          <PiHandSwipeRightDuotone />{" "}
        </div>
      ) : (
        <div className="">
          <PiHandSwipeRight />
        </div>
      )}
    </div>
  );
};

export default SwipeMode;
