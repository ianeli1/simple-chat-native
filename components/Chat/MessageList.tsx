import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { channelContext } from "../Providers/ChannelProvider";
import { Message } from "./Message";

export function MessageList() {
  const { channel } = useContext(channelContext);
  const messages = channel
    ? Object.values(channel).sort(
        (a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()
      )
    : [];
  return (
    <FlatList
      data={messages}
      renderItem={({ item: message }) => <Message message={message} />}
      keyExtractor={(item) => item.id?.toString() || item.timestamp.toString()}
      style={styles.messageList}
    />
  );
}

const styles = StyleSheet.create({
  messageList: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
