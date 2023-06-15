import Head from "next/head";

import { Footer, NavbarHead, Hero, About, Sponsor } from "../components";
import { AppShell, ScrollArea } from "@mantine/core";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dual - GameFi Social Platform</title>
        <meta
          name="description"
          content="Dedicated to empowering gamers to trade their collections on the decentralized Filecoin network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <AppShell header={<NavbarHead />} footer={<Footer />}>
          <ScrollArea>
            <Hero />
            <About />
            <Sponsor />
          </ScrollArea>
        </AppShell>
      </div>
    </>
  );
}
