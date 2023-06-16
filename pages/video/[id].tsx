import { useRouter } from "next/router";
import { HeaderNav, Sidebar } from "../../layout";
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
  }, [id]);

  return (
    <Background className="flex flex-row w-full">
      <Sidebar updateCategory={undefined} />
      <div className="flex flex-col flex-1">
        <HeaderNav search={undefined} />
        {video && (
          <div className="flex flex-col justify-between m-10 lg:flex-row">
            <div className="w-6/6 lg:w-4/6">
              <VideoPlayer id={video.hash} />
              <div className="flex flex-row justify-between py-4 border-b-2 border-border-light dark:border-border-dark">
                <div>
                  <h3 className="text-2xl capitalize text-transform: dark:text-white">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-gray-500 ">{video.category} </p>
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center mt-5 ">
                  <div className="w-12">
                    <Avvvatars value={video.author.slice(2, 13)} size={50} />
                  </div>
                  <div className="flex flex-col ml-3">
                    <p className="flex items-center mt-1 text-black text-md dark:text-white">
                      {video.author.slice(0, 13)}...{" "}
                      <BiCheck size="20px" className="ml-1 fill-gray" />
                    </p>
                    <p className="flex items-center text-sm text-subtitle-light ">
                      Video by {video.author}
                    </p>
                  </div>
                </div>
                <p className="mt-4 ml-16 text-sm text-text-light dark:text-text-dark text-textSubTitle">
                  {video.description}
                </p>
                <h5 className="mt-8 text-xl dark:text-white ">
                  Deal Information
                </h5>
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
              <h4 className="mb-3 ml-5 font-bold text-black text-md dark:text-white">
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
  );
}
