import React, { useContext, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Avatar } from "../Avatar";
import { GetChannelQuery } from "../../generated/graphql";
import { dialogContext } from "../Providers/DialogProvider";
import { Emote } from "./EmoteDrawer";

interface MessageProps {
  message: NonNullable<GetChannelQuery["channel"]["channel"]>["messages"][0];
  onLongPress?: () => void;
  onPress?: () => void;
}

function CoolText({ children }: { children: string }) {
  return <Text style={styles.textContent}>{children}</Text>;
}

/**
 * Singular message element
 * @param {message} The message to be drawn
 */
export function Message(props: MessageProps) {
  const { message } = props;
  const { author } = message;
  const { showUserProfile } = useContext(dialogContext);

  function splitString(content: string) {
    const emoteRegex = /:[a-zA-Z0-9]+<(.*?)>:/g;
    const output: JSX.Element[] = [];
    let k: ReturnType<typeof emoteRegex.exec>;
    let lastIndex = 0;
    while ((k = emoteRegex.exec(content))) {
      output.push(
        <CoolText key={lastIndex + "t"}>
          {content.slice(lastIndex, k.index)}
        </CoolText>
      );
      const uri =
        message.emotes?.find(({ id }) => id === +k![1])?.image ?? null;
      uri && output.push(<Emote key={lastIndex + "e"} uri={uri} />);
      lastIndex += k.index + k[0].length;
    }
    return [
      ...output,
      <CoolText key={lastIndex + "tt"}>{content.slice(lastIndex)}</CoolText>,
    ];
  }

  return useMemo(
    () => (
      <View style={styles.root}>
        <Avatar
          label={author.name}
          icon={author.icon ?? undefined}
          size={48}
          onPress={() => showUserProfile({ userId: author.id })}
        />
        <TouchableHighlight
          containerStyle={styles.root}
          style={styles.message}
          onPress={props.onPress}
          onLongPress={props.onLongPress}
        >
          <View style={styles.inner}>
            <Text style={styles.author}>{author.name}</Text>
            <View style={styles.content}>{splitString(message.content)}</View>
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
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 5,
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
