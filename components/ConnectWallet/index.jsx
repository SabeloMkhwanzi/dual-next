/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Center, Group, Text } from "@mantine/core";
import { IoWallet } from "react-icons/io5";

export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                border: "2px solid red",
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    radius="md"
                    variant="default"
                    leftIcon={<IoWallet size={"28px"} color="#01FEE4" />}
                    onClick={openConnectModal}
                  >
                    <Text
                      style={{ letterSpacing: "0.3px" }}
                      color="gray.5"
                      fw="700"
                      className="ultra"
                    >
                      Connect Wallet
                    </Text>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return <Button onClick={openChainModal}>Wrong network</Button>;
              }

              return (
                <Group>
                  <Center onClick={openChainModal}>
                    {chain.hasIcon && (
                      <Center>
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 26, height: 26 }}
                          />
                        )}
                      </Center>
                    )}
                  </Center>
                  <Button
                    width="fullWidth"
                    radius="md"
                    variant="default"
                    onClick={openAccountModal}
                    leftIcon={<IoWallet size={"28px"} color="#01FEE4" />}
                  >
                    <Text
                      style={{ letterSpacing: "0.3px" }}
                      color="gray.5"
                      fw="700"
                      className="ultra"
                    >
                      {account.displayName}
                    </Text>
                  </Button>
                </Group>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
