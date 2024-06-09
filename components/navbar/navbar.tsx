import { Navbar as NextUINavbar } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";

import { TiSocialLinkedinCircular } from "react-icons/ti";
import HowToPlay from "./HowToPlay";
import InstallButton from "./InstallButton";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="lg" position="sticky" className="bg-none duration-0 bg-background/0">
      <ul className="relative w-full flex justify-between items-center">
        <li className="flex gap-x-4">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.linkedin} aria-label="linkedin">
            <TiSocialLinkedinCircular className="text-default-500" size={30} />
          </Link>
        </li>
        <li className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ThemeSwitch />
        </li>
        <li className="flex gap-x-5">
          <InstallButton />
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
