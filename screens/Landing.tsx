import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { AvatarScroller } from "../components/AvatarScroller";
import { ErrorBoundary } from "../components/ErrorCatcher";
import { serverContext } from "../components/Providers/ServerProvider";
import { userContext } from "../components/Providers/UserProvider";
import { Text } from "../components/Themed";
import { Widget } from "../components/Widget";
import { version } from "../package.json";
import { BottomTabParamList, RootStackParamList } from "../types";

export function Landing({
  navigation,
}: {
  navigation: StackNavigationProp<BottomTabParamList, "Landing">;
}) {
  const { user } = useContext(userContext);
  const { setCurrentServer } = useContext(serverContext);
  const servers: ASElement<number>[] =
    user?.servers.map(({ id, name, icon }) => ({
      key: id,
      name,
      icon: icon ?? undefined,
    })) ?? [];
  const friends: ASElement<string>[] =
    user?.friends.map(({ id, name }) => ({
      key: id,
      name,
    })) ?? [];
  return (
    <ErrorBoundary>
      <ScrollView style={styles.container}>
        <Widget title={`Welcome, ${user?.name}`}>
          <Text>
            This is an early build of SimpleChat, mind the bugs!! (v{version})
          </Text>
        </Widget>
        <Widget title="Your servers">
          <AvatarScroller
            elements={servers}
            placeholder="You haven't joined a server yet."
            onElementClick={(key) => {
              setCurrentServer(key);
              navigation.navigate("Chat");
            }}
          />
        </Widget>
        <Widget title="Your friends">
          <AvatarScroller
            elements={friends}
            placeholder="SimpleChat is more fun with friends!"
          />
        </Widget>
        <Widget title="Public servers">
          <Text>{"Coming soon..."}</Text>
        </Widget>
      </ScrollView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16, //TODO: mind the status bar on all screens
    width: "100%",
  },
});
