import React, { useState, useEffect } from "react";
import { useCreateStream, useStream } from "@livepeer/react";
import { client, exploreProfiles } from "../api/lens";

const HUDDLE_API_KEY = "VwTZ4AGTxme9snANex9tep3NwvVMGfYd";

const TournamentForm = () => {
  const [name, setName] = useState("");
  const [tournamentType, setTournamentType] = useState("");
  const [buyInAmount, setBuyInAmount] = useState("");

  const [streamName, setStreamName] = useState("testing");
  const [huddleRoom, setHuddleRoom] = useState("");
  const [huddleMeeting, setHuddleMeeting] = useState("");
  const [huddleRoomName, setHuddleRoomName] = useState("");

  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);

  async function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      /* fetch profiles from Lens API */
      let response = await client.query({ query: exploreProfiles });
      /* loop over profiles, create properly formatted ipfs image links */
      let profileData = await Promise.all(
        response.data.exploreProfiles.items.map(async (profileInfo) => {
          let profile = { ...profileInfo };
          let picture = profile.picture;
          if (picture && picture.original && picture.original.url) {
            if (picture.original.url.startsWith("ipfs://")) {
              let result = picture.original.url.substring(
                7,
                picture.original.url.length
              );
              profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
            } else {
              profile.avatarUrl = picture.original.url;
            }
          }
          return profile;
        })
      );

      /* update the local state with the profiles array */
      // setProfiles(profileData)
    } catch (err) {
      console.log({ err });
    }
  }

  const createHuddleRoom = async () => {
    const opts = {
      method: "POST",
      data: {
        title: huddleRoomName,
        hostWallets: ["0x29f54719E88332e70550cf8737293436E9d7b10b"],
      },
      headers: {
        "Content-type": "application/json",
        "x-api-key": HUDDLE_API_KEY,
      },
    };
    const resp = await fetch(
      "https://iriko.testing.huddle01.com/api/v1/create-room",
      opts
    );
    const roomId = resp?.data?.roomId;
    const meetingLink = resp?.data?.meetingLink;
    setHuddleRoom(roomId);
    setHuddleMeeting(meetingLink);
  };

  const createTournament = (e) => {
    e.preventDefault();
    const obj = {
      name,
      type: tournamentType,
      buyInAmount,
    };
    console.log(obj);
    alert(
      `tournament ${name} of type ${tournamentType} with buy in amount of ${buyInAmount} created!!`
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* {!active && (
        <button onClick={handleConnect}>
          Connect Wallet
        </button>
      )} */}
      {/* {active && ( */}

      <div className="flex flex-row gap-4">
        <input
          className="w-full max-w-xs input"
          type="text"
          placeholder="Stream name"
          onChange={(e) => setStreamName(e.target.value)}
        />

        <div>
          {!stream && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                createStream?.();
              }}
              disabled={!createStream}
            >
              Create Stream
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <input
          className="w-full max-w-xs input"
          type="text"
          placeholder="Huddle Room name"
          onChange={(e) => setHuddleRoomName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={createHuddleRoom}>
          Create Huddle Room
        </button>
      </div>

      <hr />

      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 gap-4">
        <div className="flex flex-row justify-between gap-4">
          <label htmlFor="name">Tournament Name:</label>
          <input
            className="w-full max-w-xs input"
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <label htmlFor="type">Tournament Type:</label>
          <input
            className="w-full max-w-xs input"
            id="type"
            type="text"
            value={tournamentType}
            onChange={(event) => setTournamentType(event.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <label htmlFor="buyIn">Buy-in Amount (in ETH):</label>
          <input
            className="w-full max-w-xs input"
            id="buyIn"
            type="text"
            value={buyInAmount}
            onChange={(event) => setBuyInAmount(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-accent"
          onClick={createTournament}
        >
          Create Tournament
        </button>
      </form>
      {/* )} */}
    </div>
  );
};

export default function TournamentsForm() {
  return <TournamentForm />;
}
