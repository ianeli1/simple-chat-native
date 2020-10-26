import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { AvatarNameCombo } from "../AvatarNameCombo";
import { StackList } from "../../screens/Settings";
import { Avatar } from "../Avatar";
import { userContext } from "../Providers/UserProvider";
import { Loading } from "../Loading";

export function Home({
  navigation,
}: {
  navigation: StackNavigationProp<StackList, "Home">;
}) {
  const [expand, setExpand] = useState(true);
  const { user, loading } = useContext(userContext);
  return loading ? (
    <Loading />
  ) : (
    <ScrollView contentContainerStyle={styles.root}>
      <AvatarNameCombo
        title={user!.name}
        subtitle={user!.id}
        onAvatarClick={() => null}
      />
      <View style={styles.list}>
        <List.Item
          title="Profile"
          description="User information, friends, servers..."
          left={(props) => <List.Icon {...props} icon="account" />}
          onPress={() => navigation.navigate("Profile")}
        />
        <List.Section title="Servers">
          <List.Accordion
            title="Your servers"
            left={(props) => <List.Icon {...props} icon="forum-outline" />}
            expanded={expand}
            onPress={() => setExpand((expand) => !expand)}
          >
            {user?.servers.map(({ id, name }) => (
              <List.Item
                onPress={() => navigation.navigate("Server", { serverId: id })}
                title={name}
                left={() => <Avatar label={name} />}
                key={id}
              />
            ))}
          </List.Accordion>
        </List.Section>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  list: {
    width: "100%",
  },
});
