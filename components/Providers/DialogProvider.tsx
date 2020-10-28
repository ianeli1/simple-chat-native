import React, { createContext, useState } from "react";
import { View, Text } from "react-native";
import { ImageDialog, ImageDialogProps } from "../ImageDialog";
import { TextInput, TextInputProps } from "../TextInput";

interface DialogContext {
  selectImage(
    props: Omit<ImageDialogProps, "visible" | "onDismiss" | "onPositive">
  ): Promise<string | null>;
  inputText(
    props: Omit<TextInputProps, "visible" | "onDismiss" | "onPositive">
  ): Promise<string[] | null>;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

export const dialogContext = createContext<DialogContext>(undefined!);
export function DialogProvider({ children }: DialogProviderProps) {
  const [imageDialogProps, setImageDialogProps] = useState<ImageDialogProps>();
  const [textInputProps, setTextInputProps] = useState<TextInputProps>();

  const selectImage: DialogContext["selectImage"] = async function (props) {
    function hide() {
      setImageDialogProps((p) => p && { ...p, visible: false });
    }
    return await new Promise((resolve) => {
      setImageDialogProps({
        ...props,
        onDismiss: () => {
          hide();
          resolve(null);
        },
        onPositive: (imageUrl) => {
          hide();
          resolve(imageUrl);
        },
        visible: true,
      });
    });
  };

  const inputText: DialogContext["inputText"] = async function (props) {
    function hide() {
      setTextInputProps((p) => p && { ...p, visible: false });
    }
    return await new Promise((resolve) => {
      console.log("Text input opening...");
      setTextInputProps({
        ...props,
        onDismiss: () => {
          hide();
          resolve(null);
        },
        onPositive: (fields) => {
          hide();
          resolve(fields);
        },
        visible: true,
      });
    });
  };

  return (
    <dialogContext.Provider value={{ selectImage, inputText }}>
      {imageDialogProps && <ImageDialog {...imageDialogProps} />}
      {textInputProps && <TextInput {...textInputProps} />}
      {children}
    </dialogContext.Provider>
  );
}
