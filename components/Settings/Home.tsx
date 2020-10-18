import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { AvatarNameCombo } from "../AvatarNameCombo";
import { StackList } from "../../screens/Settings";
import { Avatar } from "../Avatar";

export function Home({
  navigation,
}: {
  navigation: StackNavigationProp<StackList, "Home">;
}) {
  const [expand, setExpand] = useState(true);
  const dummy = () => null;
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <AvatarNameCombo
        title="Example"
        subtitle="Test2"
        onAvatarClick={() => null}
        size={128}
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
            <List.Item
              onPress={() => navigation.navigate("Server", { serverId: "idk" })}
              title="test1"
              left={(props) => <Avatar label="te" />}
            />
            <List.Item
              onPress={() =>
                navigation.navigate("Server", { serverId: "idk2" })
              }
              title="test2"
              left={(props) => <Avatar label="te" />}
            />
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
  },
  list: {
    width: "100%",
  },
});
