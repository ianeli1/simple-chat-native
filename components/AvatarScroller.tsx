import React, { useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

interface AvatarScrollerProps {
  size?: number;
  elements: ASElement[];
  onElementClick?: (key: string) => void;
}

export function AvatarScroller(props: AvatarScrollerProps) {
  return (
    <ScrollView style={styles.root} horizontal>
      {props.elements.map(({ key, name, icon }, i) => (
        <TouchableOpacity
          onPress={
            props.onElementClick ? () => props.onElementClick!(key) : undefined
          }
          key={i}
          style={styles.element}
        >
          {icon ? (
            <Avatar.Image source={{ uri: icon }} />
          ) : (
            <Avatar.Text label={name.slice(0, 2).toUpperCase()} />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    maxHeight: 72,
  },
  element: {
    margin: 4,
  },
});
