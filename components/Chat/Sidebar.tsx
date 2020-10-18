import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TouchableRipple, Title } from "react-native-paper";
import { AvatarScroller } from "../AvatarScroller";
import { RectangleScroller } from "../RectangleScroller";

export function Sidebar() {
  return (
    <View style={styles.root}>
      <ScrollView style={styles.serverList}>
        <AvatarScroller
          vertical
          elements={[
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
          ]}
        />
      </ScrollView>
      <ScrollView>
        <TouchableRipple style={styles.titleBtn} onPress={() => null}>
          <View style={styles.title}>
            <Title style={{ flexShrink: 1, flexGrow: 1, lineHeight: 20 }}>
              Current server name
            </Title>
            <MaterialCommunityIcons
              name="dots-vertical"
              color="#FFF"
              size={30}
              style={{ flexShrink: 0 }}
            />
          </View>
        </TouchableRipple>
        <RectangleScroller
          elements={[
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
          ]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: StatusBar.currentHeight,
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  serverList: {
    margin: 4,
    maxWidth: 72,
  },
  title: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    padding: 8,
  },
  titleBtn: {
    backgroundColor: "#5f9ea0",
    flexGrow: 1,
    maxHeight: 46,
    overflow: "hidden",
    margin: 4,
    borderRadius: 4,
  },
});
