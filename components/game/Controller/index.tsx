import React from "react";
import ButtonController from "./ButtonController";
import KeyBoardController from "./KeyBoardController";
import SwipeController from "./SwipeController";

export interface ControllerProps {
  setDirection: (direction: string) => void;
  availableMoves: string[];
  controll: boolean;
}
function Controller({ setDirection, availableMoves, controll }: ControllerProps) {
  return (
    <>
      <KeyBoardController
        setDirection={setDirection}
        availableMoves={availableMoves}
        controll={controll}
      />
      <ButtonController
        setDirection={setDirection}
        availableMoves={availableMoves}
        controll={controll}
      />
      {/* when maze solved,it won't be able to move */}
      {!controll && (
        <SwipeController
          setDirection={setDirection}
          availableMoves={availableMoves}
          controll={controll}
        />
      )}
    </>
  );
}

export default Controller;
