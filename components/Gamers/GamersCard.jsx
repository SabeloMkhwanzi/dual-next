import { useEffect, useState } from "react";
import Link from "next/link";
//import { getJSONFromCID } from "../../utils/storage";

import { IconEye, IconMessageCircle } from "@tabler/icons-react";
import {
  Card,
  Text,
  Group,
  Center,
  createStyles,
  rem,
  Button,
} from "@mantine/core";

import rn from "random-number";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    height: rem(350),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    transition: "transform 100ms ease, box-shadow 100ms ease",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  imageDisplay: {
    ...theme.fn.cover(),
    backgroundSize: "cover",
    transition: "transform 500ms ease",
  },

  overlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
  },

  content: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1,
  },

  title: {
    color: theme.white,
    marginBottom: rem(5),
    fontFamily: "jiggies",
  },

  bodyText: {
    color: theme.colors.dark[2],
    marginLeft: rem(7),
  },

  author: {
    color: theme.colors.dark[2],
  },
}));

function GamersCard({ artist }) {
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  // Styling
  const { classes, theme } = useStyles();

  let { artistAddress, artistDetails, dateJoined, id } = artist;
  //convert id from hex to int
  let idHex = id.toHexString();
  let idInt = parseInt(idHex.substring(2), 16);
  //convert dateJoined from hex to int
  dateJoined = dateJoined.toHexString();
  dateJoined = parseInt(dateJoined.substring(2), 16);
  //convert dateJoined from epoch to date
  dateJoined = new Date(dateJoined * 1000);
  dateJoined = dateJoined.toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      //fetch artist's name, bio, and profile picture from IPFS using artistDetails as the hash
      try {
        let res = await fetch(
          `https://ipfs.io/ipfs/${artistDetails}/file.json`
        ).then((res) => res.json());
        setName(res?.name);
        setBio(res?.bio);
        setImageUrl(res?.imgHash);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [artistDetails]);

  const object = {
    artistAddress,
    dateJoined,
    idInt,
    name,
    imageUrl,
    bio,
  };

  //Random number for date using npm = random-number
  var options = {
    min: 4,
    max: 50,
    integer: true,
  };

  return (
    <div className="relative flex flex-col gap-2">
      <Card p="lg" shadow="xl" className={classes.card} radius="md">
        <img
          className={classes.imageDisplay}
          src={
            imageUrl
              ? `https://ipfs.io/ipfs/${imageUrl}`
              : "https://ipfs.io/ipfs/bafybeih2y7l7drbfuh45yjdqjgrucfjampulfen2kwefkwcfe3emsz2exu"
          }
          alt=""
          loading="lazy"
        />
        <div className={classes.overlay} />
        <div className={classes.content}>
          <div>
            <Text size="lg" className={classes.title} weight={500}>
              {name}
            </Text>

            <Group position="apart" spacing="xs">
              <Group spacing="lg">
                <Center>
                  <IconEye
                    size="1rem"
                    stroke={1.5}
                    color={theme.colors.dark[2]}
                  />
                  <Text size="sm" className={classes.bodyText}>
                    {rn(options)}
                  </Text>
                </Center>
                <Center>
                  <IconMessageCircle
                    size="1rem"
                    stroke={1.5}
                    color={theme.colors.dark[2]}
                  />
                  <Text size="sm" className={classes.bodyText}>
                    {rn(options)}
                  </Text>
                  <Link
                    href={{
                      pathname: `/gamerProfile/${artistAddress}`,
                      query: { object: JSON.stringify(object) },
                    }}
                    state={{ object }}
                    className="bttn bttn-artist text-indigo-500 hover:text-[#ffffff] trans "
                  >
                    <Button
                      className="tracking-wider ultra"
                      radius="lg"
                      variant="subtle"
                    >
                      <Text className="ultra" size="sm">
                        View Profile
                      </Text>
                    </Button>
                  </Link>
                </Center>
              </Group>
            </Group>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default GamersCard;
