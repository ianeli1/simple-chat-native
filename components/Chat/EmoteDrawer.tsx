import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { useMyEmotesQuery } from "../../generated/graphql";

function Emote(props: { uri: string; onPress: () => void }) {
  return useMemo(
    () => (
      <TouchableHighlight style={styles.emote} onPress={props.onPress}>
        <Image source={{ uri: props.uri, width: 40, height: 40 }} />
      </TouchableHighlight>
    ),
    []
  );
}

interface EmoteDrawerProps {
  onEmoteClick: (name: string, id: number) => void;
}

export function EmoteDrawer(props: EmoteDrawerProps) {
  const { data, loading, refetch } = useMyEmotesQuery();
  const emotes = data?.myEmotes.emotes ?? null;

  const emoteList = useMemo(
    () =>
      emotes?.map(({ id, image, name }) => (
        <Emote
          key={id}
          uri={image}
          onPress={() => props.onEmoteClick(name, id)}
        />
      )),
    [emotes?.length]
  );

  return (
    <View style={styles.root}>
      <View style={styles.bar}>
        <Text>Emote list idk</Text>
        <IconButton icon="refresh" onPress={async () => await refetch()} />
      </View>
      <ScrollView contentContainerStyle={styles.emoteContainer}>
        {emoteList}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    borderRadius: 8,
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#5f9ea0",
    borderRadius: 8,
    margin: 8,
    padding: 4,
  },
  emoteContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    flexGrow: 1,
    padding: 8,
  },
  emote: {
    margin: 4,
    padding: 4,
  },
});
