import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { AvatarNameCombo } from "../AvatarNameCombo";
import { Loading } from "../Loading";
import { userContext } from "../Providers/UserProvider";
import { RectangleScroller } from "../RectangleScroller";
import { Widget } from "../Widget";

export function Profile() {
  const { user, loading } = useContext(userContext);
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
          onNegative={() => null}
        />
      </Widget>
    </ScrollView>
  );
}
