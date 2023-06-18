import { Textarea, Button, Modal, Center, Box, Text } from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useSearchParams } from "next/navigation";
import HeaderTitle from "../HeaderTitle";

function SendMessage({ onSend }) {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <>
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message"
          />
          <Button
            my={5}
            className="tracking-wider ultra"
            variant="default"
            radius="lg"
            onClick={() => handleSubmit()}
          >
            Send
          </Button>
        </Modal>
      </div>
    </>
  );
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    onSend(message);
    setMessage("");
  };

  const searchParams = useSearchParams();
  const creatorAddress = searchParams.get("creatorAddress");
  const { address } = useAccount();
  const dummy = useRef();
  const [messages, setMessages] = useState([
    { text: "Hello, how are you?", side: "left" },
    { text: "I am fine, thank you!", side: "right" },
  ]);

  async function createUserIfNecessary(signer) {
    let userObj = await PushAPI.user.get({
      account: `eip155:${address}`,
      env: "staging",
    });

    if (!userObj?.encryptedPrivateKey) {
      userObj = await PushAPI.user.create({
        signer: signer, // ethers.js signer
        env: "staging",
      });
    }

    const pgpDecryptedPrivateKey = await PushAPI.chat.decryptPGPKey({
      encryptedPGPPrivateKey: userObj.encryptedPrivateKey,
      signer: signer,
      env: "staging",
    });

    return { ...userObj, privateKey: pgpDecryptedPrivateKey };
  }

  async function getChats(
    account,
    pgpPrivateKey,
    creatorAddress,
    threadHash,
    limit = 40,
    env = "staging"
  ) {
    if (!threadHash) {
      threadHash = await PushAPI.chat.conversationHash({
        account: account,
        conversationId: creatorAddress,
        env: env,
      });
      threadHash = threadHash.threadHash;
    }
    if (threadHash) {
      const chats = await PushAPI.chat.history({
        account: account,
        pgpPrivateKey: pgpPrivateKey,
        threadhash: threadHash,
        toDecrypt: true,
        limit: limit,
        env: env,
      });
      const lastThreadHash = chats[chats.length - 1]?.link;
      const lastListPresent = chats.length > 0 ? true : false;
      return { chatsResponse: chats, lastThreadHash, lastListPresent };
    }
    return { chatsResponse: [], lastThreadHash: null, lastListPresent: false };
  }

  async function decryptChat(messages, connectedUser, env = "staging") {
    const decryptedChat = await PushAPI.chat.decryptConversation({
      messages: [messages],
      connectedUser,
      pgpPrivateKey: connectedUser.privateKey,
      env,
    });
    return decryptedChat[0];
  }

  async function walletToPCAIP10(account) {
    if (account.includes("eip155:")) {
      return account;
    }
    return "eip155:" + account;
  }

  async function pCAIP10ToWallet(wallet) {
    wallet = wallet.replace("eip155:", "");
    return wallet;
  }

  async function handlePushSendMessage(message) {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        let userObj = await PushAPI.user.get({
          account: `eip155:${address}`,
          env: "staging",
        });
        const pgpDecryptedPrivateKey = await PushAPI.chat.decryptPGPKey({
          encryptedPGPPrivateKey: userObj.encryptedPrivateKey,
          signer: signer,
        });
        const response = await PushAPI.chat.send({
          messageContent: message,
          messageType: "Text",
          receiverAddress: `eip155:${creatorAddress}`,
          signer: signer,
          pgpPrivateKey: pgpDecryptedPrivateKey,
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (provider) {
      const signer = provider.getSigner();
      console.log("working");
      createUserIfNecessary(signer).then((user) => {
        // Perform any necessary actions with the user object
        console.log(user);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeaderTitle />
      <Center>
        <Box mt={60}>
          <Text my={30} size="lg" className="ultra" color="dimmed" mt="md">
            Welcome to Push Chat
          </Text>
          <SendMessage onSend={handlePushSendMessage} />
        </Box>
      </Center>
    </>
  );
}
