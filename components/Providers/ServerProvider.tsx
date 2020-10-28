import React, { createContext, useState } from "react";
import {
  Server,
  useGetServerQuery,
  GetServerQuery,
} from "../../generated/graphql";

interface ServerContext {
  /**The id of the current server */
  currentServer: number | null;
  setCurrentServer: (serverId: number) => void;
  /**The current server */
  server: Exclude<GetServerQuery["server"]["server"], undefined>;
  error: Exclude<GetServerQuery["server"]["error"], undefined>;
  loading: boolean;
}

export const serverContext = createContext<ServerContext>(undefined!);

export default function ServerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentServer, setCurrentServer] = useState<number | null>(null);
  const { loading, data, refetch } = useGetServerQuery({
    skip: !currentServer,
  });

  async function changeServer(id: number) {
    setCurrentServer(id);
    await refetch({ id });
  }
  return (
    <serverContext.Provider
      value={{
        server: data?.server?.server ?? null,
        currentServer,
        setCurrentServer: changeServer,
        error: data?.server.error ?? null,
        loading,
      }}
    >
      {children}
    </serverContext.Provider>
  );
}
