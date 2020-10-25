import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, StyleSheet, Text } from "react-native";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.state.hasError ? (
        <View>
          <Text>{JSON.stringify(this.state.error, null, 2)}</Text>
        </View>
      ) : (
        this.props.children
      );
    }

    return this.props.children;
  }
}
