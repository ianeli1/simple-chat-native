import React, { useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

interface AvatarScrollerProps<T extends string | number> {
  size?: number;
  elements: ASElement<T>[];
  onElementClick?: (key: T) => void;
  vertical?: boolean;
}

export function AvatarScroller<T extends string | number>(
  props: AvatarScrollerProps<T>
) {
  return (
    <ScrollView style={styles.root} horizontal={!props.vertical}>
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
    overflow: "hidden",
  },
  element: {
    margin: 4,
  },
});
