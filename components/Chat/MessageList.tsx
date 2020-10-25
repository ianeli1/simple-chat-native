import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ErrorBoundary } from "../ErrorCatcher";
import { channelContext } from "../Providers/ChannelProvider";
import { Message } from "./Message";

export function MessageList() {
  const { channel } = useContext(channelContext);

  const messages = channel
    ? [...channel.messages].sort(
        (a, b) => parseInt(a.createdAt) - parseInt(b.createdAt)
      )
    : [];
  return (
    <ErrorBoundary>
      <FlatList
        data={messages}
        renderItem={({ item: message }) => <Message message={message} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messageList}
      />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  messageList: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
