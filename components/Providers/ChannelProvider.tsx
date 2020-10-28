import React, { createContext, useEffect, useState } from "react";
import {
  GetChannelQuery,
  useGetChannelQuery,
  NewMessageDocument,
} from "../../generated/graphql";

interface ChannelContext {
  currentChannel: number | null;
  setCurrentChannel: (channel: number | null) => void;
  channel: Exclude<GetChannelQuery["channel"]["channel"], undefined>;
  error: Exclude<GetChannelQuery["channel"]["error"], undefined>;
}

export const channelContext = createContext<ChannelContext>(undefined!);

function useChannel(id: number | null) {
  const { loading, data, subscribeToMore, refetch } = useGetChannelQuery({
    variables: { id: id || 0 },
    skip: !id,
  });

  useEffect(() => {
    id && refetch({ id });
  }, [id]);

  useEffect(() => {
    let unsub: undefined | (() => void);
    if (!loading && subscribeToMore && id) {
      unsub = subscribeToMore({
        document: NewMessageDocument,
        variables: { id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data || !prev.channel?.channel?.messages) {
            return prev;
          } else {
            return {
              ...prev,
              channel: {
                ...prev.channel,
                channel: {
                  ...prev.channel.channel,
                  messages: [
                    ...prev.channel.channel.messages,
                    // @ts-ignore subscriptionData keeps the original types from the query and there's no easy way to fix it afaik
                    subscriptionData.data.newMessage,
                  ],
                },
              },
            };
          }
        },
      });
      return () => void (unsub && unsub());
    }
  }, [loading, id, subscribeToMore]);

  return {
    channel: data?.channel?.channel ?? null,
    error: data?.channel?.error ?? null,
  };
}

export function ChannelProvider({ children }: { children: React.ReactNode }) {
  const [currentChannel, setCurrentChannel] = useState<number | null>(null);
  const { channel, error } = useChannel(currentChannel);
  return (
    <channelContext.Provider
      value={{ channel, currentChannel, setCurrentChannel, error }}
    >
      {children}
    </channelContext.Provider>
  );
}
