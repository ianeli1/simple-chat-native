import React, { createContext, useState } from "react";
import { View, Text } from "react-native";
import { ImageDialog, ImageDialogProps } from "../ImageDialog";
import { TextInput, TextInputProps } from "../TextInput";
import { UserDialog, UserDialogProps } from "../UserDialog";

interface DialogContext {
  /**
   * Displays a dialog with the option to select an image from the user's gallery
   * @param props Title and subtitle of the dialog
   * @returns Firebase URL of the selected image
   */
  selectImage(
    props: Omit<ImageDialogProps, "visible" | "onDismiss" | "onPositive">
  ): Promise<string | null>;

  /**
   * Displays a dialog with the option of inputting text
   * @param props Title and names of the text fields of the dialog
   * @returns The array of strings in the same order as the fields prop
   */
  inputText(
    props: Omit<TextInputProps, "visible" | "onDismiss" | "onPositive">
  ): Promise<string[] | null>;

  showUserProfile(props: Omit<UserDialogProps, "visible" | "onDismiss">): void;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

export const dialogContext = createContext<DialogContext>(undefined!);
export function DialogProvider({ children }: DialogProviderProps) {
  const [imageDialogProps, setImageDialogProps] = useState<ImageDialogProps>();
  const [textInputProps, setTextInputProps] = useState<TextInputProps>();
  const [userDialogProps, setUserDialogProps] = useState<UserDialogProps>();

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

  const showUserProfile: DialogContext["showUserProfile"] = function (props) {
    function hide() {
      setUserDialogProps((p) => p && { ...p, visible: false });
    }
    setUserDialogProps({
      ...props,
      onDismiss: () => void hide(),
      visible: true,
    });
  };

  return (
    <dialogContext.Provider value={{ selectImage, inputText, showUserProfile }}>
      {imageDialogProps && <ImageDialog {...imageDialogProps} />}
      {textInputProps && <TextInput {...textInputProps} />}
      {userDialogProps && <UserDialog {...userDialogProps} />}
      {children}
    </dialogContext.Provider>
  );
}
