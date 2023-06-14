import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAccount, useProvider, useSigner, useContract } from "wagmi";
import { ARTIST_CONTRACT_ADDRESS, ARTIST_ABI } from "../../constants/index";
import GamersCard from "./GamersCard";
import FetchingGamersModal from "../Modals/FetchingGamersModal";

import { Text, createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.white,
    marginBottom: rem(5),
    fontFamily: "jiggies",
  },
}));

function Gamer() {
  const provider = useProvider();
  const signer = useSigner();
  const { isConnected } = useAccount();
  // Set up a contract instance
  const ArtistContract = useContract({
    addressOrName: ARTIST_CONTRACT_ADDRESS,
    contractInterface: ARTIST_ABI,
    signerOrProvider: signer.data || provider,
  });

  // Mantine-ui Styling
  const { classes, theme } = useStyles();

  const [artists, setArtists] = useState([]);
  const [fetchingArtists, setFetchingArtists] = useState(false);

  useEffect(() => {
    const OnPageLoad = async () => {
      if (isConnected) {
        setFetchingArtists(true);
        const allArtists = await ArtistContract.getAllArtists();
        setArtists(allArtists);
        setFetchingArtists(false);
      } else {
        toast.error("Please connect your wallet");
      }
    };
    OnPageLoad();
    return () => {
      setArtists([]);
      setFetchingArtists(false);
    };
  }, [isConnected, ArtistContract]);

  if (!isConnected)
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <Text style={{ fontFamily: "jiggies" }}>
            Please connect your wallet to continue
          </Text>
        </div>
      </>
    );
  else
    return (
      <>
        {fetchingArtists ? <FetchingGamersModal /> : null}
        <div className="min-h-screen p-8 trans">
          <Text
            style={{ fontFamily: "jiggies" }}
            className="mt-8 text-2xl font-semibold text-center sm:text-3xl md:text-4xl trans"
          >
            Meet Our Gamers ready for Dual Battle
          </Text>
          <ul className="grid grid-cols-1 gap-y-4 gap-x-4 lg:gap-x-6 md:grid-cols-2 lg:grid-cols-3 w-[90%] sm:w-[55%] md:w-[80%] mx-auto mt-8 max-w-6xl pb-8">
            {artists.length > 0 &&
              artists?.map((artist, index) => {
                return (
                  <li key={index} className="relative rounded-xl text-ld">
                    <GamersCard artist={artist} />
                  </li>
                );
              })}
            {artists.length === 0 && (
              <p
                style={{ fontFamily: "jiggies" }}
                className="col-span-2 font-semibold text-slate-400 dark:text-slate-100 lg:col-span-3"
              >
                No Gamers have joined.
              </p>
            )}
          </ul>
        </div>
      </>
    );
}

export default Gamer;
