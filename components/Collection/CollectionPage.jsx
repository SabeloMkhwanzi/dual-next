// eslint-disable-next-line
import { useState, useEffect } from "react";
import { useProvider, useAccount, useSigner, useContract } from "wagmi";
import { COLLECTION_ABI } from "../../constants/index";
import NFTCard from "../NFT/NFTCard";
import { Image, Text } from "@mantine/core";
import { useRouter } from "next/router";

function CollectionPage() {
  const router = useRouter();
  const { object } = router.query;
  const { isConnected } = useAccount();
  const { contractAddress, name, imageUrl, description, link } = object
    ? JSON.parse(object)
    : {};
  const [tokenURIs, setTokenURIs] = useState([]);
  //Contract instance
  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const CollectionContract = useContract({
    addressOrName: contractAddress,
    contractInterface: COLLECTION_ABI,
    signerOrProvider: signer.data || provider,
  });
  useEffect(() => {
    const allContracts = async () => {
      if (isConnected) {
        try {
          let tokensTot = await CollectionContract.getTotalChildren();
          let toks = [];
          for (let i = 1; i <= tokensTot; i++) toks.push(i);
          setTokenURIs(toks);
        } catch (err) {
          console.log(err);
          setTokenURIs([]);
        }
      }
    };
    allContracts();
  }, [isConnected, CollectionContract]);

  return (
    <div className="flex flex-col w-full min-h-screen text-ld font-pop">
      <div className="relative w-[200px] h-[200px] mx-auto mt-12 bg-transparent rounded-full overflow-hidden">
        <Image
          src={imageUrl}
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
        </div>
        <Text className="text-center text-md md:text-base  text-[#ffffff] ultra tracking-wider">
          {description}
        </Text>
      </div>

      {/* Collection Cards if any */}
      {tokenURIs.length > 0 && (
        <>
          <div className="w-full my-32">
            <ul className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tokenURIs.map((uri, index) => (
                <li key={index}>
                  <NFTCard uri={uri} contractAddress={contractAddress} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {/* If no collections */}
      {tokenURIs.length === 0 && (
        <div className="flex items-center justify-center w-full max-w-5xl mx-auto mt-8">
          <Text className="text-center text-lg lg:text-base  text-[#ffffff] ultra tracking-wider">
            No collectibles yet
          </Text>
        </div>
      )}
    </div>
  );
}

export default CollectionPage;
