import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Widget } from "../components/Widget";
import { useUser } from "../dataHandler/hooks";
import { signIn } from "../dataHandler/miscFunctions";
import { RootStackParamList } from "../types";

export function Login({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<"email" | "password" | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  if (user) {
    navigation.navigate("Root");
  }
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Widget title="Login">
          <TextInput
            placeholder="Email Adress"
            value={email}
            onChangeText={(t) => setEmail(t)}
            mode="outlined"
            textContentType="emailAddress"
            error={error === "email"}
            autoFocus
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(t) => setPassword(t)}
            mode="outlined"
            textContentType="password"
            error={error === "password"}
          />
          <View style={styles.row}>
            <Button
              disabled={loading}
              onPress={async () => {
                setLoading(true);
                signIn(email, password)
                  .then(() => {
                    setLoading(false);
                    setError(null);
                    navigation.navigate("Root");
                  })
                  .catch((e) => {
                    if (typeof e === "string") {
                      setError(e as "email" | "password");
                    } else {
                      throw e;
                    }
                  });
              }}
              mode="outlined"
            >
              Log In
            </Button>
            <Button mode="text" disabled={loading}>
              Forgot your password?
            </Button>
          </View>
        </Widget>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
