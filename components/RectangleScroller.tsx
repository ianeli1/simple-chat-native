import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { Avatar } from "./Avatar";

interface RectangleScrollerProps<T extends string | number> {
  elements: ASElement<T>[];
  showIcon?: boolean;
  onPress?: (key: T) => void;
  onPositive?: (key: T) => void;
  onNegative?: (key: T) => void;

  /**Text to be displayed if the element array is empty */
  placeholder?: string;
}

//TODO: add a way to mark element as disabled
export function RectangleScroller<T extends string | number>(
  props: RectangleScrollerProps<T>
) {
  return props.elements.length > 0 ? (
    <ScrollView contentContainerStyle={styles.container}>
      {props.elements.map(({ key, name, icon }, i) => (
        <Rectangle
          key={i}
          title={name}
          showIcon={props.showIcon}
          icon={icon}
          onPositive={
            props.onPositive ? () => props.onPositive!(key) : undefined
          }
          onNegative={
            props.onNegative ? () => props.onNegative!(key) : undefined
          }
          onPress={props.onPress ? () => props.onPress!(key) : undefined}
        />
      ))}
    </ScrollView>
  ) : (
    <Text style={{ color: "#FFF" }}>
      {props.placeholder ?? "Uh oh, something went wrong"}
    </Text>
  );
}

interface RectangleProps {
  title: string;
  subtitle?: string;
  showIcon?: boolean;
  icon?: string;
  onPositive?: () => void;
  onNegative?: () => void;
  onPress?: () => void;
}

function Rectangle(props: RectangleProps) {
  const content = (
    <>
      <Text style={styles.title}>{props.title}</Text>
      {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
    </>
  );
  return (
    <View style={styles.rectangle}>
      {props.showIcon && (
        <View>
          <Avatar label={props.title} icon={props.icon} size={48} />
        </View>
      )}
      {props.onPress ? (
        <TouchableHighlight
          containerStyle={styles.rectangleText}
          onPress={props.onPress}
        >
          {content}
        </TouchableHighlight>
      ) : (
        <View style={styles.rectangleText}>{content}</View>
      )}

      {props.onPositive && (
        <IconButton icon="plus" size={48} onPress={props.onPositive} />
      )}
      {props.onNegative && (
        <IconButton icon="close" size={48} onPress={props.onNegative} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",

    margin: 4,
  },
  rectangleText: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: "#E0E0E0",
    padding: 8,
    margin: 8,
    height: 64,
    display: "flex",
    alignContent: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    color: "#FFF",
  },
  subtitle: {
    color: "#FFF",
  },
  container: {
    display: "flex",
    minWidth: 100,
  },
});
