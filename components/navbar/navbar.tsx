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
    // <NextUINavbar maxWidth="lg" position="static" className="bg-none duration-0 bg-background/0">
    <ul className="w-full flex justify-between items-center  max-w-5xl mx-auto relative mt-3 mb-2 px-2">
      <li className="flex gap-x-4">
        <Link
          className="inline-block relative z-50"
          isExternal
          href={siteConfig.links.github}
          aria-label="Github"
        >
          <GithubIcon className="text-default-500" />
        </Link>
        <InstallButton />
      </li>
      <li className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ThemeSwitch />
      </li>
      <li className="flex gap-x-5">
        <SwipeMode />
        <HowToPlay />
      </li>
    </ul>
    // </NextUINavbar>
  );
};
/* 		<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch /> */
