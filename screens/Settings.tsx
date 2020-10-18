import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { AvatarNameCombo } from "../components/AvatarNameCombo";
import { List } from "react-native-paper";
import { Avatar } from "../components/Avatar";

type StackList = {
  Home: undefined;
};

const Stack = createStackNavigator<StackList>();

export function Settings() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
}

function Home({
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
        />
        <List.Section title="Servers">
          <List.Accordion
            title="Your servers"
            left={(props) => <List.Icon {...props} icon="forum-outline" />}
            expanded={expand}
            onPress={() => setExpand((expand) => !expand)}
          >
            <List.Item
              onPress={dummy}
              title="test1"
              left={(props) => <Avatar label="te" />}
            />
            <List.Item
              onPress={dummy}
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
