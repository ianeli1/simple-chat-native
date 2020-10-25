import React, { useContext, useEffect, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ErrorBoundary } from "../ErrorCatcher";
import { channelContext } from "../Providers/ChannelProvider";
import { Message } from "./Message";

export function MessageList() {
  const { channel } = useContext(channelContext);
  const scrollViewRef = useRef<ScrollView>(null);
  const messages = channel ? channel.messages.slice(-50) : [];

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [channel?.messages.slice(-1)[0]?.id || 0]);

  return (
    <ErrorBoundary>
      <ScrollView ref={scrollViewRef}>
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </ScrollView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  messageList: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
