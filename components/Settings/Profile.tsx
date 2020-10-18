import React from "react";
import { View, Text, ScrollView } from "react-native";
import { AvatarNameCombo } from "../AvatarNameCombo";
import { RectangleScroller } from "../RectangleScroller";
import { Widget } from "../Widget";

export function Profile() {
  return (
    <ScrollView>
      <AvatarNameCombo
        title="Example"
        subtitle="Test2"
        onAvatarClick={() => null}
      />
      <Widget title="Your servers">
        <RectangleScroller
          showIcon
          elements={[
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
            { key: "1", name: "pp" },
          ]}
          onNegative={() => null}
        />
      </Widget>
    </ScrollView>
  );
}
