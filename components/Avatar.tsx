import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar as Av, Badge } from "react-native-paper";

interface AvatarProps {
  size?: number;
  /**The icon's URL */
  icon?: string;

  /**Only reads the first 2 characters */
  label: string;

  /**Only reads the first element/digit */
  badgeContent?: string | number;

  onPress?: () => void;
}

//TODO: Fix the badge

export function Avatar(props: AvatarProps) {
  const content = (
    <>
      {props.icon ? (
        <Av.Image source={{ uri: props.icon }} size={props.size} />
      ) : (
        <Av.Text
          label={props.label.slice(0, 2).toUpperCase()}
          size={props.size}
          color="#FFF"
        />
      )}
      {props.badgeContent && (
        <Badge
          size={props.size ? props.size / 3.2 : undefined}
          visible={Boolean(props.badgeContent)}
        >
          {String(props.badgeContent)[0]}
        </Badge>
      )}
    </>
  );
  const style = props.size
    ? { ...styles.root, width: props.size, height: props.size }
    : styles.root;

  return props.onPress ? (
    <TouchableOpacity onPress={props.onPress} style={style}>
      {content}
    </TouchableOpacity>
  ) : (
    <View style={style}>{content}</View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 64,
    height: 64,
    overflow: "hidden",
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
