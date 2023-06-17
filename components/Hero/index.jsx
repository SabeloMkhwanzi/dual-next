"use client";
import Link from "next/link";
import {
  createStyles,
  Image,
  Container,
  Title,
  Group,
  Text,
  rem,
  Button,
} from "@mantine/core";
import ReactRotatingText from "react-rotating-text";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    width: "400px",
    height: "500px",
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
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

export function Hero() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title
              sx={{ fontFamily: "jiggies", letterSpacing: "2px" }}
              className={classes.title}
            >
              Where skill meets strategy in the ultimate GameFi showdown{" "}
              <span>
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
                      "Exciting.",
                      "Competitive.",
                      "Strategic.",
                      "Skillful.",
                      "Challenging.",
                      "Rewarding.",
                      "Innovative",
                      "Thrilling",
                    ]}
                  />
                </Text>
              </span>
            </Title>
            <Text size="lg" className="ultra" color="dimmed" mt="md">
              Empower your inner gamer and unleash the potential of NFTs with
              DUEL - where epic battles fuel GameFi success. Join our thriving
              social platform and discover a world of community and opportunity
            </Text>

            <Group mt={30}>
              <Link href="/gamer">
                <Button
                  sx={{
                    color: "#01fee4",
                    backgroundColor: "#01fee4",
                    borderColor: "#01fee4",
                  }}
                  variant="default"
                  radius="md"
                  className={classes.control}
                  size="lg"
                >
                  <Text
                    style={{ letterSpacing: "0.7px" }}
                    color="#01FEE4"
                    fw="700"
                    className="ultra"
                  >
                    Explore
                  </Text>
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  variant="default"
                  radius="md"
                  size="lg"
                  //className={classes.control}
                >
                  <Text
                    style={{ letterSpacing: "0.7px" }}
                    color="gray.5"
                    fw="700"
                    className="ultra"
                  >
                    Join the move
                  </Text>
                </Button>
              </Link>
            </Group>
          </div>
          <Image
            radius="md"
            alt=""
            src="https://guarda.com/assets/images/academy/thumbs/best-nft-games.png"
            className={classes.image}
          />
        </div>
      </Container>
    </div>
  );
}
export default Hero;
