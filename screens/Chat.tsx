import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { MessageList } from "../components/Chat/MessageList";
import { NewMessageBox } from "../components/Chat/NewMessageBox";
import { Sidebar } from "../components/Chat/Sidebar";
import { TopBar } from "../components/Chat/TopBar";

export function Chat() {
  const drawerProps = {
    drawerWidth: 300,
    drawerType: "slide" as const,
    drawerBackgroundColor: "#000",
    edgeWidth: 2000,
  };
  let drawer: DrawerLayout | null;
  return (
    <View style={styles.root}>
      <DrawerLayout
        {...drawerProps}
        drawerPosition="left"
        renderNavigationView={() => <Sidebar />}
        ref={(d) => {
          drawer = d;
        }}
      >
        <View style={styles.test}>
          <TopBar onMenu={() => drawer?.openDrawer()} title="epic channel" />
          <MessageList />
          <NewMessageBox />
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
