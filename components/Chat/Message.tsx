import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Avatar } from "../Avatar";
import { GetChannelQuery } from "../../generated/graphql";

interface MessageProps {
  message: NonNullable<GetChannelQuery["channel"]>["messages"][0];
  onLongPress?: () => void;
  onPress?: () => void;
}

/**
 * Singular message element
 * @param {message} The message to be drawn
 */
export function Message(props: MessageProps) {
  const { message } = props;
  const { author } = message;
  return (
    <TouchableHighlight
      containerStyle={styles.root}
      style={styles.root}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
    >
      <View style={styles.message}>
        <Avatar label={author.name} size={48} />
        <View style={styles.inner}>
          <Text style={styles.author}>{author.name}</Text>
          <View style={styles.content}>
            <Text style={styles.textContent}>{message.content}</Text>
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
