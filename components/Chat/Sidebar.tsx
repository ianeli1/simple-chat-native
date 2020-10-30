import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TouchableRipple, Title } from "react-native-paper";
import { AvatarScroller } from "../AvatarScroller";
import { channelContext } from "../Providers/ChannelProvider";
import { serverContext } from "../Providers/ServerProvider";
import { userContext } from "../Providers/UserProvider";
import { RectangleScroller } from "../RectangleScroller";
interface SidebarProps {
  onServerNamePress: (serverId: number) => void;
}

export function Sidebar(props: SidebarProps) {
  const { user } = useContext(userContext);
  const { currentServer, setCurrentServer, server } = useContext(serverContext);
  const { setCurrentChannel, currentChannel } = useContext(channelContext);
  const serverElements: ASElement<number>[] =
    user?.servers.map(({ id, name, icon }) => ({
      key: id,
      icon: icon ?? undefined,
      name,
    })) ?? [];
  const channels: ASElement<number>[] =
    server?.channels.map(({ id, name }) => ({
      key: id,
      name,
    })) ?? [];
  return (
    <View style={styles.root}>
      <ScrollView style={styles.serverList}>
        <AvatarScroller
          vertical
          elements={serverElements}
          onElementClick={(serverId) => {
            setCurrentServer(serverId);
            console.log("clicked on server", serverId);
          }}
        />
      </ScrollView>
      <ScrollView>
        <TouchableRipple
          style={styles.titleBtn}
          onPress={() =>
            currentServer && props.onServerNamePress(currentServer)
          }
        >
          <View style={styles.title}>
            <Title style={{ flexShrink: 1, flexGrow: 1, lineHeight: 20 }}>
              {server?.name ?? "Unk"}
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
          elements={channels}
          onPress={(key) => {
            key != currentChannel && setCurrentChannel(key);
            console.log("clicked on channel", key);
          }}
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
