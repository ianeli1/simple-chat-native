import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { MessageList } from "../components/Chat/MessageList";
import { NewMessageBox } from "../components/Chat/NewMessageBox";
import { Sidebar } from "../components/Chat/Sidebar";
import { TopBar } from "../components/Chat/TopBar";
import { ChannelProvider } from "../components/Providers/ChannelProvider";

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
      <ChannelProvider>
        <DrawerLayout
          {...drawerProps}
          drawerPosition="left"
          renderNavigationView={() => <Sidebar />}
          ref={(d) => {
            drawer = d;
          }}
        >
          <View style={styles.test}>
            <TopBar onMenu={() => drawer?.openDrawer()} />
            <View style={styles.chatbox}>
              <MessageList />
            </View>
            <NewMessageBox />
          </View>
        </DrawerLayout>
      </ChannelProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
  },
  test: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#222",
    flexGrow: 1,
    display: "flex",
    maxHeight: "100%",
  },
  chatbox: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
