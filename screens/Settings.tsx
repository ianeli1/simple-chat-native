import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { AvatarNameCombo } from "../components/AvatarNameCombo";
import { List } from "react-native-paper";
import { Avatar } from "../components/Avatar";
import { Home } from "../components/Settings/Home";
import { Profile } from "../components/Settings/Profile";

export type StackList = {
  Home: undefined;
  Profile: undefined;
  Server: { serverId: string };
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
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
