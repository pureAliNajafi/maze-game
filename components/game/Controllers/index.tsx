import React from "react";
import ButtonController from "./ButtonController";
import KeyBoardController from "./KeyBoardController";
import SwipeController from "./SwipeController";
import { useSelector } from "react-redux";
import { RootState } from "@/config/redux/store";
import { AvailableMoves, Controll, ControllersProps } from "@/types";

function Controllers({ setDirection, availableMoves, controll }: ControllersProps) {
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

export default Controllers;
