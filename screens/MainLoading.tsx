import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { userContext } from "../components/Providers/UserProvider";
import { RootStackParamList } from "../types";

export function MainLoading({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "Loading">;
}) {
  const { user, loading } = useContext(userContext);
  if (!loading) {
    if (user) {
      navigation.navigate("Root");
    } else {
      navigation.navigate("Login");
    }
  }
  return (
    <View style={styles.root}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>
          SimpleChat<Text style={styles.sub}>native</Text>
        </Text>
        <ActivityIndicator color="#5f9ea0" style={{ margin: 32 }} />
        {!user && <Text style={styles.info}>Authenticating...</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#5f9ea0",
    fontSize: 30,
    fontWeight: "100",
  },
  sub: {
    color: "#5f9ea0",
    fontSize: 15,
  },
  info: {
    color: "#5f9ea0",
  },
});
