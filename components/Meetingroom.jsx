import React, { useEffect } from "react";

//import { HuddleIframe } from "@huddle01/iframe";
import { useHuddle01 } from "@huddle01/react";
import { useLobby, useAudio, useVideo, useRoom } from "@huddle01/react/hooks";
import { Button } from "@mantine/core";

const Meetingroom = () => {
  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();
  const {
    fetchAudioStream,
    stopAudioStream,
    error: micError,
    produceAudio,
    stopProducingAudio,
  } = useAudio();
  const {
    fetchVideoStream,
    stopVideoStream,
    error: camError,
    produceVideo,
    stopProducingVideo,
  } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();

  //const { peerIds } = usePeers();

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize("VwTZ4AGTxme9snANex9tep3NwvVMGfYd");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex items-center justify-center gap-4 pt-2">
        {isInitialized ? "Hello World!" : "Please initialize"}

        {/* <div className="grid grid-cols-4">
          {peerIds.map((peerId) => (
            <Video key={peer.peerId} peerId={peer.peerId} debug />
          ))}

          {peerIds.map((peerId) => (
            <Audio key={peer.peerId} peerId={peer.peerId} debug />
          ))}
        </div> */}
        <Button
          className="tracking-wider ultra"
          variant="default"
          enabled={joinLobby.isCallable}
          onClick={() => joinLobby("2222")}
        >
          Join Lobby
        </Button>

        <Button
          className="tracking-wider ultra"
          variant="default"
          enabled={!fetchAudioStream.isCallable}
          onClick={fetchAudioStream}
        >
          FETCH AUDIO STREAM
        </Button>

        <Button
          className="tracking-wider ultra"
          variant="default"
          enabled={!fetchVideoStream.isCallable}
          onClick={fetchVideoStream}
        >
          FETCH VIDEO STREAM
        </Button>

        {/* 
        <Button
          className="tracking-wider ultra"
          variant="default"
          enabled={!joinRoom.isCallable}
          onClick={joinRoom}
        >
          JOIN ROOM
        </Button>

        <Button
          className="tracking-wider ultra"
          variant="default"
          enabled={!leaveRoom.isCallable}
          onClick={leaveRoom}
        >
          LEAVE ROOM
        </Button>

        <Button
          className="tracking-wider ultra"
          variant="default"
          enabled={!produceVideo.isCallable}
          //onClick={() => produceVideo(camStream)}
        >
          Produce Cam
        </Button>

        <Button
          className="tracking-wider ultra"
          variant="default"
          enabled={!produceAudio.isCallable}
          // onClick={() => produceAudio(micStream)}
        >
          Produce Mic
        </Button>

        <Button
          className="tracking-wider ultra"
          variant="default"
          enabled={!stopProducingVideo.isCallable}
          onClick={stopProducingVideo}
        >
          Stop Producing Cam
        </Button>

        <Button
          className="tracking-wider ultra"
          variant="default"
          enabled={!stopProducingAudio.isCallable}
          onClick={stopProducingAudio}
        >
          Stop Producing Mic
        </Button> */}
      </div>
    </div>
  );
};

export default Meetingroom;
