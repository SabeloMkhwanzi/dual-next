import { Player } from "@livepeer/react";
import { Container, createStyles } from "@mantine/core";

const playbackId = "ipfs://QmfSkdBa7VBT1nrkF54n2XTvk5u6KMunmrED4p5dfGbTMr";

const useStyles = createStyles((theme) => ({
  Paper: {
    boxShadow: theme.shadows.lg,
  },
}));

export default function HeroVideo() {
  const { classes } = useStyles();
  return (
    <Container size="xl" px={8} my="5em" className={classes.Paper}>
      <Player
        autoPlay={true}
        loop
        title="BubbleStreaamr Ad"
        playbackId={playbackId}
        showPipButton
        showTitle={false}
        aspectRatio="16to9"
        controls={{
          autohide: 100000,
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
    </Container>
  );
}
