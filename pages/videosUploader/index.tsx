/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useRef } from "react";
import { Sidebar, HeaderNav } from "../../layout";
import { BiCloud, BiPlus } from "react-icons/bi";
import { Upload } from "../../components";
import Background from "../../components/Background";
import { getContract } from "../../utils/";
import lighthouse from "@lighthouse-web3/sdk";
import { NavbarHead, Footer } from "../../components";
import { AppShell, Image, ScrollArea } from "@mantine/core";
import Head from "next/head";
import { Spinner } from "@chakra-ui/react";

export default function VideosUploader() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>();
  const [video, setVideo] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>();

  const thumbnailRef = useRef<HTMLInputElement>(null);

  const goBack = () => {
    window.history.back();
  };

  const uploadToLighthouse = async (e, type) => {
    setIsUploading(true);
    const output = await lighthouse.upload(
      e,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY
    );
    let cid = output.data.Hash;
    if (type == "thumbnail") {
      setThumbnail(cid);
    } else {
      setVideo(cid);
    }
    setIsUploading(false);
  };

  const handleSubmit = async () => {
    let data = {
      video,
      title,
      description,
      location,
      category,
      thumbnail,
      UploadedDate: Date.now(),
    };

    await saveVideo(data);
  };

  const saveVideo = async (data) => {
    let contract = await getContract();
    await contract.uploadVideo(
      data.video,
      data.title,
      data.description,
      data.location,
      data.category,
      data.thumbnail,
      false,
      data.UploadedDate
    );
  };

  function filterBasedOnCategory(category: any) {
    throw new Error("Function not implemented.");
  }

  function filterData(text: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Head>
        <title> Video Streams - GameFi Social Platform</title>
        <meta
          name="description"
          content="Dedicated to empowering gamers to trade their collections on the decentralized Filecoin network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        header={<HeaderNav search={(text: any) => filterData(text)} />}
        footer={<Footer />}
      >
        <ScrollArea>
          <Background className="w-full">
            <div className="flex flex-row w-full h-screen">
              {/* <Sidebar updateCategory={undefined} /> */}
              <div className="flex flex-col flex-1">
                {/* <Header search={undefined} /> */}
                <div className="flex justify-start mt-5 mr-10">
                  <div className="flex items-center">
                    <button
                      className="mr-6 ultra  rounded-lg border border-gray-600 bg-transparent py-2  px-6  dark:text-[#9CA3AF]"
                      onClick={() => {
                        goBack();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isUploading}
                      className={`${
                        isUploading ? "opacity-25" : "opacity-100"
                      } flex flex-row items-center ultra  justify-between  rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700 `}
                    >
                      <BiCloud />
                      <p className="ml-2">Upload</p>
                    </button>
                    <p className="mt-2 ml-4 text-black text-md dark:text-white">
                      {isUploading && " Uploading..."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col m-10 mt-5 lg:flex-row">
                  <div className="flex flex-col lg:w-3/4 ">
                    <label className="text-sm text-gray-600  ultra dark:text-[#9CA3AF]">
                      Title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Cyber Nova  - Game Changers Unite"
                      className="border-borderWhiteGray mt-2  h-12  w-[50%] rounded-md border bg-transparent p-2 focus:outline-none dark:border-[#444752]  dark:text-white dark:placeholder:text-gray-600"
                    />
                    <label className="mt-10 ultra text-sm text-gray-600 dark:text-[#9CA3AF]">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Step into the thrilling world of gaming as a group of passionate gamers embark on an epic quest to unite the virtual realm and the real world. Join them on an exhilarating journey through a series of challenges, where they discover that true strength lies not only in their gaming skills but also in their unbreakable bond as a team. Witness their determination, camaraderie, and the power of gaming to transcend boundaries and create lifelong friendships."
                      className="border-borderWhiteGray mt-2  h-32 w-[50%] rounded-md  border bg-transparent p-2 focus:outline-none dark:border-[#444752]  dark:text-white dark:placeholder:text-gray-600"
                    />

                    <div className="mt-10 flex w-[50%] flex-row  justify-between">
                      <div className="flex flex-col w-2/5 ">
                        <label className="text-sm ultra text-gray-600  dark:text-[#9CA3AF]">
                          Location
                        </label>
                        <input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          type="text"
                          placeholder="The sprawling urban playground of Neon City"
                          className="border-borderWhiteGray mt-2 h-12 rounded-md  border bg-transparent p-2 focus:outline-none dark:border-[#444752]  dark:text-white dark:placeholder:text-gray-600"
                        />
                      </div>
                      <div className="flex flex-col w-2/5 ">
                        <label className="text-sm ultra text-gray-600  dark:text-[#9CA3AF]">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className=" border-borderWhiteGray mt-2 h-12 ultra  rounded-md border bg-transparent p-2 focus:outline-none dark:border-gray-600  dark:text-white dark:text-[#9CA3AF]"
                        >
                          <option>Reviews</option>
                          <option>Walkthroughs</option>
                          <option>Let Play</option>
                          <option>Tutorials</option>
                          <option>Gaming</option>
                          <option>Education</option>
                          <option>Trending</option>
                        </select>
                      </div>
                    </div>

                    <label className="mt-10 ultra text-sm ultra text-gray-600 dark:text-[#9CA3AF]">
                      Thumbnail
                    </label>

                    <div
                      onClick={() => {
                        thumbnailRef.current.click();
                      }}
                      className="flex items-center justify-center w-64 p-2 mt-2 border-2 border-dashed rounded-md border-borderWhiteGray h-36 dark:border-gray-600"
                    >
                      {thumbnail ? (
                        <Image
                          onClick={() => {
                            thumbnailRef.current.click();
                          }}
                          src={
                            `https://gateway.lighthouse.storage/ipfs/` +
                            thumbnail
                          }
                          alt="thumbnail"
                          className="h-full rounded-md"
                        />
                      ) : (
                        <BiPlus size={40} color="gray" />
                      )}
                    </div>

                    <input
                      type="file"
                      className="hidden"
                      ref={thumbnailRef}
                      onChange={(e) => {
                        uploadToLighthouse(e, "thumbnail");
                      }}
                    />
                  </div>

                  <Upload
                    isAudio={false}
                    setVideo={(video) => {
                      uploadToLighthouse(video, "video");
                    }}
                  />
                </div>
              </div>
            </div>
          </Background>
        </ScrollArea>
      </AppShell>
    </>
  );
}
