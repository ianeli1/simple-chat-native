import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "./Avatar";

interface ANCProps {
  title: string;
  subtitle?: string;
  icon?: string;
  size?: number;
  onAvatarClick?: (currIcon: string | undefined) => void;
}

export function AvatarNameCombo(props: ANCProps) {
  const avatarProps = props.onAvatarClick
    ? {
        onPress: () => props.onAvatarClick!(props.icon),
        badgeContent: "+",
      }
    : {};

  return (
    <View style={styles.root}>
      <Avatar
        icon={props.icon}
        size={props.size}
        label={props.title}
        {...avatarProps}
      />
      <View style={styles.box}>
        <Text style={styles.title}>{props.title}</Text>
        {props.subtitle && (
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: "1%",
    justifyContent: "center",
  },
  box: {
    borderLeftColor: "#E0E0E0",
    borderLeftWidth: StyleSheet.hairlineWidth,
    padding: 8,
    margin: 8,
    display: "flex",
  },
  title: {
    fontSize: 40,
    color: "#FFF",
  },
  subtitle: {
    fontSize: 20,
    color: "#FFF",
  },
});
