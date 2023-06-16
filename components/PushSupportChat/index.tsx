import React from "react";
import { Chat, ITheme } from "@pushprotocol/uiweb";
import { useAccount } from "wagmi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";

const env = ENV.STAGING;

export default function PushSupportChat() {
  const { address } = useAccount();

  const theme: ITheme = {
    bgColorPrimary: "#1A1B1E",
    bgColorSecondary: "purple",
    textColorPrimary: "white",
    textColorSecondary: "white",
    btnColorPrimary: "#BB41CF",
    btnColorSecondary: "purple",
    border: "0.01rem solid #393a3d",
    borderRadius: "40px",
    moduleColor: "#25262B",
  };

  return (
    <div>
      <Chat
        modalTitle="Daul Team👋"
        account={address} //user address
        supportAddress="0xE80A069c2077758E9C091C1FBB1FDEa93ac40523" //support address
        env={env}
        theme={theme}
        signer={undefined}
      />
    </div>
  );
}
