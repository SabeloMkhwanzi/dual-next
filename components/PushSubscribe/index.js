import { useEffect } from "react";
import { ethers } from "ethers";

const PushSubscribe = () => {
  //const address = "0x123..."; // Replace with the user's Ethereum address

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      console.error("Ethereum provider not available");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      try {
        await PushAPI.channels.subscribe({
          signer,
          channelAddress: "eip155:5:0x2BE1CA5900044187536D31B1a28cC6bb2bd88772",
          userAddress: `eip155:5:${address}`,
          onSuccess: () => {
            console.log("Subscription success");
          },
          onError: () => {
            console.error("Subscription error");
          },
          env: ENV.STAGING,
        });
      } catch (error) {
        console.error("Subscription error:", error);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      <h1>Subscribe to Channel</h1>
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default PushSubscribe;
