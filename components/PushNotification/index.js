import NotificationItems from "../NotificationItems";
import * as PushSDK from "@pushprotocol/restapi";
import React, { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";

export default function PushNotification() {
  const [notifications, setNotifications] = useState([]);
  const { address } = useAccount();
  const signer = useSigner(address);

  useEffect(() => {
    const notifications = async () => {
      const notifs = await PushSDK.user.getFeeds({
        user: "eip155:5:0x2BE1CA5900044187536D31B1a28cC6bb2bd88772", //"0x2BE1CA5900044187536D31B1a28cC6bb2bd88772"
        env: "staging",
      });
      console.log(notifs);
      setNotifications(notifs);
      console.log(notifs);
    };
    notifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OptInChannel = async () => {
    await PushSDK.channels.subscribe({
      signer: signer,
      channelAddress: "eip155:5:0x2BE1CA5900044187536D31B1a28cC6bb2bd88772",
      userAddress: `${address}`,
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: "staging",
    });
  };

  return (
    <div>
      {notifications && (
        <NotificationItems
          OptInChannel={OptInChannel}
          notifications={notifications}
        />
      )}
    </div>
  );
}
