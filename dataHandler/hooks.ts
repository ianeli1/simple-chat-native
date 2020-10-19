import firebase from "firebase";
import { useState, useEffect } from "react";
import { db } from "./handler3";
import {
  createEmoteFunctions,
  createChannelFunctions,
  createMessageFunctions,
} from "./serverFunctions";
import {
  createCreateServer,
  createFriendRequestFuncs,
  createJoinServer,
  createLeaveServer,
  createProfileFunctions,
} from "./userFunctions";

export function useServer(serverId?: string) {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [emoteFunctions, setEmoteFunctions] = useState<null | ReturnType<
    typeof createEmoteFunctions
  >>(null);
  const [channelFunctions, setChannelFunctions] = useState<null | ReturnType<
    typeof createChannelFunctions
  >>(null);
  let unsub: () => void;
  useEffect(() => {
    if (serverId) {
      unsub = firebase
        .firestore()
        .collection("servers")
        .doc(serverId)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data() as ServerData;
            setServerData(data);
            setEmoteFunctions(() => createEmoteFunctions(data.id));
            setChannelFunctions(() => createChannelFunctions(data.id));
          } else {
            setServerData(null);
            setEmoteFunctions(null);
            setChannelFunctions(null);
            throw new Error("This server does not have any metadata");
          }
        });
    }
  }, [serverId]);

  return { serverData, emoteFunctions, channelFunctions };
}

export function useChannel(serverId?: string, channelName?: string) {
  const [loadedChannel, setLoadedChannel] = useState<{
    serverId: string;
    channelName: string;
  } | null>({ serverId: "", channelName: "" });
  const [channel, setChannel] = useState<Channel | null>(null);
  const [messageFunctions, setMessageFunctions] = useState<null | ReturnType<
    typeof createMessageFunctions
  >>(null);
  //const [channelData, setChannel] = useState< //TODO: implement channel data
  let unsub: () => void;
  useEffect(() => {
    if (serverId && channelName) {
      console.log("loading channel", { serverId, channelName });
      unsub = firebase
        .firestore()
        .collection("servers")
        .doc(serverId)
        .collection("channels")
        .doc(channelName)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data() as { messages: Channel };
            setLoadedChannel({ serverId, channelName });
            setChannel(data.messages);
            setMessageFunctions(() =>
              createMessageFunctions(serverId, channelName)
            );
          } else {
            setChannel(null);
            setMessageFunctions(null);
            throw new Error("This channel does not exist");
          }
        });
    } else {
      setChannel(null);
      setMessageFunctions(null);
    }

    return () => {
      unsub && unsub();
    };
  }, [serverId, channelName]);

  return { channel, messageFunctions, loadedChannel };
}

interface ProtoUser {
  userId: string;
  name: string;
  icon: string | null;
}

async function Presence(protoUser: ProtoUser, serverList: string[]) {
  //TODO: add dnd and invisible idk
  const proto = { ...protoUser, status: "online" };
  for (const server of serverList) {
    const presenceRef = db.ref(`servers/${server}/members/${protoUser.userId}`);
    await presenceRef.child("status").onDisconnect().set("offline");
    await presenceRef.set(proto);
  }
  const userRef = db.ref(`users/${protoUser.userId}`);
  await userRef.child("status").onDisconnect().set("offline");
  await userRef.set(proto);
}

export function useUser() {
  /**
   * user is null if undefined, false if retrieved and not logged in
   */
  const [user, setUser] = useState<User | null | false>(null);

  const [joinServer, setJoinServer] = useState<ReturnType<
    typeof createJoinServer
  > | null>(null);

  const [createServer, setCreateServer] = useState<null | ReturnType<
    typeof createCreateServer
  >>(null);

  const [leaveServer, setLeaveServer] = useState<ReturnType<
    typeof createLeaveServer
  > | null>(null);

  const [friendFunctions, setFriendFunctions] = useState<ReturnType<
    typeof createFriendRequestFuncs
  > | null>(null);

  const [profileFunctions, setProfileFunctions] = useState<ReturnType<
    typeof createProfileFunctions
  > | null>(null);

  let unsub: () => void;
  let unsubAuth: firebase.Unsubscribe;
  useEffect(() => {
    unsubAuth = firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        unsub = firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            if (doc.exists) {
              const data = doc.data() as User;
              setUser(data);
              setJoinServer(() => createJoinServer(data.userId));
              setLeaveServer(() => createLeaveServer(data.userId));
              setCreateServer(() => createCreateServer(data.userId));
              setFriendFunctions(() => createFriendRequestFuncs(data.userId));
              setProfileFunctions(() => createProfileFunctions(data.userId));
              Presence(
                {
                  name: data.name,
                  userId: user.uid,
                  icon: data.icon,
                },
                data.servers || []
              );
            } else {
              setUser(null);
              setJoinServer(null);
              setCreateServer(null);
              setLeaveServer(null);
              setFriendFunctions(null);
              setProfileFunctions(null);
              throw new Error("Logged in user does not exist in database");
            }
          });
      } else {
        setUser(false);
      }
    });
    return () => {
      unsub && unsub();
      unsubAuth && unsubAuth();
    };
  }, []);
  return {
    user,
    joinServer,
    leaveServer,
    createServer,
    friendFunctions,
    profileFunctions,
  };
}

export function useMembers(serverId?: string) {
  const [members, setMembers] = useState<{ [userId: string]: ProtoUser }>({});
  let ref: firebase.database.Reference;
  useEffect(() => {
    if (serverId) {
      ref = db.ref(`servers/${serverId}/members`);
      ref.on("value", (data) => {
        if (data.exists()) {
          setMembers(data.val());
        } else {
          setMembers({});
        }
      });
    }
    return () => void ref && ref.off();
  }, [serverId]);

  return { members };
}
