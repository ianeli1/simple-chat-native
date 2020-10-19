import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Provider as PaperProvider, DarkTheme } from "react-native-paper";
import { UserProvider } from "./components/Providers/UserProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={DarkTheme}>
          <UserProvider>
            <Navigation colorScheme={colorScheme} />
          </UserProvider>
          <StatusBar />
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
