import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Landing } from "../screens/Landing";
import { BottomTabParamList } from "../types";
import { Settings } from "../screens/Settings";
import { Chat } from "../screens/Chat";
import ServerProvider from "../components/Providers/ServerProvider";

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Landing"
      activeColor={Colors[colorScheme].tint}
      barStyle={styles.root}
      labeled={false}
    >
      <BottomTab.Screen
        name="Landing"
        component={Landing}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Chat"
        children={() => (
          <ServerProvider>
            <Chat />
          </ServerProvider>
        )}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="message" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#5F9EA0",
  },
});

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialCommunityIcons size={24} {...props} />;
}
