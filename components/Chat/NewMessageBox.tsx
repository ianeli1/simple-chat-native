import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton, TextInput } from "react-native-paper";

export function NewMessageBox() {
  const [text, setText] = useState("");
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
  },
  imageBtn: {
    backgroundColor: "#000",
  },
  textInput: {
    flexGrow: 1,
  },
  sendBtn: {},
});
