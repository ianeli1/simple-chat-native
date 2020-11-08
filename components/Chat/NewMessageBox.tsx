import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { channelContext } from "../Providers/ChannelProvider";
import { useSendMessageMutation } from "../../generated/graphql";
import { Emote, EmoteDrawer } from "./EmoteDrawer";
import { dialogContext } from "../Providers/DialogProvider";

export function NewMessageBox() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [showEmotes, setShowEmotes] = useState(false);
  const { currentChannel } = useContext(channelContext);
  const [sendMessage, { loading }] = useSendMessageMutation();
  const { selectImage } = useContext(dialogContext);

  /**Returns an array with the id of the emotes used */
  function getEmotes() {
    //TODO: add error handling
    const emoteRegex = /:[a-zA-Z0-9]+<(.*?)>:/g; // :emoteName<id>:
    let k: ReturnType<typeof emoteRegex.exec>;
    const emotes = new Set<number>();
    while ((k = emoteRegex.exec(text))) {
      emotes.add(parseInt(k[1]));
    }
    return [...emotes];
  }

  return (
    <View style={styles.container}>
      <View style={styles.root}>
        {imageUrl ? (
          <Emote uri={imageUrl} onPress={() => setImageUrl(undefined)} />
        ) : (
          <IconButton
            icon="image"
            style={styles.imageBtn}
            onPress={async () => {
              const imageUrl = await selectImage({
                title: "Pick an image",
                subtitle: ":)",
              });
              if (imageUrl) {
                setImageUrl(imageUrl);
              }
            }}
          />
        )}

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
                variables: {
                  content: text,
                  id: currentChannel!,
                  emotes: getEmotes(),
                  image: imageUrl,
                },
              });
              setText("");
              console.log("clean");
            }
          }}
        />
      </View>
      {showEmotes && (
        <EmoteDrawer
          onEmoteClick={({ name, id }) =>
            void setText(
              (t) =>
                t.length > 0 ? `${t} :${name}<${id}>:` : `:${name}<${id}>:`
              //TODO: align the emotes and stop the empty space from being added at the beginnnigng gignignigngi
            )
          }
        />
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
    maxWidth: "100%",
  },
  imageBtn: {
    backgroundColor: "#000",
    marginTop: 12,
  },
  textInput: {
    flexGrow: 1,
    flexShrink: 1,
  },
  sendBtn: {},
});
