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
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import { MdQuestionMark } from "react-icons/md";
import { RiFlag2Fill } from "react-icons/ri";
import { SlGameController } from "react-icons/sl";
import Image from "next/image";
import { directions } from "@/config/directions";
import Arrow from "../game/Arrow";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";
import { PiHandSwipeRightDuotone } from "react-icons/pi";
const GuideArrow = ({ deg }: { deg: number }) => {
  return (
    <span
      className={`inline-block `}
      style={{ transform: `rotate(${deg}deg) translateY(${deg == 180 ? "-2" : "0"}px)` }}
    >
      →
    </span>
  );
};
export default function HowToPlay() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const availableMoves = ["left", "right", "down_right"];
  return (
    <>
      <button
        className="relative z-50 text-default-500 h-[30px] aspect-square hover:brightness-[0.8] duration-200"
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
                  Unleash your inner genius! Let's Dive into this tutorial and get ready to solve
                  your way to victory!{" "}
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
                <h3 className="text-xl font-semibold">Game Navigation Controlls:</h3>
                <Tabs aria-label="Options" radius="none">
                  <Tab title="Swipe">
                    <Card radius="none">
                      <CardBody>
                        <p>
                          Swipe your finger in any direction (
                          {[270, 90, 0, 180].map((d, index) => (
                            <>
                              <GuideArrow deg={d} key={d} />
                              {` ${index !== 3 ? "," : " "} `}
                            </>
                          ))}
                          and also
                          {[-45, 45, 135, -135].map((d, index) => (
                            <>
                              <GuideArrow deg={d} key={d} />
                              {` ${index !== 3 ? "," : " "} `}
                            </>
                          ))}
                          ) to move.
                        </p>
                        <div>
                          <br />
                          <p>
                            Note that the swipe light system is as follows: if the line lights are{" "}
                            <svg className="inline-block" width={20} height={20}>
                              <circle
                                cx={7}
                                cy={10}
                                r="5"
                                strokeWidth={3}
                                className="fill-red-400 stroke-dark-available"
                              />
                            </svg>
                            , it means that direction is blocked and you cannot move towards it. If
                            the lights are{" "}
                            <svg className="inline-block" width={20} height={20}>
                              <circle
                                cx={7}
                                cy={10}
                                r="5"
                                strokeWidth={3}
                                className="fill-green-500 stroke-dark-available"
                              />
                            </svg>
                            , it means it's clear to move in that direction.
                          </p>
                          <div></div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab title="Click">
                    <Card radius="none">
                      <CardBody>
                        <p>
                          If you prefer not to swipe and instead want to navigate by clicking, you
                          can turn off swipe mode from the bar menu ({" "}
                          <div className="inline-block relative w-5 text-primary-500">
                            <PiHandSwipeRightDuotone
                              className="absolute -left-[2px] -top-[17px]"
                              size={22}
                            />
                          </div>{" "}
                          ) and use the click buttons to move and navigate the maze.
                        </p>
                        <br />
                        <p>
                          The green arrows below show the directions you can move without hitting a
                          block. Simply click on a direction to move your cell.
                        </p>
                        <br />
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
                                <li
                                  key={item.label}
                                  className={`w-1/3 aspect-square  duration-200`}
                                >
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
                      </CardBody>{" "}
                    </Card>
                  </Tab>
                  <Tab title="Keyboard">
                    <Card radius="none">
                      <CardBody>
                        <p> Alternatively, you can use the keyboard arrow keys to move around.</p>
                        <br />

                        <p>
                          <span className="font-semibold">Note: </span>Holding two arrow keys at
                          once will move you diagonally{" "}
                        </p>
                        <ul className="flex items-center justify-evenly">
                          <li>
                            <Kbd className="px-2 pb-[1px]">↓</Kbd> +{" "}
                            <Kbd className="pb-[1px]">→</Kbd>
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
                        <br />
                        <p>
                          Also you can just press <Kbd className="px-2 pb-[1px]">Enter</Kbd> Once
                          you finish the maze.
                        </p>
                      </CardBody>{" "}
                    </Card>
                  </Tab>
                </Tabs>

                <h3 className="text-xl font-semibold">Cool Features:</h3>
                <ul className="list-disc list-inside">
                  <li className="mb-2">
                    Change the difficulty level by tapping on the difficulty you want and also see
                    how many mazes you've solved.
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
