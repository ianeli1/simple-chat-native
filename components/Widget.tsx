import React, { useState } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";

interface WidgetProps {
  children: React.ReactNode;
  title: string;
  hideable?: boolean;
  onDelete?: () => void;
  /**
   * This widget's action, an IconButton will be added to the top left when enabled
   */
  action?: {
    /**MaterialIcon name */
    icon: string;
    onPress: () => void;
  };
}

export function Widget(props: WidgetProps) {
  const [hidden, setHidden] = useState(false);
  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
        {props.action && <IconButton {...props.action} />}
        {props.hideable && (
          <IconButton
            icon={hidden ? "chevron-up" : "chevron-down"}
            onPress={() => setHidden((hidden) => !hidden)}
          />
        )}
        {props.onDelete && <IconButton icon="close" onPress={props.onDelete} />}
      </View>
      <View style={[styles.content, { display: hidden ? "none" : "flex" }]}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 16,
    minWidth: 310,
    minHeight: 100, //TODO: remove
    maxWidth: "100%",
    maxHeight: "90%",
    //backgroundColor: "rgba(255,255,255,0.2)",
  },
  titleContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    flexGrow: 1,
    color: "#FFF",
  },
  content: {
    padding: 8,
  },
});
