import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { MessageList } from "../components/Chat/MessageList";
import { Sidebar } from "../components/Chat/Sidebar";

export function Chat() {
  const drawerProps = {
    drawerWidth: 300,
    drawerType: "back" as const,
    drawerBackgroundColor: "#000",
    edgeWidth: 2000,
  };
  return (
    <View style={styles.root}>
      <DrawerLayout
        {...drawerProps}
        drawerPosition="left"
        renderNavigationView={() => <Sidebar />}
      >
        <View style={styles.test}>
          <MessageList />
        </View>
      </DrawerLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
  },
  background: {
    zIndex: 1,
    flex: 1,
    position: "absolute",
  },
  test: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#222",
    flexGrow: 1,
    display: "flex",
  },
});
