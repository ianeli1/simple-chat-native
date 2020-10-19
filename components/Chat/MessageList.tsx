import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { channelContext } from "../Providers/ChannelProvider";
import { Message } from "./Message";

export function MessageList({ messages }: { messages: Message[] }) {
  const { channel } = useContext(channelContext);
  return (
    <FlatList
      data={messages}
      renderItem={({ item: message }) => <Message message={message} />}
      keyExtractor={({ id }) => id.toString()}
      style={styles.messageList}
    />
  );
}

const styles = StyleSheet.create({
  messageList: {
    flexGrow: 1,
  },
});
