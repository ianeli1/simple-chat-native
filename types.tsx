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

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

declare global {
  interface ASElement<keyType extends string | number> {
    key: keyType;
    name: string;
    icon?: string;
  }
}
