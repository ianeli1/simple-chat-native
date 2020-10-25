import React, { createContext, useEffect, useState } from "react";
import {
  GetChannelQuery,
  useGetChannelQuery,
  useGetChannelLazyQuery,
  useNewMessageSubscription,
  useGetChannelsLazyQuery,
  NewMessageDocument,
} from "../../generated/graphql";

interface ChannelContext {
  currentChannel: number | null;
  setCurrentChannel: (channel: number | null) => void;
  channel: Exclude<GetChannelQuery["channel"], undefined>;
}

export const channelContext = createContext<ChannelContext>(undefined!);

function useChannel(id: number | null) {
  const [
    getChannel,
    { loading, data, subscribeToMore },
  ] = useGetChannelLazyQuery({
    variables: { id: id || 0 },
    nextFetchPolicy: "network-only",
  });

  useEffect(() => {
    id && getChannel({ variables: { id } });
  }, [id]);

  useEffect(() => {
    if (!loading && data?.channel && subscribeToMore) {
      console.log("Subbing!");
      subscribeToMore({
        document: NewMessageDocument,
        variables: { id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data || !prev.channel?.messages) {
            return prev;
          } else {
            console.log("Result received:", subscriptionData.data);
            return {
              ...prev,
              channel: {
                ...prev.channel,
                messages: [
                  ...prev.channel.messages,
                  // @ts-ignore subscriptionData keeps the original types from the query and there's no easy way to fix it afaik
                  subscriptionData.data.newMessage,
                ],
              },
            };
          }
        },
      });
    }
    console.log(
      "updating channel, channel length: ",
      data?.channel?.messages.length
    );
  }, [loading, id, subscribeToMore]);

  return data?.channel ?? null;
}

export function ChannelProvider({ children }: { children: React.ReactNode }) {
  const [currentChannel, setCurrentChannel] = useState<number | null>(null);
  const channel = useChannel(currentChannel);

  return (
    <channelContext.Provider
      value={{ channel, currentChannel, setCurrentChannel }}
    >
      {children}
    </channelContext.Provider>
  );
}
