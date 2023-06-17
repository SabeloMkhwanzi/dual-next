import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Burger,
  rem,
  Input,
  TextInput,
  Button,
} from "@mantine/core";
import { useDisclosure, ActionIcon } from "@mantine/hooks";
import { IconSearch, IconVideoPlus } from "@tabler/icons-react";
import {
  ColorModeButton,
  ConnectWallet,
  ProjectLogo,
  PushNotification,
} from "../components";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    //paddingBottom: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  outer: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  header1: {
    display: "flex",
    paddingTop: theme.spacing.lg,
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
    width: "600px",
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

const links = [
  {
    link: "/about",
    label: "Features",
  },
  {
    link: "/pricing",
    label: "Pricing",
  },
  {
    link: "/learn",
    label: "Learn",
  },
  {
    link: "/community",
    label: "Community",
  },
];

export default function HeaderNav({ search }) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <>
      <Header height={80} className={classes.header}>
        <div className={classes.inner}>
          <Group>
            <Burger opened={opened} onClick={toggle} size="sm" />
            <ProjectLogo />
          </Group>

          <div className="flex items-center justify-center w-1/3 gap-5">
            {search ? (
              <TextInput
                variant="default"
                radius="xl"
                size="md"
                className={classes.search}
                type="text"
                onChange={(e) => search(e.target.value)}
                placeholder="Search"
                //className="bg-transparent border-0 focus:outline-none"
                icon={<IconSearch ml="auto" size="1rem" stroke={1.5} />}
              />
            ) : null}

            <ColorModeButton />
          </div>
          <Group>
            <Group ml={50} spacing={5} className={classes.links}>
              <ConnectWallet />
              <PushNotification />
            </Group>
          </Group>
        </div>
      </Header>
    </>
  );
}
