import "../styles/globals.css";
import React, { useState, useMemo } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { Notifications } from "@mantine/notifications";
// Rainbowkit wallet
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { filecoin } from "../constants/fil";
import { PushSupportChat } from "../components";

const { chains, provider, webSocketProvider } = configureChains(
  [filecoin, chain.polygonMumbai, chain.mainnet],
  /**@notice This is Alchemy's default API key.
      You can get your own at https://dashboard.alchemyapi.io */
  [
    alchemyProvider({ apiKey: "bEMWCe04MJ2C_CgSPrXdiYOcmGj_4jRP" }),
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== filecoin.id) return null;
        return filecoin.rpcUrls.default.http;
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Dual GameFi",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App(props) {
  const [colorScheme, setColorScheme] = useState("dark");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const { Component, pageProps } = props;

  const livepeerClient = useMemo(() => {
    return createReactClient({
      provider: studioProvider({
        apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
      }),
    });
  }, []);

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            colors: {
              bgColor: ["#0A1A2F"],
            },
          }}
        >
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <LivepeerConfig
                dehydratedState={pageProps?.dehydratedState}
                client={livepeerClient}
              >
                <Notifications />
                <Component {...pageProps} />

                <Toaster />

                <PushSupportChat />
              </LivepeerConfig>
            </RainbowKitProvider>
          </WagmiConfig>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
