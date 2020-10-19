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

export function Sidebar() {
  const { user } = useContext(userContext);
  const { setCurrentServer, currentServer, serverData } = useContext(
    serverContext
  );
  const { setCurrentChannel, currentChannel } = useContext(channelContext);
  return (
    <View style={styles.root}>
      <ScrollView style={styles.serverList}>
        <AvatarScroller
          vertical
          elements={
            (user || null)?.servers?.map(
              (serverId, i) => ({ key: serverId, name: serverId } as ASElement)
            ) || []
          }
          onElementClick={(serverId) => setCurrentServer(serverId)}
        />
      </ScrollView>
      <ScrollView>
        <TouchableRipple style={styles.titleBtn} onPress={() => null}>
          <View style={styles.title}>
            <Title style={{ flexShrink: 1, flexGrow: 1, lineHeight: 20 }}>
              {currentServer}
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
          elements={
            serverData?.channels.map(
              (channel) => ({ key: channel, name: channel } as ASElement)
            ) || []
          }
          onPress={(key) => setCurrentChannel(key)}
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
