import React, { useContext } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { MessageList } from "../components/Chat/MessageList";
import { NewMessageBox } from "../components/Chat/NewMessageBox";
import { Sidebar } from "../components/Chat/Sidebar";
import { TopBar } from "../components/Chat/TopBar";
import {
  channelContext,
  ChannelProvider,
} from "../components/Providers/ChannelProvider";
import ServerProvider, {
  serverContext,
} from "../components/Providers/ServerProvider";

const dummyMessages: Message[] = [
  {
    id: 1,
    message: "test1",
    name: "longusernamehahaitneverends",
    timestamp: new Date(),
    userId: "1",
  },
  {
    id: 2,
    message: "test1",
    name: "user1",
    timestamp: new Date(),
    userId: "1",
  },
  {
    id: 3,
    message: "longtexthahaomgdoesiteverendfuckthedeveloperlmao",
    name: "user1",
    timestamp: new Date(),
    userId: "1",
  },
  {
    id: 4,
    message: "test1",
    name: "user1",
    timestamp: new Date(),
    userId: "1",
  },
];

export function Chat() {
  const drawerProps = {
    drawerWidth: 300,
    drawerType: "slide" as const,
    drawerBackgroundColor: "#000",
    edgeWidth: 2000,
  };
  let drawer: DrawerLayout | null;
  const {} = useContext(channelContext);
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
          <MessageList messages={dummyMessages} />
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
