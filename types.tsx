export type RootStackParamList = {
  Root: undefined;
  Loading: undefined;
  Login: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Settings: undefined;
  Chat: undefined;
  Landing: undefined;
};

declare global {
  interface ASElement<keyType extends string | number> {
    key: keyType;
    name: string;
    icon?: string;
  }
}
