import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Landing } from "../screens/Landing";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { Settings } from "../screens/Settings";
import { Chat } from "../screens/Chat";
import ServerProvider from "../components/Providers/ServerProvider";
import { ChannelProvider } from "../components/Providers/ChannelProvider";

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
            <ChannelProvider>
              <Chat />
            </ChannelProvider>
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

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}
