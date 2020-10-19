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
  interface User {
    name: string;
    userId: string;
    icon: string | null;
    status?: "online" | "idle" | "dnd" | "offline"; //add invisible?
    servers?: string[];
    friends?: string[];
    friendReq?: string[];
  }

  interface Channel {
    [key: string]: Message;
  }

  interface ServerData {
    id: string;
    channels: string[];
    name: string;
    icon?: string;
    ownerId: string;
    typing?: {
      [key: string]: string;
    };
    emotes?: {
      [key: string]: string;
    };
  }

  interface ASElement {
    key: string;
    name: string;
    icon?: string;
  }

  interface Invite {
    id: string;
    name: string;
    icon?: string;
  }

  interface Message {
    id: number;
    name: string;
    userId: string;
    message: string;
    image?: string;
    timestamp: Date;
    emotes?: Emotes;
    invite?: Invite;
  }

  interface Emotes {
    [key: string]: string;
  }
}
