// eslint-disable-next-line
import { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { BiGlobe, BiGift } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { useProvider, useAccount, useSigner, useContract } from "wagmi";
import { FACTORY_ADDRESS, FACTORY_ABI } from "../../constants/index";
import CollectionCard from "../Collection/CollectionCard";
import { Button, ActionIcon, Text, Image } from "@mantine/core";
import { useRouter } from "next/router";
import { PushSendMsg } from "..";

function GamersPage() {
  const router = useRouter();
  const { object } = router.query;
  const { artistAddress, name, imageUrl, bio } = object
    ? JSON.parse(object)
    : {};
  const { isConnected } = useAccount();
  const [artistContracts, setArtistContracts] = useState([]);
  //Factory Instance
  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const FactoryContract = useContract({
    addressOrName: FACTORY_ADDRESS,
    contractInterface: FACTORY_ABI,
    signerOrProvider: signer.data || provider,
  });
  useEffect(() => {
    const allContracts = async () => {
      try {
        if (isConnected) {
          const works = await FactoryContract.AllArtistContracts(artistAddress);
          setArtistContracts(works);
        }
      } catch (err) {
        console.log(err);
        setArtistContracts([]);
      }
    };
    allContracts();
  }, [isConnected, FactoryContract, artistAddress]);

  return (
    <>
      <div className="flex flex-col w-full min-h-screen text-ld font-pop">
        <div className="relative w-[200px] h-[200px] mx-auto mt-12 bg-transparent rounded-full overflow-hidden">
          <Image
            src={`https://ipfs.io/ipfs/${imageUrl}`}
            alt=""
            className="absolute object-cover object-center w-full h-full"
            sx={{
              "&:hover": {
                transform: "scale(1.03)",
                transition: "transform 100ms ease, box-shadow 100ms ease",
              },
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center max-w-5xl gap-2 px-4 mx-auto mt-4">
          <div className="flex items-center justify-center gap-2">
            <Text
              sx={{ fontFamily: "jiggies" }}
              className="text-center text-xl md:text-2xl text-[#ffffff] font-medium tracking-wide"
            >
              {name}
            </Text>
            <ActionIcon color="blue.9" variant="transparent">
              <MdVerified className="w-6 h-6 " />
            </ActionIcon>
          </div>
          <Text className="text-center text-md md:text-base  text-[#ffffff] ultra tracking-wider">
            {bio}
          </Text>
          <div className="flex items-center justify-center gap-4 pt-2">
            <ActionIcon color="gray.6" variant="transparent">
              <BiGlobe size="2rem" />
            </ActionIcon>
            <ActionIcon color="blue.9" variant="transparent">
              <BsTwitter size="2rem" />
            </ActionIcon>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2 cursor-pointer">
            <div className="flex items-center justify-center gap-4 pt-2">
              <PushSendMsg />
              <Button
                className="tracking-wider ultra"
                variant="default"
                radius="lg"
              >
                Follow
              </Button>
              <Button
                className="tracking-wider ultra"
                variant="default"
                radius="lg"
                leftIcon={<BiGift className="w-5 h-5" />}
              >
                Me Snacks
              </Button>
            </div>
          </div>
        </div>

        {/* Collection Cards if any */}
        {artistContracts.length > 0 && (
          <>
            <div className="w-full my-32">
              <ul className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artistContracts.map((contract, index) => (
                  <li key={index}>
                    <CollectionCard contract={contract} />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {/* If no collections */}
        {artistContracts.length === 0 && (
          <>
            <div className="flex items-center justify-center w-full max-w-5xl mx-auto mt-8">
              <Text className="text-center text-lg lg:text-base  text-[#ffffff] ultra tracking-wider">
                No collections yet
              </Text>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default GamersPage;
