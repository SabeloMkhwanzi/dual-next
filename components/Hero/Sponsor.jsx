import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  rem,
} from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  title: {
    fontWeight: 900,
    fontSize: rem(34),
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
      color: "#01fee4",
    },
  },

  mobileImage: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  desktopImage: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function Sponsor() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
      >
        <Image
          alt="FVM logo"
          src="https://pbs.twimg.com/profile_images/1594644856357650433/zSeH1tX3_400x400.png"
          className={classes.mobileImage}
        />
        <div>
          <Title
            sx={{ fontFamily: "jiggies", letterSpacing: "1px" }}
            className={classes.title}
          >
            Powered by Filecoin
          </Title>
          <Text
            sx={{ fontFamily: "ultra", letterSpacing: "1px" }}
            color="dimmed"
            size="md"
          >
            A decentralized storage network that aims to store humanity’s most
            important information.
          </Text>
          <br></br>
          <Text sx={{ fontFamily: "ultra", letterSpacing: "1px" }}>
            Dual uses a decentralized storage network to securely and
            efficiently store data, reduce costs, maintain control, and improve
            resilience against data breaches or loss.
          </Text>
          <br></br>
          <Text sx={{ fontFamily: "ultra", letterSpacing: "1px" }}>
            Dual provides a platform for users to trade NFTs, build gaming
            communities, and monetize skills through live streaming and video
            content. DUEL uses a decentralized storage network like Filecoin to
            securely and efficiently store user’s data.
          </Text>
          <Link href="/">
            <Button
              radius="md"
              variant="outline"
              sx={{
                color: "#01fee4",
                backgroundColor: "#01fee4",
                borderColor: "#01fee4",
              }}
              size="lg"
              mt="md"
              className={classes.control}
            >
              Let’s Dual
            </Button>
          </Link>
        </div>
        <Image
          alt="FVM logo"
          src="https://pbs.twimg.com/profile_images/1594644856357650433/zSeH1tX3_400x400.png"
          className={classes.desktopImage}
        />
      </SimpleGrid>
    </Container>
  );
}
