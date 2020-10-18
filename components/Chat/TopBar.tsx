import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

interface TopBarProps {
  onMenu: () => void;
  title: string;
}

export function TopBar(props: TopBarProps) {
  return (
    <View style={styles.root}>
      <IconButton icon="menu" onPress={props.onMenu} size={32} />
      <Text style={styles.title}>{props.title}</Text>
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
