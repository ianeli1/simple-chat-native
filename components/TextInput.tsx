import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Button,
  Modal,
  Portal,
  TextInput as TextInputNative,
} from "react-native-paper";
import { Widget } from "./Widget";

export interface TextInputProps {
  visible: boolean;
  onDismiss: () => void;
  onPositive: (fields: string[]) => void;
  fields: string[];
  title: string;
}

export function TextInput(props: TextInputProps) {
  const [values, setValues] = useState<string[]>(() =>
    props.fields.map(() => "")
  );
  const [error, setError] = useState<boolean[]>(() =>
    props.fields.map(() => false)
  );
  const fields = useMemo(() => {
    return props.fields.map((field, i) => (
      <Widget title={field}>
        <TextInputNative
          value={values[i]}
          onChangeText={(text) =>
            setValues((v) => {
              const values = [...v];
              values[i] = text;
              return values;
            })
          }
          error={error[i]}
          placeholder={field}
          mode="flat"
        />
      </Widget>
    ));
  }, [props.fields, values]);

  useEffect(() => {
    setValues(props.fields.map(() => ""));
  }, [props.fields, props.visible]);

  function submitText() {
    const error = values.map((val) => !val);
    if (error.find((v) => v)) {
      setError(error);
    } else {
      props.onPositive(values);
    }
  }

  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.onDismiss}
        contentContainerStyle={styles.root}
      >
        {fields}
        <View style={styles.actions}>
          <Button mode="contained" onPress={submitText}>
            Ok
          </Button>
          <Button onPress={props.onDismiss}>Cancel</Button>
        </View>
      </Modal>
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
  actions: {
    display: "flex",
    width: "100%",
    flexDirection: "row-reverse",
  },
});
