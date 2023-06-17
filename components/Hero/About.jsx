import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from "@mantine/core";
import {
  IconUserSearch,
  IconCards,
  IconExchange,
  IconSocial,
} from "@tabler/icons-react";

const mockdata = [
  {
    title: "Set Up Your Profile",
    description:
      "Once you’ve set up your profile, you’re ready for fun and to experience open opportunities through Web3.",
    icon: IconUserSearch,
  },
  {
    title: "Mint Your NFTs",
    description:
      "In your profile, you can mint your NFTs, list them on the platform for other gamers to see, and request a duel challenge for the NFT.",
    icon: IconCards,
  },
  {
    title: "Trade NFTs",
    description:
      "On DUEL, you’ll find the best opportunities to trade your NFTs while having fun and building your own community. Monetize your skills through live streaming, video content, and more.",
    icon: IconExchange,
  },
  {
    title: "Build Your Community",
    description:
      "Building a gaming community can be an exciting and rewarding endeavor. That’s why we bring you DUEL.",
    icon: IconSocial,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#01FEE4",
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#01FEE4",
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export default function About() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(50)} stroke={2} color="#01FFE4" />
      <Text
        sx={{ fontFamily: "ultra" }}
        fz="lg"
        fw={500}
        className={classes.cardTitle}
        mt="md"
      >
        {feature.title}
      </Text>
      <Text sx={{ fontFamily: "ultra" }} fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title
        sx={{ fontFamily: "jiggies" }}
        order={2}
        className={classes.title}
        ta="center"
        mt="sm"
      >
        The fun begins now for GameFi on the Filecoin ecosystem.
      </Title>

      <Text
        c="dimmed"
        sx={{ fontFamily: "ultra" }}
        className={classes.description}
        ta="center"
        mt="md"
        fs="lg"
      >
        Join the GameFi revolution on Filecoin and let the fun begin!
      </Text>

      <SimpleGrid
        cols={4}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
