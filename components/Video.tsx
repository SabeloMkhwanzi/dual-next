/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { IconDiscountCheckFilled, IconDotsVertical } from "@tabler/icons-react";
import { IVideo } from "../types";
import {
  Avatar,
  Badge,
  Group,
  Image,
  Stack,
  Text,
  ActionIcon,
} from "@mantine/core";
import { AvatarGenerator } from "random-avatar-generator";

interface IProps {
  video: IVideo;
  horizontal?: boolean;
}

const Video: React.FC<IProps> = ({ video, horizontal }) => {
  // random Avatar generator
  const generator = new AvatarGenerator();

  //Random number for date using npm = random-number
  var rn = require("random-number");
  var options = {
    min: 2,
    max: 10,
    integer: true,
  };

  return (
    <Link className="cursor-pointer" href={`/video/${video.id}`}>
      <div
        className={`${
          horizontal
            ? "flex flex-row mx-5 mb-5  item-center justify-center"
            : "flex flex-col m-5 w-80"
        } `}
      >
        <Image
          radius="lg"
          className={
            horizontal
              ? "object-cover rounded-lg w-90  "
              : "object-cover rounded-lg w-full h-40"
          }
          src={`https://gateway.lighthouse.storage/ipfs/` + video.thumbnailHash}
          alt=""
        />
        <div className={horizontal && "ml-3  w-80"}>
          <div>
            <Group mt={25}>
              <Avatar src={generator.generateRandomAvatar()} alt="it's me" />
              <Text style={{ letterSpacing: "0.5px" }} fw="600" fs="900">
                {video.title}
              </Text>
            </Group>
          </div>

          <Stack spacing="-5px">
            <Text
              style={{ letterSpacing: "0.5px" }}
              color="gray.5"
              className="flex items-center mt-1 text-xs ultra text-subtitle-light"
            >
              {video?.author?.slice(0, 9)}...{" "}
              <ActionIcon color="blue.9" variant="transparent">
                <IconDiscountCheckFilled size="20px" className="ml-1" />
              </ActionIcon>
            </Text>

            <Text
              style={{ letterSpacing: "0.5px" }}
              display="flex"
              align="center"
              mt={1}
              size="xs"
              className="ultra"
            >
              {rn(options)} views •{rn(options)} days ago
              <Badge
                mx={5}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
              >
                {horizontal ? null : video.category}
              </Badge>
            </Text>
            <Text></Text>
          </Stack>
        </div>
      </div>
    </Link>
  );
};
export default Video;
