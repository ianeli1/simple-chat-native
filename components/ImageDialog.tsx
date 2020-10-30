import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Platform, View } from "react-native";
import { Button } from "react-native-paper";
import { AvatarNameCombo } from "./AvatarNameCombo";
import { Widget } from "./Widget";
import {
  requestCameraRollPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { uploadImage } from "../firebaseFunctions";
import { Dialog } from "./Dialog";

export interface ImageDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onPositive: (imageUrl: string) => void;
  title: string;
  subtitle: string;
  uri?: string;
}

export function ImageDialog(props: ImageDialogProps) {
  const [uri, setUri] = useState<string>();
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Error",
            "Uh oh, we need that permission to send images.",
            [{ text: "Ok", onPress: props.onDismiss }],
            { cancelable: true, onDismiss: props.onDismiss }
          );
        }
      }
    })();
  }, []);

  useEffect(() => {
    setLoading(0);
  }, [props.visible]);

  async function pickImage() {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      setUri(result.uri);
    }
  }

  async function processImage() {
    if (uri) {
      setLoading(0.1);
      props.onPositive(
        await uploadImage(uri, (per) => setLoading((v) => per || v))
      );
      setUri(undefined);
      props.onDismiss();
    }
  }

  return (
    <Dialog visible={props.visible} onDismiss={props.onDismiss}>
      <Widget title={props.title}>
        <AvatarNameCombo
          title={props.subtitle}
          icon={uri || props.uri}
          onAvatarClick={pickImage}
        />
        <View style={styles.actions}>
          <Button
            onPress={processImage}
            disabled={!!loading || !uri}
            mode="contained"
          >
            Ok
          </Button>
          <Button onPress={props.onDismiss} mode="text">
            Cancel
          </Button>
        </View>
      </Widget>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  actions: {
    display: "flex",
    width: "100%",
    flexDirection: "row-reverse",
  },
});
