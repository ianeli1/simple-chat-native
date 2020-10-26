import React, { useCallback } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

interface AvatarScrollerProps<T extends string | number> {
  size?: number;
  elements: ASElement<T>[];
  onElementClick?: (key: T, element: ASElement<T>) => void;
  vertical?: boolean;

  /**Text to be displayed if the element array is empty */
  placeholder?: string;
}

export function AvatarScroller<T extends string | number>(
  props: AvatarScrollerProps<T>
) {
  return props.elements.length > 0 ? (
    <ScrollView style={styles.root} horizontal={!props.vertical}>
      {props.elements.map((element, i) => (
        <TouchableOpacity
          onPress={
            props.onElementClick
              ? () => props.onElementClick!(element.key, element)
              : undefined
          }
          key={i}
          style={styles.element}
        >
          {element.icon ? (
            <Avatar.Image source={{ uri: element.icon }} />
          ) : (
            <Avatar.Text label={element.name.slice(0, 2).toUpperCase()} />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <Text style={{ color: "#FFF" }}>
      {props.placeholder ?? "Uh oh, something went wrong"}
    </Text>
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
