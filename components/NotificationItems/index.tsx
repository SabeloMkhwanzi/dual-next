import { NotificationItem } from "@pushprotocol/uiweb";
import { Indicator, Button, ScrollArea, Menu, Tooltip } from "@mantine/core";
import { BellIcon } from "@chakra-ui/icons";
import pushLogo from "../../public/pushLogo.svg";
import Image from "next/image";

export default function NotificationItems({ notifications, OptInChannel }) {
  return (
    <div>
      <Menu width="'100%" position="bottom" withArrow shadow="md">
        <Menu.Target>
          <Tooltip multiline width={200} label="ℹ Newly released Updates">
            <Indicator offset={7} color="#4338CA" label="New" size={16}>
              <Image
                src={pushLogo}
                alt="push logo"
                width={50}
                height={50}
                id="sdk-trigger-id"
              />
            </Indicator>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown>
          <center>
            <Button
              // Subscribe LOGIC HERE
              variant="outline"
              color="green"
            >
              Subscribe
            </Button>
          </center>
          <ScrollArea style={{ height: 800 }}>
            {notifications.map((oneNotification, i) => {
              const { cta, title, message, app, icon, image, url, blockchain } =
                oneNotification;

              return (
                <NotificationItem
                  key={i} // any unique id
                  notificationTitle={title}
                  notificationBody={message}
                  cta={cta}
                  app={app}
                  icon={icon}
                  image={image}
                  url={url}
                  theme="dark"
                  chainName={blockchain}
                />
              );
            })}
          </ScrollArea>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
