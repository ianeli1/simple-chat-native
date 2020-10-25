import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useMemo } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useMyServersQuery } from "../../generated/graphql";
import { StackList } from "../../screens/Settings";
import { AvatarNameCombo } from "../AvatarNameCombo";
import { AvatarScroller } from "../AvatarScroller";
import { Loading } from "../Loading";
import { RectangleScroller } from "../RectangleScroller";
import { Widget } from "../Widget";

export default function Server({
  navigation,
  route,
}: {
  navigation: StackNavigationProp<StackList, "Server">;
  route: RouteProp<StackList, "Server">;
}) {
  const { loading, data } = useMyServersQuery();
  const server =
    data?.myServers?.find(({ id }) => id === route.params.serverId) ?? null;
  const id = route.params.serverId;
  const emotes: ASElement<number>[] = useMemo(
    () =>
      server?.emotes.map(({ id, name, image }) => ({
        key: id,
        name,
        icon: image,
      })) ?? [],
    [id]
  );
  //TODO: add confirmation screens
  //TODO: handle edge case of server not existing
  return loading ? (
    <Loading />
  ) : (
    <ScrollView contentContainerStyle={styles.root}>
      <AvatarNameCombo
        title={server!.name}
        subtitle={`ID: ${server!.id}`}
        icon={undefined /*TODO: add server icons*/}
      />
      <Widget title="This server's emotes">
        <AvatarScroller
          elements={emotes}
          placeholder="Looks like this server doesn't have any emotes yet..."
        />
      </Widget>
      <Widget title="This server's channels">
        <RectangleScroller
          elements={server!.channels.map(({ id, name }) => ({
            key: id,
            name,
          }))}
          onNegative={() => void null}
          placeholder="This server has no channels."
        />
      </Widget>

      <Widget title="[debug] OwnerId">
        <Text style={{ color: "#FFF" }}>{"TODO"}</Text>
      </Widget>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  center: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
