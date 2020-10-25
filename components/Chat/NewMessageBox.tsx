import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { channelContext } from "../Providers/ChannelProvider";
import { userContext } from "../Providers/UserProvider";
import { useSendMessageMutation } from "../../generated/graphql";

export function NewMessageBox() {
  const [text, setText] = useState("");
  const { currentChannel } = useContext(channelContext);
  const [sendMessage, { loading }] = useSendMessageMutation();
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
        disabled={loading}
        onPress={async () => {
          if (text && currentChannel) {
            await sendMessage({
              variables: { content: text, id: currentChannel! },
            });
            setText("");
            console.log("clean");
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
