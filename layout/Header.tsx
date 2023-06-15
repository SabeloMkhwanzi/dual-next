import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Link from "next/link";

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeToggle } from "../components";

interface IHeader {
  search?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Header({ search }: IHeader) {
  return (
    <header className="flex items-center justify-between w-full h-20 p-4 border-b border-border-light dark:border-border-dark">
      <div className="w-1/3 ">
        <Link href={"/videosHome"}>
          <Image
            src="https://raw.githubusercontent.com/suhailkakar/Decentralized-YouTube/version-1/logo.png"
            alt="Decentralized YouTube"
            width={55}
            height={40}
          />
        </Link>
      </div>
      <div className="flex items-center justify-center w-1/3 ">
        {search ? (
          <input
            type="text"
            onChange={(e) => search(e.target.value)}
            placeholder="Type to search"
            className="bg-transparent border-0 focus:outline-none"
          />
        ) : null}
      </div>

      <div className="flex items-center justify-end w-1/3 ">
        <Link href="/upload">
          <AiOutlinePlusCircle
            size="30px"
            className="mr-8 cursor-pointer fill-icons-light dark:fill-icons-dark"
          />
        </Link>
        <ThemeToggle />
        <div className="ml-10">
          <ConnectButton
            label="Connect Wallet"
            accountStatus="address"
            showBalance={true}
          />
        </div>
      </div>
    </header>
  );
}
