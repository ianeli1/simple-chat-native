import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import {
  useChangeServerIconMutation,
  useCreateChannelMutation,
  useCreateEmoteMutation,
  useCreateInviteMutation,
  useGetServerQuery,
  useRemoveInviteMutation,
} from "../../generated/graphql";
import { StackList } from "../../screens/Settings";
import { AvatarNameCombo } from "../AvatarNameCombo";
import { AvatarScroller } from "../AvatarScroller";
import { Loading } from "../Loading";
import { dialogContext } from "../Providers/DialogProvider";
import { RectangleScroller } from "../RectangleScroller";
import { Widget } from "../Widget";

export default function Server({
  navigation,
  route,
}: {
  navigation: StackNavigationProp<StackList, "Server">;
  route: RouteProp<StackList, "Server">;
}) {
  const id = route.params.serverId;
  const { data, refetch, loading } = useGetServerQuery({
    skip: !route.params.serverId,
    variables: { id },
  });
  const { selectImage, inputText } = useContext(dialogContext);
  const [changeIcon] = useChangeServerIconMutation();
  const [addEmote] = useCreateEmoteMutation();
  const [createInvite] = useCreateInviteMutation();
  const [removeInvite] = useRemoveInviteMutation();
  const [createChannel] = useCreateChannelMutation();
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

  async function onEmoteAdd() {
    const imageUrl = await selectImage({
      title: "Emote",
      subtitle: "Select your image",
    });
    if (imageUrl) {
      const name = ((await inputText({
        title: "Name of the emote",
        fields: ["Name"],
      })) ?? [Date.now().toString()])[0];
      const req = await addEmote({ variables: { id, imageUrl, name } });
      if (req.data?.createEmote.error) {
        Alert.alert("Error", req.data.createEmote.error.message);
      } else {
        await refetch({ id });
      }
    }
  }

  async function onInviteAdd() {
    await createInvite({ variables: { id } });
    await refetch({ id });
  }

  async function onInviteRemove(id: number) {
    await removeInvite({ variables: { id } });
    await refetch();
  }

  async function onChannelAdd() {
    const text = await inputText({ title: "Channel name", fields: ["Name"] });
    if (text) {
      const req = await createChannel({ variables: { id, name: text[0] } });
      if (req.data?.createChannel.error) {
        Alert.alert("Error", req.data.createChannel.error.message);
      } else {
        await refetch();
      }
    }
  }

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
        icon={server.icon ?? undefined}
        onAvatarClick={async () => {
          const imageUrl = await selectImage({
            title: "Server Icon",
            subtitle: server.name,
          });
          if (imageUrl) {
            const result = await changeIcon({ variables: { imageUrl, id } });
            const error = result.data?.changeServerIcon.error ?? null;
            if (error) {
              Alert.alert(error.code, `${error.message} | ${imageUrl}`);
            }
            await refetch({ id });
          }
        }}
      />
      <Widget
        title="This server's emotes"
        action={{ icon: "plus", onPress: onEmoteAdd }}
      >
        <AvatarScroller
          elements={emotes}
          placeholder="Looks like this server doesn't have any emotes yet..."
        />
      </Widget>
      <Widget
        title="This server's channels"
        action={{ icon: "plus", onPress: onChannelAdd }}
      >
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

      <Widget
        title="This server's invites"
        action={{ icon: "plus", onPress: onInviteAdd }}
      >
        <RectangleScroller
          elements={server!.invites.map(({ id, expire }) => ({
            key: id,
            name: `${id}: Expires on ${expire ?? "NEVER!"}`,
          }))}
          onNegative={onInviteRemove}
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
