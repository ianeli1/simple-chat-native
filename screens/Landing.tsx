import * as React from "react";
import { ScrollView } from "react-native";
import { StyleSheet, SafeAreaView } from "react-native";
import { AvatarScroller } from "../components/AvatarScroller";
import { ErrorBoundary } from "../components/ErrorCatcher";
import { Text } from "../components/Themed";
import { Widget } from "../components/Widget";
import { version } from "../package.json";

const elements = [
  { key: "1", name: "pp" },
  { key: "1", name: "pp" },
  { key: "1", name: "pp" },
  { key: "1", name: "pp" },
  { key: "1", name: "pp" },
  { key: "1", name: "pp" },
  { key: "1", name: "pp" },
  { key: "1", name: "pp" },
];

export function Landing() {
  return (
    <ErrorBoundary>
      <ScrollView style={styles.container}>
        <Widget title="Welcome">
          <Text>
            This is an early build of SimpleChat, mind the bugs!! (v{version})
          </Text>
        </Widget>
        <Widget title="Your servers">
          <AvatarScroller elements={elements} />
        </Widget>
        <Widget title="Your friends">
          <AvatarScroller elements={elements} />
        </Widget>
        <Widget title="Public servers">
          <Text>{"Coming soon..."}</Text>
        </Widget>
      </ScrollView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16, //TODO: mind the status bar on all screens
    width: "100%",
  },
});
