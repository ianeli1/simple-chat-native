import React, { useContext } from "react";
import { ScrollView, Alert } from "react-native";
import {
  useAcceptFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useLeaveServerMutation,
  useRemoveFriendMutation,
} from "../../generated/graphql";
import { AvatarNameCombo } from "../AvatarNameCombo";
import { Loading } from "../Loading";
import { userContext } from "../Providers/UserProvider";
import { RectangleScroller } from "../RectangleScroller";
import { Widget } from "../Widget";

/**
 * async (id) => {
            await leaveServer({variables: {id}})
            await refetch()
          }
 */
export function Profile() {
  const { user, loading, refetch } = useContext(userContext);
  const [leaveServer] = useLeaveServerMutation();
  const [unfriend] = useRemoveFriendMutation();
  const [removeFriendRequest] = useDeleteFriendRequestMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  return loading ? (
    <Loading />
  ) : (
    <ScrollView>
      <AvatarNameCombo
        title={user!.name}
        subtitle={user!.id}
        onAvatarClick={() => null}
      />
      <Widget title="Your servers">
        <RectangleScroller
          showIcon
          elements={user!.servers.map(({ name, id }) => ({
            key: id,
            name,
          }))}
          placeholder="You haven't joined any servers yet."
          onNegative={(_, server) => {
            Alert.alert(
              "Leave server",
              `Are you sure you want to leave "${server?.name ?? "???"}"?`,
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Leave",
                  style: "destructive",
                  onPress: async () => {
                    await leaveServer({ variables: { id: server.key } });
                    await refetch();
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        />
      </Widget>
      <Widget
        title="Your friends"
        action={{
          icon: "plus",
          onPress: () => Alert.alert("Uh oh", "TBI"), //TODO: implement this lmao
        }}
      >
        <RectangleScroller
          showIcon
          elements={user!.friends.map(({ name, id }) => ({
            key: id,
            name,
          }))}
          placeholder="You don't have any friends yet."
          onNegative={(_, friend) => {
            Alert.alert(
              "Leave server",
              `Are you sure you want to unfriend "${friend.name ?? "???"}"?`,
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Unfriend",
                  style: "destructive",
                  onPress: async () => {
                    await unfriend({ variables: { id: friend.key } });
                    await refetch();
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        />
      </Widget>
      <Widget title="Your friend requests">
        <RectangleScroller
          showIcon
          elements={user!.friendRequests.map(({ name, id }) => ({
            key: id,
            name,
          }))}
          placeholder="No friends requests here, yet."
          onNegative={async (id) => {
            await removeFriendRequest({ variables: { id } });
            await refetch();
          }}
          onPositive={async (id) => {
            await acceptFriendRequest({ variables: { id } });
            await refetch();
          }}
        />
      </Widget>
    </ScrollView>
  );
}
