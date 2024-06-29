"use client";

import { FC, useEffect, useState } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { MoonFilledIcon, SunFilledIcon } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { motionDarkMode } from "@/config/motion";
import { reverse } from "dns";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className, classNames }) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
              "overflow-visible",
            ],
            classNames?.wrapper
          ),
        })}
      >
        {/* {!isSelected || isSSR ? <SunFilledIcon size={30} /> : <MoonFilledIcon size={30} />} */}
        <div className="w-[30px] h-[30px] relative z-50">
          <AnimatePresence>
            {(!isSelected || isSSR) && (
              <motion.span className="absolute left-0 top-0 /origin-[0px_50px]" {...motionDarkMode}>
                <SunFilledIcon size={30} />
              </motion.span>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!(!isSelected || isSSR) && (
              <motion.span className="absolute left-0 top-0 /origin-[0px_50px]" {...motionDarkMode}>
                <MoonFilledIcon size={30} />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Component>
  );
};
