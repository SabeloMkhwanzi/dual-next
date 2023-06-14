import React from "react";
import Head from "next/head";
import { NavbarHead, Footer, GamersPage } from "@/components";
import { AppShell, ScrollArea } from "@mantine/core";

export default function gamerProfile() {
  return (
    <>
      <Head>
        <title>Gamers Profile- GameFi Social Platform</title>
        <meta
          name="description"
          content="Dedicated to empowering gamers to trade their collections on the decentralized Filecoin network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell header={<NavbarHead />} footer={<Footer />}>
        <ScrollArea>
          <GamersPage />
        </ScrollArea>
      </AppShell>
    </>
  );
}
