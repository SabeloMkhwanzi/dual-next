import React from "react";
import { Player } from "@livepeer/react";

interface PlayerProps {
  id: any;
}

const VideoPlayer: React.FC<PlayerProps> = ({ id }) => {
  return (
    <Player
      autoPlay
      loop
      src={"ipfs://" + id}
      showPipButton
      showTitle={false}
      aspectRatio="16to9"
      controls={{
        autohide: 3000,
      }}
      theme={{
        borderStyles: { containerBorderStyle: "solid" },
        radii: { containerBorderRadius: "12px" },
        colors: { accent: "#4338CA" },
        borderWidths: {
          containerBorderWidth: "1px",
        },
      }}
    />
  );
};

export default VideoPlayer;
