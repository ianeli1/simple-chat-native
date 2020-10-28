import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useGetServerQuery } from "../../generated/graphql";
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
  const { data, refetch, loading } = useGetServerQuery({
    skip: !route.params.serverId,
  });
  const id = route.params.serverId;
  const server = data?.server.server ?? null;

  useEffect(() => {
    (async () => await refetch({ id }))();
  }, [id]);

  const emotes: ASElement<number>[] = useMemo(
    () =>
      server?.emotes.map(({ id, name, image }) => ({
        key: id,
        name,
        icon: image,
      })) ?? [],
    [id]
  );
  //TODO: Query only this server
  //TODO: add kick member mutation
  //TODO: handle edge case of server not existing
  //TODO: add delete emote mutation
  //TODO: add addEmote mutation
  //TODO: add delete channel mutation
  return !server || loading ? (
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

      <Widget title="This server's members" hideable>
        <RectangleScroller
          elements={server!.members.map(({ id, name }) => ({
            key: id,
            name,
          }))}
          showIcon
        />
      </Widget>

      <Widget title="This server's invites">
        <RectangleScroller
          elements={server!.invites.map(({ id, expire }) => ({
            key: id,
            name: `${id}: Expires on ${expire ?? "NEVER!"}`,
          }))}
        />
      </Widget>

      <Widget title="This server's owner">
        <AvatarNameCombo
          title={server!.author.name}
          subtitle={server!.author.id}
        />
      </Widget>

      <Widget title="Owner options">
        <Button
          color="#F00"
          mode="contained"
          onPress={() =>
            Alert.alert(
              "Delete this server",
              `Are you sure you want to delete the server "${server?.name}"?\nThis action can't be undone.`,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => Alert.alert("Uh oh", "TBI"), //TODO: implement server deletion
                },
              ]
            )
          }
        >
          Delete this server
        </Button>
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
