import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Widget } from "../components/Widget";
import { useLoginLazyQuery } from "../generated/graphql";
import { RootStackParamList } from "../types";
import { signIn } from "../firebaseFunctions";
export function Login({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<"email" | "password" | null>(null);
  const [login, { data, loading }] = useLoginLazyQuery();
  if (!loading && data) {
    navigation.navigate("Root");
  }

  useEffect(() => {
    const unsub = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
    return () => {
      unsub();
    };
  }, [navigation]);
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
                signIn(email, password)
                  .then((token) => {
                    if (token) {
                      login({ variables: { token } });
                    }
                  })
                  .catch((e) => {
                    if (typeof e === "string") {
                      setError(e as "email" | "password");
                      switch (e) {
                        case "invalid-email":
                        case "user-not-found":
                          setError("email");
                          break;
                        case "wrong-password":
                          setError("password");
                          break;
                        default:
                          setError(null);
                          break;
                      }
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
    alignItems: "center",
    backgroundColor: "#4C7E7F",
  },
  container: {
    width: "90%",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  row: {
    margin: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
