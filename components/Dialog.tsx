import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Modal, Portal } from "react-native-paper";

interface DialogProps {
  children: React.ReactNode;
  onDismiss: () => void;
  visible: boolean;
  loading?: boolean;
}

export function Dialog(props: DialogProps) {
  return (
    <Portal>
      {props.loading ? (
        <ActivityIndicator color="5f9ea0" />
      ) : (
        <Modal
          visible={props.visible}
          onDismiss={props.onDismiss}
          contentContainerStyle={styles.root}
        >
          {props.children}
        </Modal>
      )}
    </Portal>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    backgroundColor: "#000",
    borderColor: "#5f9ea0",
    borderWidth: 1,
    borderStyle: "solid",
  },
});
