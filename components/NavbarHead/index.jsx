import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  Text,
  Popover,
  Stack,
} from "@mantine/core";

//import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import ConnectWallet from "../ConnectWallet";
import { ColorModeButton, ProjectLogo } from "..";
//import PushNotifiction from "../PushNotifiction";

const HEADER_HEIGHT = 100;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    boxShadow: theme.shadows.lg,
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

  linkLabel: {
    marginRight: 5,
  },
}));

export default function NavbarHead() {
  const { classes } = useStyles();

  return (
    <Header
      bg="transparent"
      sx={{ backdropFilter: "blur(5px)", borderBottom: 0 }}
      height={HEADER_HEIGHT}
    >
      <Container className={classes.inner} fluid>
        <Group>
          <ProjectLogo />
        </Group>
        <Group spacing={5} className={classes.links}>
          <Popover trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant="default"
                radius="md"
                className={classes.linkLabel}
              >
                <Text fw="500" fz="md" className="ultra">
                  Gamers
                </Text>
              </Button>
            </Popover.Target>
            <Popover.Dropdown
              sx={(theme) => ({
                background:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white,
              })}
            >
              <Stack>
                <Link
                  exact="true"
                  href="/signup"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    fullWidth
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Sign up
                    </Text>
                  </Button>
                </Link>

                <Link
                  exact="true"
                  href="/gamer"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    fullWidth
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Gamers
                    </Text>
                  </Button>
                </Link>
                <Link
                  exact="true"
                  href="/createCollection"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    fullWidth
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Create Collection
                    </Text>
                  </Button>
                </Link>
              </Stack>
            </Popover.Dropdown>
          </Popover>

          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/meetings"
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              <Text fw="500" fz="md" className="ultra">
                {" "}
                Huddle01
              </Text>
            </Button>
          </Link>
          <Popover trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant="default"
                radius="md"
                className={classes.linkLabel}
              >
                <Text fw="500" fz="md" className="ultra">
                  Dual Stream
                </Text>
              </Button>
            </Popover.Target>
            <Popover.Dropdown
              sx={(theme) => ({
                background:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white,
              })}
            >
              <Stack>
                <Link
                  exact="true"
                  href="/createLivestream"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    fullWidth
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Create Stream
                    </Text>
                  </Button>
                </Link>

                <Link
                  exact="true"
                  href="/joinLiveStream"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    fullWidth
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Join Stream
                    </Text>
                  </Button>
                </Link>

                <Link
                  exact="true"
                  href="/premium"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    fullWidth
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Premium Stream
                    </Text>
                  </Button>
                </Link>
              </Stack>
            </Popover.Dropdown>
          </Popover>

          <Popover trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant="default"
                radius="md"
                className={classes.linkLabel}
              >
                <Text fw="500" fz="md" className="ultra">
                  Videos
                </Text>
              </Button>
            </Popover.Target>
            <Popover.Dropdown
              sx={(theme) => ({
                background:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white,
              })}
            >
              <Stack>
                <Link
                  //exact="true"
                  href="/videosUploader"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    fullWidth
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Upload Videos
                    </Text>
                  </Button>
                </Link>

                <Link
                  exact="true"
                  href="/videosHome"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    fullWidth
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Videos
                    </Text>
                  </Button>
                </Link>
                <Link
                  exact="true"
                  href="/"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    fullWidth
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Premium Videos
                    </Text>
                  </Button>
                </Link>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>

        <Group className={classes.linkLabel}>
          {/* <PushNotifiction /> */}
          <div className={classes.links}>
            <ColorModeButton />
          </div>
          <ConnectWallet />
        </Group>
      </Container>
    </Header>
  );
}
