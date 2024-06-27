import React from "react";
import ButtonController from "./ButtonController";
import KeyBoardController from "./KeyBoardController";
import SwipeController from "./SwipeController";

interface ControllerProps {
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
      {!controll && <SwipeController setDirection={setDirection} controll={controll} />}
    </>
  );
}

export default Controller;
