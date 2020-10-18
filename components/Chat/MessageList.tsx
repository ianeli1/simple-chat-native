import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Message } from "./Message";

const dummyMessages: Message[] = [
  {
    id: 1,
    message: "test1",
    name: "longusernamehahaitneverends",
    timestamp: new Date(),
    userId: "1",
  },
  {
    id: 2,
    message: "test1",
    name: "user1",
    timestamp: new Date(),
    userId: "1",
  },
  {
    id: 3,
    message: "longtexthahaomgdoesiteverendfuckthedeveloperlmao",
    name: "user1",
    timestamp: new Date(),
    userId: "1",
  },
  {
    id: 4,
    message: "test1",
    name: "user1",
    timestamp: new Date(),
    userId: "1",
  },
];

export function MessageList() {
  return (
    <FlatList
      data={dummyMessages}
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
