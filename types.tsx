export type RootStackParamList = {
  Root: undefined;
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
  interface ASElement {
    key: string;
    name: string;
    icon?: string;
  }
}
