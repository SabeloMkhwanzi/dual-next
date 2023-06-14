import { useState, useEffect } from "react";
import Link from "next/link";
import { useProvider, useSigner, useContract } from "wagmi";
import { COLLECTION_ABI } from "../../constants/index";
import { getJSONFromFileinCID } from "../../utils/storage";
import { createStyles, Text, Button, rem, Card } from "@mantine/core";

//Mantine-UI Styling
const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  cardBox: {
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

  category: {
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
    fontFamily: "ultra",
  },
}));

const CollectionCard = ({ contract }) => {
  //Mantine-UI Styling import
  const { classes } = useStyles();
  // eslint-disable-next-line
  const [details, setDetails] = useState({});

  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const ERC1155Contract = useContract({
    addressOrName: contract,
    contractInterface: COLLECTION_ABI,
    signerOrProvider: signer.data || provider,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const _details = await ERC1155Contract.contractHash();
      const data = await getJSONFromFileinCID(_details);
      setDetails(data);
    };
    fetchDetails();
  }, [ERC1155Contract, details]);

  const object = {
    contractAddress: contract,
    name: details.name,
    imageUrl: details.imgHash
      ? `https://ipfs.io/ipfs/${details.imgHash}`
      : "https://ipfs.io/ipfs/bafkreihnw3llk4qrssj7zx5rojeszg7mcridxamu523ad2a5twfp7b2r2e",
    description: details.description,
    link: details.link ?? "www.google.com",
  };

  return (
    <figure className="relative flex flex-col flex-wrap items-center w-full overflow-hidden rounded-md">
      <Card shadow="md" p="xs" radius="md" className={classes.cardBox}>
        <img
          className={classes.card}
          alt="collection"
          src="https://ipfs.io/ipfs/bafkreihnw3llk4qrssj7zx5rojeszg7mcridxamu523ad2a5twfp7b2r2e"
        />
        <div className="flex items-center justify-center gap-4 pt-2">
          <Text color="white" className={classes.category} size="md">
            {details.name}
          </Text>
          <Link
            href={{
              pathname: `/gamersNftCollection/${contract}`,
              query: { object: JSON.stringify(object) },
            }}
            state={{ object }}
          >
            <Button
              className="tracking-wider ultra"
              variant="default"
              radius="lg"
            >
              View Collection
            </Button>
          </Link>
        </div>
      </Card>
    </figure>
  );
};

export default CollectionCard;
