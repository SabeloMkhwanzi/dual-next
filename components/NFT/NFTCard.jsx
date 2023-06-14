import { useEffect, useState } from "react";
import { useProvider, useSigner, useContract } from "wagmi";
import { COLLECTION_ABI } from "../../constants/index";
import {
  createStyles,
  Text,
  Button,
  rem,
  Card,
  Title,
  Center,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(400),
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
  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },
}));

const NFTCard = ({ uri, contractAddress }) => {
  const [itemsName, setItemsName] = useState(null);
  const [itemsDescription, setItemsDescription] = useState(null);
  const [itemsImage, setItemsImage] = useState(null);
  const [itemsPrice, setItemsPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  //Mantine-UI Styling import
  const { classes } = useStyles();
  //Contract instance
  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const CollectionContract = useContract({
    addressOrName: contractAddress,
    contractInterface: COLLECTION_ABI,
    signerOrProvider: signer.data || provider,
  });

  const handleClick = () => {
    console.log("clicked");
  };

  useEffect(() => {
    const getDetails = async () => {
      console.log("starting");
      try {
        const data = await CollectionContract._tokenURIs(uri);
        console.log(data);
        let res = await fetch(`https://ipfs.io/ipfs/${data}/file.json`).then(
          (res) => res.json()
        );
        console.log(res);
        setItemsName(res.itemName);
        setItemsDescription(res.description);
        setItemsImage(res.imgHash);
        setItemsPrice(res.price);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getDetails();
  }, [CollectionContract, uri]);

  return (
    <div className="relative flex flex-col gap-2">
      <Card shadow="lg" p="xs" radius="md" className={classes.cardBox}>
        <Center>
          <img
            src={
              itemsImage
                ? `https://ipfs.io/ipfs/${itemsImage}`
                : "https://ipfs.io/ipfs/bafkreihnw3llk4qrssj7zx5rojeszg7mcridxamu523ad2a5twfp7b2r2e"
            }
            alt="collection"
            className={classes.card}
          />
        </Center>
        <div className=" w-full text-center p-4 h-[40%]">
          <Text color="white" className={classes.category} size="md">
            {itemsName ? itemsName : "Loading..."}
          </Text>
          <Title className="my-2 text-xs text-center">
            {itemsDescription ? itemsDescription : "Loading..."}
          </Title>
          <Text className="my-2 text-sm text-center tracking-wider ultra">
            Valued At: {itemsPrice ? itemsPrice : "Loading..."} FIL
          </Text>
          <Center>
            <Button
              className="tracking-wider ultra"
              variant="default"
              radius="lg"
              onClick={handleClick}
            >
              Claim
            </Button>
          </Center>
        </div>
      </Card>
    </div>
  );
};

export default NFTCard;
