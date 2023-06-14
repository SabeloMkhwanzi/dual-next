import { Button } from "@mantine/core";
import React, { useState } from "react";

export default function index() {
  // Creating a function to connect user's wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      // Checking if user have Metamask installed
      if (!ethereum) {
        // If user doesn't have Metamask installed, throw an error
        alert("Please install MetaMask");
        return;
      }

      // If user has Metamask installed, connect to the user's wallet
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // At last save the user's wallet address in browser's local storage
      localStorage.setItem("walletAddress", accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Creating a hero component with black background and centering everything in the screen */}
      <section className="relative flex flex-col items-center justify-center h-screen bg-black">
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="pb-12 text-center md:pb-16">
              <h1
                className="mb-4 text-5xl font-extrabold tracking-tighter text-white md:text-6xl leading-tighter"
                data-aos="zoom-y-out"
              >
                It is YouTube, but{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                  Decentralized
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="mb-8 text-xl text-gray-400"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  A YouTube Clone built on top of FVM, allow users to create,
                  share and watch videos, without worrying about their privacy.
                </p>
                <Button
                  variant="default"
                  radius="md"
                  onClick={() => {
                    // Calling the connectWallet function when user clicks on the button
                    connectWallet();
                  }}
                >
                  <span>Connect wallet</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
