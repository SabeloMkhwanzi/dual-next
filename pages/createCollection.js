import React from "react";
import Head from "next/head";
import { NavbarHead, Footer, CreateACollection } from "@/components";
import { AppShell, ScrollArea } from "@mantine/core";

export default function createCollection() {
  return (
    <>
      <Head>
        <title>Create Collection - A GameFi Social Platform</title>
        <meta
          name="description"
          content="Dedicated to empowering gamers to trade their collections on the decentralized Filecoin network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell header={<NavbarHead />} footer={<Footer />}>
        <ScrollArea>
          <CreateACollection />
        </ScrollArea>
      </AppShell>
    </>
  );
}
