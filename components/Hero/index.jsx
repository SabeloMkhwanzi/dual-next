import Link from "next/link";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  rem,
} from "@mantine/core";

import { IconCheck } from "@tabler/icons-react";
import About from "../About";
import Features from "../Feature";
import Sponsor from "../Sponsor";

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
}));

export function Hero() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              The Ultimate Test of Skill and Strategy in <span>GameFi</span>
            </Title>
            <Text color="dimmed" mt="md">
              Empowering Gamers, Unleashing NFTs - Dual, Where Battles Fuel
              GameFi Success,
            </Text>

            <Group mt={30}>
              <Link href="/gamer">
                <Button
                  variant="outline"
                  radius="md"
                  size="md"
                  className={classes.control}
                >
                  Explore
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  variant="default"
                  radius="md"
                  size="md"
                  className={classes.control}
                >
                  Sign up as an Gamer
                </Button>
              </Link>
            </Group>
          </div>
          <Image
            src="https://guarda.com/assets/images/academy/thumbs/best-nft-games.png"
            className={classes.image}
          />
        </div>
      </Container>
    </div>
  );
}
export default Hero;
