import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home } from "../components/Settings/Home";
import { Profile } from "../components/Settings/Profile";
import Server from "../components/Settings/Server";

export type StackList = {
  Home: undefined;
  Profile: undefined;
  Server: { serverId: number };
};

const Stack = createStackNavigator<StackList>();

export function Settings() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Settings", headerLeft: undefined }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Server" component={Server} />
    </Stack.Navigator>
  );
}
