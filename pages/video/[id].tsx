import Head from "next/head";
import { useRouter } from "next/router";
import { HeaderNav } from "../../layout";
import React, { useEffect, useState } from "react";
import {
  Background,
  VideoPlayer,
  Video as RelatedVideos,
} from "../../components";
import lighthouse from "@lighthouse-web3/sdk";
import Link from "next/link";
import { BiCheck } from "react-icons/bi";
import Avvvatars from "avvvatars-react";
import { IVideo } from "../../types";
import { getContract } from "../../utils";
import {
  IconShare3,
  IconDiscountCheckFilled,
  IconGiftCard,
  IconHeartPlus,
  IconDownload,
  IconDots,
} from "@tabler/icons-react";
import pushLogo from "../../public/pushLogo.svg";

import { Footer } from "../../components";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Button,
  ScrollArea,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { AvatarGenerator } from "random-avatar-generator";

export default function Video() {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState<IVideo | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<IVideo[]>([]);
  const [deal, setDeal] = useState({});

  const fetchVideos = async () => {
    if (id) {
      let contract = await getContract();
      let video = await contract.videos(id);
      let videosCount = await contract.videoCount();
      let videos = [];
      for (var i = videosCount; i >= 1; i--) {
        let video = await contract.videos(i);
        videos.push(video);
      }
      setRelatedVideos(videos);
      setVideo(video);
      getDealInfo(video);
    }
  };

  const getDealInfo = async (video) => {
    const status = await lighthouse.dealStatus(video.hash);

    setDeal(status.data.dealStatus[0]);
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function filterData(text: any) {
    throw new Error("Function not implemented.");
  }
  // random Avatar generator
  const generator = new AvatarGenerator();

  return (
    <>
      <Head>
        <title> Videos- GameFi Social Platform</title>
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
          <Background className="flex flex-row w-full">
            <div className="flex flex-col flex-1">
              <HeaderNav search={undefined} />
              {video && (
                <div className="flex flex-col justify-between m-10 lg:flex-row">
                  <div className="w-6/6 lg:w-4/6">
                    <VideoPlayer id={video.hash} />
                    <div className="flex flex-row justify-between py-4 border-b-2 border-border-light dark:border-border-dark">
                      <div>
                        <Text
                          style={{ letterSpacing: "0.5px" }}
                          fw="600"
                          fs="900"
                        >
                          {video.title}
                        </Text>
                        <Text mt="-1" color="gray.5" className="ultra ">
                          {video.category}{" "}
                        </Text>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-2 cursor-pointer">
                        <div className="flex items-center justify-center gap-4 pt-2">
                          <Button
                            className="tracking-wider ultra"
                            variant="default"
                            radius="lg"
                          >
                            <Image
                              src={pushLogo}
                              alt="push logo"
                              width={30}
                              height={30}
                            />
                            <Text
                              className="tracking-wider ultra"
                              color="#E244BF"
                            >
                              Subscribe
                            </Text>
                          </Button>
                          <Button
                            className="tracking-wider ultra"
                            variant="default"
                            radius="lg"
                            leftIcon={<IconHeartPlus className="w-5 h-5" />}
                          >
                            like
                          </Button>
                          <Button
                            className="tracking-wider ultra"
                            variant="default"
                            radius="lg"
                            leftIcon={<IconShare3 className="w-5 h-5" />}
                          >
                            Share
                          </Button>
                          <Button
                            className="tracking-wider ultra"
                            variant="default"
                            radius="lg"
                            leftIcon={<IconDownload className="w-5 h-5" />}
                          >
                            Download Video
                          </Button>
                          <Button
                            className="tracking-wider ultra"
                            variant="default"
                            radius="lg"
                            leftIcon={<IconGiftCard className="w-5 h-5" />}
                          >
                            Buy me Snacks
                          </Button>

                          <ActionIcon
                            className="tracking-wider ultra"
                            variant="default"
                            radius="lg"
                          >
                            <IconDots className="w-15 h-15" />
                          </ActionIcon>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-row items-center mt-5 ">
                        <div className="w-12">
                          <Avatar
                            src={generator.generateRandomAvatar()}
                            size={50}
                            alt="it's me"
                          />
                        </div>
                        <div className="flex flex-col ml-3">
                          <Text
                            style={{ letterSpacing: "0.5px" }}
                            color="gray.5"
                            className="flex items-center mt-1 text-xs ultra text-subtitle-light"
                          >
                            {video.author.slice(0, 13)}...{" "}
                            <ActionIcon color="blue.9" variant="transparent">
                              <IconDiscountCheckFilled
                                size="20px"
                                className="ml-1"
                              />
                            </ActionIcon>
                          </Text>
                          <Text className="flex items-center text-sm ultra">
                            Video by {video.author}
                          </Text>
                        </div>
                      </div>
                      <Text className="mt-4 ml-16 text-md text-text-light dark:text-text-dark text-textSubTitle">
                        {video.description}
                      </Text>
                      <Text mt={1} size="xl" className="ultra">
                        Leave your Comment:
                      </Text>
                      <p className="mt-3 mb-8 text-sm text-text-light dark:text-text-dark text-textSubTitle">
                        {deal &&
                          Object.entries(deal).map(([key, val], i) => (
                            <div key={i} className="flex flex-row mt-2">
                              <pre className="text-gray-700 dark:text-gray-400">
                                {key}
                              </pre>
                              : {/* @ts-ignore  */}
                              <span className="ml-2">{val}</span>
                            </div>
                          ))}
                      </p>
                    </div>
                  </div>
                  <div className="w-2/6">
                    <h4 className="mb-3 ml-5 font-bold text-black ultra text-md dark:text-white">
                      Related Videos
                    </h4>
                    {relatedVideos.map((video) => (
                      <Link href={`/video/${video.id}`} key={video.id}>
                        <RelatedVideos video={video} horizontal={true} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Background>
        </ScrollArea>
      </AppShell>
    </>
  );
}
