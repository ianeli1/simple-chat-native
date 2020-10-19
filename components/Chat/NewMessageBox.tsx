import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { channelContext } from "../Providers/ChannelProvider";
import { userContext } from "../Providers/UserProvider";

export function NewMessageBox() {
  const [text, setText] = useState("");
  const { messageFunctions } = useContext(channelContext);
  const { user } = useContext(userContext);
  return (
    <View style={styles.root}>
      <IconButton icon="image" style={styles.imageBtn} />
      <TextInput
        value={text}
        onChangeText={(e) => setText(e)}
        style={styles.textInput}
        mode="outlined"
        dense
        placeholder="Send a new message..."
      />
      <IconButton
        icon="send"
        style={[
          styles.sendBtn,
          { backgroundColor: text.length > 0 ? "#5f9ea0" : "#000" },
        ]}
        onPress={() => {
          if (text && user) {
            const message = {
              message: text,
              userId: user.userId,
              name: user.name,
              timestamp: new Date(),
            };
            console.log("Sending message...", { message, user });
            messageFunctions?.send(message);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    marginTop: 0,
  },
  imageBtn: {
    backgroundColor: "#000",
  },
  textInput: {
    flexGrow: 1,
  },
  sendBtn: {},
});
