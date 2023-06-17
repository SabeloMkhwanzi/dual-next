import { useState } from "react";
import {
  createStyles,
  Navbar,
  UnstyledButton,
  Tooltip,
  Title,
  rem,
  Button,
  Text,
} from "@mantine/core";
import {
  IconHome2,
  IconBrandYoutube,
  IconHistory,
  IconClockHour4,
  IconHeartFilled,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  aside: {
    flex: `0 0 ${rem(60)}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  mainLink: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: rem(60),
    paddingTop: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },
}));

const mainLinksMockdata = [
  { icon: IconHome2, label: "Home", path: "/" },
  { icon: IconBrandYoutube, label: "Shorts" },
  { icon: IconHistory, label: "History" },
  { icon: IconClockHour4, label: "Watch Later" },
  { icon: IconHeartFilled, label: "Liked Videos" },
];

export default function Sidebar({ updateCategory }) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("All");
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  let categories = [
    {
      name: "All",
      title: "All",

      onClick: () => {
        setActive("All");
        updateCategory("");
      },
    },
    {
      name: "Reviews",
      title: "Reviews",

      onClick: () => {
        setActive("Reviews");
        updateCategory("Reviews");
      },
    },
    {
      name: "Walkthroughs",
      title: "Walkthroughs",

      onClick: () => {
        setActive("Walkthroughs");
        updateCategory("Walkthroughs");
      },
    },
    {
      name: "Let's Play",
      title: "Let's Play",

      onClick: () => {
        setActive("Let's Play");
        updateCategory("Let's Play");
      },
    },

    {
      name: "Tutorials",
      title: "Tutorials",

      onClick: () => {
        setActive("Tutorials");
        updateCategory("Tutorials");
      },
    },
    {
      name: "Gaming",
      title: "Gaming",

      onClick: () => {
        setActive("Gaming");
        updateCategory("Gaming");
      },
    },
    {
      name: "Trending",
      title: "Trending",

      onClick: () => {
        setActive("Trending");
        updateCategory("Trending");
      },
    },
  ];

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: link.label === active,
        })}
      >
        <link.icon size="1.4rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  return (
    <Navbar height={750} width={{ sm: 300 }}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            {/* <MantineLogo type="mark" size={30} /> */}
          </div>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <Title order={5} className={classes.title}>
            <Text
              style={{ letterSpacing: "0.5px" }}
              fw="600"
              fs="900"
              color="#fffff"
            >
              Category: {active}
            </Text>
          </Title>
          {categories.map((category, index) => (
            <a className={classes.link} onClick={category.onClick} key={index}>
              <Text
                cursor
                style={{ letterSpacing: "0.5px" }}
                fw="600"
                fs="900"
                color="#fffff"
              >
                {category.title}
              </Text>
            </a>
          ))}
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
