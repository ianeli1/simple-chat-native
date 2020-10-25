import React, { createContext, useState } from "react";
import {
  MyServersQuery,
  useMyServersQuery,
  Server,
} from "../../generated/graphql";

type ServerList = Exclude<MyServersQuery["myServers"], undefined>;

interface ServerContext {
  /**The id of the current server */
  currentServer: number | null;
  setCurrentServer: (serverId: number | null) => void;
  /**The list of servers the current user is a member of */
  servers: ServerList;
  /**The current server */
  server: Exclude<ServerList, null>[0] | null;
}

export const serverContext = createContext<ServerContext>(undefined!);

export default function ServerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentServer, setCurrentServer] = useState<number | null>(null);
  const servers: ServerList = useMyServersQuery().data?.myServers ?? null;
  /**The current server */
  const server: ServerContext["server"] =
    servers?.find(({ id }) => id == currentServer) ?? null;
  return (
    <serverContext.Provider
      value={{ servers, server, currentServer, setCurrentServer }}
    >
      {children}
    </serverContext.Provider>
  );
}
