import Head from "next/head";
// import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Footer,
  NavbarHead,
  Hero,
  About,
  Features,
  Sponsor,
} from "@/components";
import { AppShell, ScrollArea } from "@mantine/core";

// const inter = Inter({ subsets: ["latin"] });

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
