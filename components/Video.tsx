/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { IVideo } from "../types";
import Image from "next/image";

interface IProps {
  video: IVideo;
  horizontal?: boolean;
}

const Video: React.FC<IProps> = ({ video, horizontal }) => {
  return (
    <Link className="cursor-pointer" href={`/video/${video.id}`}>
      <div
        className={`${
          horizontal
            ? "flex flex-row mx-5 mb-5  item-center justify-center"
            : "flex flex-col m-5 w-80"
        } `}
      >
        <img
          className={
            horizontal
              ? "object-cover rounded-lg w-60  "
              : "object-cover rounded-lg w-full h-40"
          }
          src={`https://gateway.lighthouse.storage/ipfs/` + video.thumbnailHash}
          alt=""
        />
        <div className={horizontal && "ml-3  w-80"}>
          <h4 className="mt-3 font-bold text-black capitalize text-md dark:text-white text-transform:">
            {video.title}
          </h4>
          {horizontal && (
            <p className="flex items-center mt-1 text-sm text-subtitle-light">
              {video.category} • March 7, 2022
            </p>
          )}
          <p className="flex items-center mt-1 text-sm text-subtitle-light">
            {horizontal ? null : video.category + " • "}
            {video?.author?.slice(0, 9)}...{" "}
            <BiCheck size="20px" color="green" className="ml-1" />
          </p>
        </div>
      </div>
    </Link>
  );
};
export default Video;
