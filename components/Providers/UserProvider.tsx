import React, { createContext } from "react";
import { useUser } from "../../dataHandler/hooks";

export const userContext = createContext<ReturnType<typeof useUser>>(
  undefined!
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}
