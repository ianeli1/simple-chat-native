import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AvatarNameCombo } from "./AvatarNameCombo";
import { Dialog } from "./Dialog";
import { Widget } from "./Widget";
import {
  useSendFriendRequestMutation,
  useUserQuery,
} from "../generated/graphql";
import { Button } from "react-native-paper";
import { userContext } from "./Providers/UserProvider";

export interface UserDialogProps {
  visible: boolean;
  onDismiss: () => void;
  userId: string;
}

export function UserDialog(props: UserDialogProps) {
  const id = props.userId;
  const { data, loading, refetch } = useUserQuery({
    skip: !id,
    variables: { id },
  });
  const { user } = useContext(userContext);
  const [sendFriendReq] = useSendFriendRequestMutation();

  useEffect(() => {
    refetch({ id });
  }, [id]);

  return (
    <Dialog
      loading={loading}
      onDismiss={props.onDismiss}
      visible={props.visible}
    >
      {!loading && (
        <>
          <AvatarNameCombo
            title={data?.user.user?.name ?? "unk"}
            icon={data?.user.user?.icon ?? undefined}
            subtitle={data?.user.user?.id ?? "unk"}
          />
          <Widget title="User's profile">
            <View style={styles.root}>
              <View>
                <Text style={styles.details}>
                  birthday: {data?.user.user?.birthday}
                </Text>
              </View>
              <View>
                <Button
                  onPress={() => sendFriendReq({ variables: { id } })}
                  disabled={
                    (data?.user.user?.isFriend ||
                      data?.user.user?.sentFriendRequest ||
                      user?.id === id) ??
                    true
                  }
                >
                  Send request
                </Button>
              </View>
            </View>
          </Widget>
        </>
      )}
    </Dialog>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    minHeight: 40,
    justifyContent: "space-around",
  },
  details: {
    color: "#FFF",
  },
});
