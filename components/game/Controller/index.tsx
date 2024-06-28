import React from "react";
import ButtonController from "./ButtonController";
import KeyBoardController from "./KeyBoardController";
import SwipeController from "./SwipeController";
import { useSelector } from "react-redux";
import { RootState } from "@/config/redux/store";

export interface ControllerProps {
  setDirection: (direction: string) => void;
  availableMoves: string[];
  controll: boolean;
}
function Controller({ setDirection, availableMoves, controll }: ControllerProps) {
  const swipeMode = useSelector((state: RootState) => state.swipeMode);

  return (
    <>
      <KeyBoardController
        setDirection={setDirection}
        availableMoves={availableMoves}
        controll={controll}
      />
      {!swipeMode ? (
        <ButtonController
          setDirection={setDirection}
          availableMoves={availableMoves}
          controll={controll}
        />
      ) : (
        !controll && (
          <SwipeController
            setDirection={setDirection}
            availableMoves={availableMoves}
            controll={controll}
          />
        )
      )}
    </>
  );
}

export default Controller;
