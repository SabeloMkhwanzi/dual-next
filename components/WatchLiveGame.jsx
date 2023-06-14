import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Player } from "@livepeer/react";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import styles from "../../styles/Home.module.css";
import waterfallsPoster from "../../public/images/waterfall.jpg";
import { useQuery, gql } from "@apollo/client";
import zkdd from "./ZkBobDirectDeposit.json";
import { ethers } from "ethers";

const ZKBOB_CONTRACT = "0x34bd59Be8e9534Dd294BF838585479a368929054";

const accessControlConditions = [
  {
    contractAddress: "0xb18bb99c7849D39a27395dE2f412cc470f76947E",
    standardContractType: "ERC721",
    chain: "mumbai",
    method: "balanceOf",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: ">",
      value: "0",
    },
  },
];

const TOKEN_BALANCE_QUERY = gql`
  {
    TokenBalances(
      input: {
        filter: { owner: { _eq: "0xAf1aa06FaBD863CFfe9D1DFcD2353C295a6484F5" } }
        limit: 5
        blockchain: polygon
      }
    ) {
      TokenBalance {
        amount
        chainId
        id
        lastUpdatedBlock
        lastUpdatedTimestamp
        owner {
          addresses
        }
        tokenAddress
        tokenId
        tokenType
        token {
          name
          symbol
        }
      }
    }
  }
`;

export default function WatchStream() {
  const [loading, setLoading] = useState(false);
  const [inputPlaybackId, setInputPlaybackId] = useState("");
  const [jwt, setJwt] = useState("");
  const { data, loadingBal, error } = useQuery(TOKEN_BALANCE_QUERY);

  if (loadingBal) console.log(loadingBal);
  if (error) console.log(error);

  const router = useRouter();
  const { id: playbackId } = router.query;

  const resourceId = {
    baseUrl: "http://localhost:3000",
    path: "/watch-stream",
    orgId: "livepeer-org",
    role: "developer",
  };

  const airStackTokenGating = async () => {};

  const sendDirectDepositzkBob = async () => {};

  const [currentAccount, setCurrentAccount] = useState("");
  const [tokenCount, setTokenCount] = useState(0);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Polygon test network
    const polygonChainId = "0x137";
    if (chainId !== polygonChainId) {
      alert("You are not connected to the Polygon Main Network!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);

      //setupEventListener();
    } else {
      console.log("No authorized account found");
    }
  };

  /*
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain " + chainId);

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4";
      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Test Network!");
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      //setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  // const setupEventListener = async() => {
  //     // Most of this looks the same as our function askContractToMintNft
  //     try {
  //         const { ethereum } = window;

  //         if (ethereum) {
  //             // Same stuff again
  //             const provider = new ethers.providers.Web3Provider(ethereum);
  //             const signer = provider.getSigner();
  //             const connectedContract = new ethers.Contract(ZKBOB_CONTRACT, zkdd.abi, signer);

  //             // THIS IS THE MAGIC SAUCE.
  //             // This will essentially "capture" our event when our contract throws it.
  //             // If you're familiar with webhooks, it's very similar to that!
  //             connectedContract.on("NewNFTMinted", (from, tokenId) => {
  //                 console.log(from, tokenId.toNumber())
  //                 alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
  //             });

  //             console.log("Setup event listener!")

  //         } else {
  //             console.log("Ethereum object doesn't exist!");
  //         }
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  const askContractToDepositMoney = async (amount) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          ZKBOB_CONTRACT,
          zkdd.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.directDeposit(
          ethers.utils.parseEther("0.1")
        );

        console.log("Mining...please wait.");
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://polygonscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const authorizeStream = async (playbackId) => {
    try {
      setJwt("");
      setLoading(true);
      toast.info("Checking authorization...");
      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: "mumbai",
      });
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessControlConditions,
          authSig,
          chain: "mumbai",
          resourceId: {
            ...resourceId,
            extraData: playbackId,
          },
          playbackId,
        }),
      });
      const data = await response.json();
      console.log(data);
      console.log(Object.keys(data?.error).length);
      // check if response is successful
      if (!response.ok || (data?.error && Object.keys(data?.error).length)) {
        if (!Object.keys(data?.error).length) {
          return toast.info("Authorization successful!");
        }
        console.log("api err", data);
        setLoading(false);
        if (data?.error?.errorCode === "not_authorized")
          return toast.error(
            "You are not authorized to view stream. Make sure you have the NFT. if not, go to the marketplace and mint one."
          );
        if (data?.error?.errorCode === "resource_id_not_found") {
          setJwt("no_token");
          return toast.info(
            "Resource not found with Lit. Playing stream normally."
          );
        }
        return toast.error(data.message || "Something went wrong!");
      }
      setJwt(data.token);
      console.log("token: ", data.token);
      setLoading(false);
      toast.info("Authorization successful!");
    } catch (err) {
      setLoading(false);
      console.log("error: ", err);
      toast.error(err.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (playbackId) {
      setInputPlaybackId(playbackId);
      authorizeStream(playbackId);
    }
  }, [playbackId]);

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet{" "}
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>aniMATE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.pageContainer}>
        {currentAccount === "" ? (
          renderNotConnectedContainer()
        ) : (
          <button
            onClick={askContractToDepositMoney}
            className="cta-button connect-wallet-button"
          >
            Tip Creator{" "}
          </button>
        )}
        <h2>Watch Stream</h2>
        <b>Notice:</b> You need to own a{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://mumbai.polygonscan.com/address/0xb18bb99c7849D39a27395dE2f412cc470f76947E"
        >
          zk verified 18+ NFT to view.{" "}
        </a>
        <label className={styles.label} htmlFor="playbackId">
          Playback ID
        </label>
        <input
          className={styles.input}
          name="playbackId"
          type="text"
          placeholder="Enter playbackId or ipfs hash and press enter"
          value={inputPlaybackId}
          onKeyUp={(e) => {
            // if enter key is pressed
            if (e.key === "Enter") {
              console.log("enter key pressed");
              authorizeStream(inputPlaybackId);
              // just append playbackId to url
              router.push(
                {
                  pathname: "/watch",
                  query: { id: inputPlaybackId },
                },
                undefined,
                { shallow: true }
              );
            }
          }}
          onChange={(e) => setInputPlaybackId(e.target.value)}
        />
        {inputPlaybackId && jwt && (
          <Player
            title={playbackId}
            playbackId={playbackId}
            src={
              playbackId.startsWith("Qm") || playbackId.startsWith("baf")
                ? `https://ipfs.io/ipfs/${playbackId}`
                : `https://lp-playback.com/hls/${playbackId}/index.m3u8`
            }
            loop
            autoPlay
            muted
            showLoadingSpinner
            controls={{
              hotkeys: true,
              autoHide: 3500,
            }}
            showPipButton
            jwt={jwt}
          />
        )}
        <PulseLoader loading={loading} color="#0070f3" speedMultiplier={1} />
        <div>
          <h1>Your current Tokens</h1>
          <ul>
            {loadingBal && <p>Loading</p>}
            {error && <p>Something went wrong...</p>}
            {data &&
              data.TokenBalances.TokenBalance.map((tok) => (
                <li key={tok.id}>{tok.token.name}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
