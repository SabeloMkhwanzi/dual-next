import { useState } from "react";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import * as PushAPI from "@pushprotocol/restapi";
import { Textarea, Button, Modal } from "@mantine/core";

dotenv.config();

export default function Home() {
  const [messageContent, setMessageContent] = useState("");
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendMessage = async () => {
    const walletPrivateKey = process.env.NEXT_PUBLIC_APP_CHANNEL_PK;
    const env = ENV.STAGING;
    const provider = ethers.getDefaultProvider(5);
    const Pkey = `0x${walletPrivateKey}`;
    const signer = new ethers.Wallet(Pkey, provider);

    try {
      // Fetch user
      const user = await PushAPI.user.get({
        account: `eip155:${signer.address}`,
        env,
      });

      if (!user) {
        console.error("User not found.");
        return;
      }

      // Decrypt PGP Key
      const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
        encryptedPGPPrivateKey: user.encryptedPrivateKey,
        signer: signer,
      });

      // Actual API call
      const response = await PushAPI.chat.send({
        messageContent,
        messageType: "Text", // can be "Text" | "Image" | "File" | "GIF"
        receiverAddress: "eip155:0x2BE1CA5900044187536D31B1a28cC6bb2bd88772",
        signer: signer,
        pgpPrivateKey: pgpDecryptedPvtKey,
        env: env as ENV,
      });

      console.log("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <Button
        className="tracking-wider ultra"
        variant="default"
        radius="lg"
        onClick={() => setIsModalOpen(true)}
      >
        Send A Message
      </Button>
      <Modal
        radius="lg"
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Send Message via Push Protocol"
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Textarea
          my={5}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Write your message"
        />
        <Button
          my={5}
          className="tracking-wider ultra"
          variant="default"
          radius="lg"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Modal>
    </div>
  );
}
