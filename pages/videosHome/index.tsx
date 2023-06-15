/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { NavbarHead, Footer } from "../../components";
import { AppShell, ScrollArea } from "@mantine/core";
import { Background, Video } from "../../components";
import { Header, Sidebar } from "../../layout";
import { getContract } from "../../utils/";

export default function VideosHome() {
  const [videos, setVideos] = useState([]);
  const [AllVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [category, setCategory] = useState<String>("");

  const fetchVideos = async () => {
    setLoading(true);
    let contract = await getContract();
    let videosCount = await contract.videoCount();
    console.log(String(videosCount));
    let videos = [];
    for (var i = videosCount; i >= 1; i--) {
      let video = await contract.videos(i);
      videos.push(video);
    }
    setVideos(videos);
    setAllVideos(videos);
    setLoading(false);
  };

  const filterBasedOnCategory = (category) => {
    console.log(category);
    if (category === "All") {
      setVideos(AllVideos);
    } else {
      let filteredVideos = AllVideos.filter((video) => {
        return video.category.toLowerCase().includes(category.toLowerCase());
      });
      setVideos(filteredVideos);
    }
  };

  const filterData = (e) => {
    let search = e;
    let filteredVideos = AllVideos.filter((video) => {
      return video.title.toLowerCase().includes(search.toLowerCase());
    });
    setVideos(filteredVideos);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

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
      <AppShell header={<NavbarHead />} footer={<Footer />}>
        <ScrollArea>
          <Background className="w-full">
            <div className="flex flex-row w-full">
              {/* <Sidebar
                updateCategory={(category) => filterBasedOnCategory(category)}
              /> */}
              <div className="flex flex-col flex-1 h-screen">
                {/* <Header search={(text) => filterData(text)} /> */}
                <div className="flex flex-row flex-wrap">
                  {loading ? (
                    <>
                      {Array(10)
                        .fill(0)
                        .map((_, index) => (
                          <div className="w-80">
                            <Loader />
                          </div>
                        ))}
                    </>
                  ) : (
                    videos?.map((video: any) => (
                      <Video video={video} horizontal={false} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </Background>
        </ScrollArea>
      </AppShell>
    </>
  );
}

const Loader = () => {
  return (
    <div className="flex flex-col m-5 animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-lg dark:bg-border-dark "></div>
      <div className="h-6 mt-3 bg-gray-300 rounded-md w-50 dark:bg-border-dark "></div>
      <div className="w-24 h-3 mt-3 bg-gray-300 rounded-md dark:bg-border-dark "></div>
    </div>
  );
};
