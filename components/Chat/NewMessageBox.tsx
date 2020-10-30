import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { channelContext } from "../Providers/ChannelProvider";
import { useSendMessageMutation } from "../../generated/graphql";
import { EmoteDrawer } from "./EmoteDrawer";

export function NewMessageBox() {
  const [text, setText] = useState("");
  const [showEmotes, setShowEmotes] = useState(false);
  const { currentChannel } = useContext(channelContext);
  const [sendMessage, { loading }] = useSendMessageMutation();
  return (
    <View style={styles.container}>
      <View style={styles.root}>
        <IconButton icon="image" style={styles.imageBtn} />
        <IconButton
          icon="emoticon"
          style={styles.imageBtn}
          onPress={() => setShowEmotes((v) => !v)}
        />
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
            styles.imageBtn,
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
      {showEmotes && (
        <EmoteDrawer onEmoteClick={(name) => setText((t) => t + name)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    maxHeight: "50%",
    padding: 4,
  },
  root: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
    marginTop: -8,
  },
  imageBtn: {
    backgroundColor: "#000",
    marginTop: 12,
  },
  textInput: {
    flexGrow: 1,
  },
  sendBtn: {},
});
