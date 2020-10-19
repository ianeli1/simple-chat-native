import React, { createContext, useContext, useState } from "react";
import { useChannel } from "../../dataHandler/hooks";
import { serverContext } from "./ServerProvider";

export const channelContext = createContext<
  ReturnType<typeof useChannel> & {
    currentChannel: string | null;
    setCurrentChannel: (channel: string | null) => void;
  }
>(undefined!);

export function ChannelProvider({ children }: { children: React.ReactNode }) {
  const [currentChannel, setCurrentChannel] = useState<string | null>(null);
  const { currentServer } = useContext(serverContext);
  const channel = useChannel(
    currentServer || undefined,
    currentChannel || undefined
  );
  return (
    <channelContext.Provider
      value={{ ...channel, currentChannel, setCurrentChannel }}
    >
      {children}
    </channelContext.Provider>
  );
}
