import React from "react";
import Head from "next/head";
import { NavbarHead, Footer } from "../components";
import { AppShell, ScrollArea } from "@mantine/core";
import { HuddleIframe } from "@huddle01/iframe";

export default function huddle01() {
  return (
    <>
      <Head>
        <title>huddle01 Meeting - GameFi Social Platform</title>
        <meta
          name="description"
          content="Dedicated to empowering gamers to trade their collections on the decentralized Filecoin network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell header={<NavbarHead />} footer={<Footer />}>
        <ScrollArea>
          <HuddleIframe
            roomUrl="https://iframe.huddle01.com/"
            className="w-full aspect-video"
          />
        </ScrollArea>
      </AppShell>
    </>
  );
}
