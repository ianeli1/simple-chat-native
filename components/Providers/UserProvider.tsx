import React, { createContext } from "react";
import { useMeQuery, MeQuery } from "../../generated/graphql";

export const userContext = createContext<{
  user: Exclude<MeQuery["me"], undefined> | null;
  loading: boolean;
}>(undefined!);

//TODO: Use User subscription
export function UserProvider({ children }: { children: React.ReactNode }) {
  const queryResult = useMeQuery();
  return (
    <userContext.Provider
      value={{
        user: queryResult.data?.me ?? null,
        loading: queryResult.loading,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
