import React, { createContext, useState } from "react";
import { View, Text } from "react-native";
import { ImageDialog, ImageDialogProps } from "../ImageDialog";

interface DialogContext {
  selectImage(
    props: Omit<ImageDialogProps, "visible" | "onDismiss"> & {
      onDismiss?: () => void;
    }
  ): void;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

export const dialogContext = createContext<DialogContext>(undefined!);
export function DialogProvider({ children }: DialogProviderProps) {
  const [imageDialogProps, setImageDialogProps] = useState<ImageDialogProps>();

  function selectImage(props: Parameters<DialogContext["selectImage"]>[0]) {
    setImageDialogProps({
      ...props,
      onDismiss: () => {
        props.onDismiss && props.onDismiss();
        setImageDialogProps((p) => p && { ...p, visible: false });
      },
      visible: true,
    });
  }

  return (
    <dialogContext.Provider value={{ selectImage }}>
      {imageDialogProps && <ImageDialog {...imageDialogProps} />}
      {children}
    </dialogContext.Provider>
  );
}
