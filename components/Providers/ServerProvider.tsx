import React, { createContext, useState } from "react";
import { useServer } from "../../dataHandler/hooks";

export const serverContext = createContext<
  ReturnType<typeof useServer> & {
    currentServer: string | null;
    setCurrentServer: (serverId: string | null) => void;
  }
>(undefined!);

export default function ServerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentServer, setCurrentServer] = useState<string | null>(null);
  const server = useServer(currentServer || undefined);
  return (
    <serverContext.Provider
      value={{ ...server, currentServer, setCurrentServer }}
    >
      {children}
    </serverContext.Provider>
  );
}
