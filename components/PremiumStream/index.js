import { Player } from "@livepeer/react";
import { useState } from "react";
import Script from "next/script";
import { IconPlayerPlay } from "@tabler/icons-react";

import { JoinStreamButton } from "../JoinStreamButton";
import {
  Box,
  Text,
  Center,
  TextInput,
  createStyles,
  Button,
} from "@mantine/core";
import HeaderTitle from "../HeaderTitle";
import HeroVideo from "../HeroVideo";

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 800,
    fontSize: 30,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color: "#00eb88",
  },

  item: {
    "&[data-hovered]": {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
    },
  },
}));

export default function PremiumStream() {
  const [playbackId, setPlaybackId] = useState("");
  const [renderPlayer, setRenderPlayer] = useState(false);
  const setRenderPlayerChild = (value) => {
    setRenderPlayer(value);
  };

  return (
    <>
      <HeaderTitle />
      <Center>
        <div>
          <Box
            mt={50}
            hidden={
              renderPlayer && (
                <>
                  <Player playbackId={playbackId} />
                </>
              )
            }
          >
            <Text fz="lg" fw={700} className="ultra">
              Playback ID:
            </Text>
            <div className="my-4">
              <TextInput
                my={10}
                size="md"
                type="text"
                name="playbackId here"
                id="playbackId"
                className="block border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="playbackId here"
                onChange={(event) => setPlaybackId(event.target.value)}
                autoComplete="off"
              />
            </div>
          </Box>
          <Script id="Subscribe">
            {`(function(d, s) {
                var js = d.createElement(s),
                  sc = d.getElementsByTagName(s)[0];
                js.src="https://paywall.unlock-protocol.com/static/unlock.latest.min.js";
                sc.parentNode.insertBefore(js, sc); }(document, "script"));`}
          </Script>
          <Script id="unlockProtocalConfig">
            {`
            var unlockProtocolConfig = {            
              "network": 5,
              "locks": {
                "0x92ac11a7c4e52edc5980c8f2ee58e931c85ca333": {
                  "name": "Dual"
                },
              },
              
              "callToAction": {
                "default": "Please unlock this demo!"
              }
            }
            `}
          </Script>
          <Box
            my={10}
            hidden={
              renderPlayer && (
                <>
                  <Player controls playbackId={playbackId} />
                </>
              )
            }
          >
            <JoinStreamButton renderPlayer={setRenderPlayerChild} />
          </Box>
          {renderPlayer && (
            <>
              <Box my={5}>
                <Player showTitle title controls playbackId={playbackId} />
              </Box>
            </>
          )}
        </div>
      </Center>
      <Center
        hidden={
          renderPlayer && (
            <>
              <Box my={5}>
                <Player showTitle title controls playbackId={playbackId} />
              </Box>
            </>
          )
        }
      >
        <HeroVideo />
      </Center>
    </>
  );
}
