import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { channelContext } from "../Providers/ChannelProvider";

interface TopBarProps {
  onMenu: () => void;
}

export function TopBar(props: TopBarProps) {
  const { currentChannel } = useContext(channelContext);
  return (
    <View style={styles.root}>
      <IconButton icon="menu" onPress={props.onMenu} size={32} />
      <Text style={styles.title}>{currentChannel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#5f9ea0",
    height: 64,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    lineHeight: 28,
  },
});
