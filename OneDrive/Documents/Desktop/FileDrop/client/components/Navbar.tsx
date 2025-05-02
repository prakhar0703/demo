import React from "react";
import ThemeBtn from "./ThemeBtn";
import { GithubIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import fastDropDark from "../public/fastdrop.png"
import fastDropLight from "../public/fastdroplight.png"
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-center">
      <div className="flex border font-extrabold text-[24px] px-3 py-1 m-2 rounded-lg w-full items-center justify-between">
        <div className="flex justify-center items-center">
          <Image className="h-12 w-12 p-0 rotate-90 scale-0 hidden dark:flex dark:scale-100" src={fastDropLight} alt="peerlink"/>
          <Image className="h-12 w-12 p-0 rotate-90 scale-100 flex dark:scale-0 dark:hidden" src={fastDropDark} alt="peerlink"/>
          PeerLink
        </div>
        <div className="flex gap-x-2">
          <ThemeBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
