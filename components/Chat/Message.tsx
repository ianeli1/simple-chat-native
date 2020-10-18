import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Subheading } from "react-native-paper";
import { Avatar } from "../Avatar";

interface MessageProps {
  message: Message;
  onLongPress?: () => void;
  onPress?: () => void;
}

/**
 * Singular message element
 * @param {message} The message to be drawn
 */
export function Message(props: MessageProps) {
  const { message } = props;
  return (
    <TouchableHighlight
      containerStyle={styles.root}
      style={styles.root}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
    >
      <View style={styles.message}>
        <Avatar label={message.name} size={48} />
        <View style={styles.inner}>
          <Text style={styles.author}>{message.name}</Text>
          <View style={styles.content}>
            <Text style={styles.textContent}>{message.message}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 4,
    maxWidth: "100%",
    overflow: "hidden",
  },
  message: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
  },
  inner: {
    marginLeft: 8,
    padding: 4,
    borderRadius: 8,
    backgroundColor: "#000",
    minWidth: 100,
    flexShrink: 1,
  },
  content: {
    display: "flex",
  },
  author: {
    fontSize: 25,
    lineHeight: 25,
    color: "#0FF",
  },
  textContent: {
    color: "#FFF",
    fontSize: 20,
  },
});
