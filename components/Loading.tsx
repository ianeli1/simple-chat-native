import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export function Loading() {
  return (
    <View style={styles.root}>
      <ActivityIndicator color="#5f9ea0" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
