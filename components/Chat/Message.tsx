import React, { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Avatar } from "../Avatar";
import { GetChannelQuery } from "../../generated/graphql";

interface MessageProps {
  message: NonNullable<GetChannelQuery["channel"]["channel"]>["messages"][0];
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
  return useMemo(
    () => (
      <View style={styles.root}>
        <Avatar label={author.name} icon={author.icon ?? undefined} size={48} />
        <TouchableHighlight
          containerStyle={styles.root}
          style={styles.message}
          onPress={props.onPress}
          onLongPress={props.onLongPress}
        >
          <View style={styles.inner}>
            <Text style={styles.author}>{author.name}</Text>
            <View style={styles.content}>
              <Text style={styles.textContent}>{message.content}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    ),
    []
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 4,
    maxWidth: "100%",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
  },
  message: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    padding: 0,
  },
  inner: {
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
