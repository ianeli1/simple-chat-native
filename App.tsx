import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Provider as PaperProvider, DarkTheme } from "react-native-paper";
import { UserProvider } from "./components/Providers/UserProvider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { graphQlServer } from "./secretKey";
import { getMainDefinition } from "@apollo/client/utilities";
import { DialogProvider } from "./components/Providers/DialogProvider";

const wsLink = new WebSocketLink({
  uri: graphQlServer.ws,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: graphQlServer.url,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  (wsLink as unknown) as ApolloLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  link: splitLink,
});

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#5f9ea0",
  },
} as typeof DarkTheme;

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider {...{ client }}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <UserProvider>
              <DialogProvider>
                <Navigation colorScheme={colorScheme} />
              </DialogProvider>
            </UserProvider>
            <StatusBar />
          </PaperProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
