import { Center, Box, Title, Text, createStyles } from "@mantine/core";
import ReactRotatingText from "react-rotating-text";

const useStyles = createStyles((theme) => ({
  item: {
    "&[data-hovered]": {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
    },
  },
  ratateText: {
    animation:
      "blinking-cursor 0.8s cubic-bezier(0.68, 0.01, 0.01, 0.99) 1000s infinite",
    fontSize: 40,

    "@keyframes blinking-cursor": {
      "0%": {
        opacity: 0,
      },
      "50%": {
        opacity: 1,
      },
      "100%": {
        opacity: 0,
      },
    },
  },
}));

export default function HeaderTitle() {
  const { classes } = useStyles();

  return (
    <Center>
      <Box>
        <Title
          sx={{
            fontFamily: "jiggies",
            letterSpacing: "1px",
          }}
          styles={(theme) => ({
            title: {
              fontWeight: 900,
              fontSize: 35,
              letterSpacing: -1,
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.colors.white,
              marginBottom: theme.spacing.xs,
              textAlign: "center",
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,

              "@media (max-width: 520px)": {
                fontSize: 28,
                textAlign: "left",
              },
              "@media (max-width: 755px)": {
                fontSize: theme.fontSizes.sm,
              },
            },
          })}
        >
          Where skill meets strategy in the ultimate GameFi showdown. <br />
          <Center>
            <Text
              fw={700}
              fs="xl"
              component="span"
              inherit
              className="ultra"
              sx={{
                color: "#01fee4",
              }}
            >
              Filecoin Virtual Machine x {""}
              <Text
                component="span"
                inherit
                styles={{
                  color: "#01fee4",
                }}
              >
                <ReactRotatingText
                  className={classes.ratateText}
                  color="#01fee4"
                  items={[
                    "Web3.Storage.",
                    "Push Protocol.",
                    "ENS.",
                    "Liverpeer.",
                    "IPFS.",
                    "Huddle01.",
                    "Polybase",
                    "Ligthhouse",
                  ]}
                />
              </Text>
            </Text>
          </Center>
        </Title>
      </Box>
    </Center>
  );
}
