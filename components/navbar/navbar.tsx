import { Navbar as NextUINavbar } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";

import { TiSocialLinkedinCircular } from "react-icons/ti";
import HowToPlay from "./HowToPlay";
import InstallButton from "./InstallButton";
import SwipeMode from "./SwipeMode";

export const Navbar = () => {
  return (
    <NextUINavbar
      maxWidth="lg"
      position="sticky"
      className="z-50 bg-none duration-0 bg-background/0"
    >
      <ul className="w-full flex justify-between items-center">
        <li className="flex gap-x-4">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <InstallButton />
        </li>
        <li className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ThemeSwitch />
        </li>
        <li className="flex gap-x-5">
          <SwipeMode />
          <HowToPlay />
        </li>
      </ul>
    </NextUINavbar>
  );
};
/* 		<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch /> */
