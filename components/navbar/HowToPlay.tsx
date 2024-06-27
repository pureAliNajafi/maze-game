"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Kbd,
} from "@nextui-org/react";
import { MdQuestionMark } from "react-icons/md";
import { RiFlag2Fill } from "react-icons/ri";
import { SlGameController } from "react-icons/sl";
import Image from "next/image";
import { directions } from "@/config/directions";
import Arrow from "../game/Arrow";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";

export default function HowToPlay() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const availableMoves = ["left", "right", "down_right"];
  return (
    <>
      <button
        className="text-default-500 h-[30px] aspect-square relative hover:brightness-[0.8] duration-200"
        type="button"
        onClick={onOpen}
      >
        <SlGameController size={24} className="absolute top-0 left-0" />
        <MdQuestionMark size={16} className="absolute bottom-0 right-0" />
      </button>
      <Modal
        className="rounded-none max-h-[70dvh] /overflow-y-auto"
        size="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="res:bg-red-400 text-2xl flex flex-col gap-1">
                How To Play?
              </ModalHeader>
              <ModalBody className="py-0 pt-[8px] animate-scrollable [&>p]:text-gray-700 [&>p]:dark:text-gray-200">
                <h3 className="text-xl font-bold">
                  Hey there! Ready to challenge your brain? Let’s dive into this tutorial.{" "}
                </h3>
                <br />
                <h3 className="text-xl font-semibold">Game Goal:</h3>
                <p>
                  In this game, you control the yellow cell [
                  <span className="inline-block align-middle mx-1 w-4 aspect-square bg-yellow-400 dark:bg-yellow-500" />
                  ] . Your mission is to navigate through the maze and reach the flag [
                  <span className="inline-block align-middle mx-1 w-4 aspect-square">
                    <RiFlag2Fill size={18} />
                  </span>
                  ] . Move on the available cells [
                  <span className="inline-block align-middle mx-1 w-4 aspect-square bg-available dark:bg-dark-available" />
                  ] and avoid the block cells [
                  <span className="inline-block align-middle mx-1 w-4 aspect-square bg-block dark:bg-dark-block" />
                  ] .
                </p>
                <br />
                <h3 className="text-xl font-semibold">Game Controlls:</h3>
                <p>
                  The green arrows below show the directions you can move without hitting a block.
                  Simply click on a direction to move your cell.
                </p>
                <div className="flex justify-center">
                  <ul className="bg-gray-300 bg-opacity-25  w-[100px] aspect-square flex items-start flex-wrap">
                    {directions.map((item) => {
                      const isAvailable = availableMoves.some((move) => move == item.label);
                      return item.label == "stay" ? (
                        <li
                          key={item.label}
                          className="w-1/3 aspect-square  flex items-center justify-center"
                        >
                          <Button className="min-w-0 max-w-full gap-0 p-0 m-0 rounded-none w-full h-full flex items-center justify-center" />
                        </li>
                      ) : (
                        <li key={item.label} className={`w-1/3 aspect-square  duration-200`}>
                          <Button
                            className={`min-w-0 max-w-full gap-0 p-0 m-0 rounded-none w-full h-full flex items-center justify-center ${
                              isAvailable
                                ? "text-emerald-700 dark:text-emerald-500 scale-[1.2]"
                                : ""
                            }`}
                          >
                            <Arrow rotate={item.deg} />
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <br />
                <p>You can also use the keyboard arrow keys to move around.</p>
                <p>
                  <span className="font-semibold">Note: </span>Holding two arrow keys at once will
                  move you diagonally{" "}
                </p>
                <ul className="flex items-center justify-evenly">
                  <li>
                    <Kbd className="px-2 pb-[1px]">↓</Kbd> + <Kbd className="pb-[1px]">→</Kbd>
                  </li>
                  <li>equals to</li>
                  <li className="w-[33.33px] aspect-square">
                    <Button
                      className={` min-w-0 max-w-full gap-0 p-0 m-0 rounded-none w-full h-full flex items-center justify-center `}
                    >
                      <Arrow rotate={-225} />
                    </Button>
                  </li>
                </ul>
                <p>
                  also you can just press <Kbd className="px-2 pb-[1px]">Enter</Kbd> Once you finish
                  the maze.
                </p>
                <br />
                <h3 className="text-xl font-semibold">Cool Features:</h3>
                <ul className="list-disc list-inside">
                  <li className="mb-2">
                    Change the difficulty level by tapping on the difficulty you want and see how
                    many mazes you've solved.
                  </li>
                  <li>
                    Use the buttons under the game board to view the solution path, restart the
                    maze, or move to the next maze once you’ve solved it.{" "}
                  </li>
                </ul>
                <br />
                <h3 className="font-semibold">Final Words:</h3>
                <p>
                  I hope you enjoy playing this game as much as I enjoyed making it! Have fun! ♥
                </p>
                <div className="text-center">
                  {" "}
                  <Link isExternal href={siteConfig.links.linkedin} aria-label="linkedin">
                    (￣▽￣)"
                  </Link>
                </div>
                {/* kdb svg */}
              </ModalBody>
              <ModalFooter>
                {/*<Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
