import React, { createContext } from "react";
import { useMeQuery, MeQuery, Exact } from "../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";

export const userContext = createContext<{
  user: Exclude<MeQuery["me"], undefined> | null;
  loading: boolean;
  refetchUser(
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ): Promise<ApolloQueryResult<MeQuery>>;
}>(undefined!);

//TODO: Use User subscription
export function UserProvider({ children }: { children: React.ReactNode }) {
  const queryResult = useMeQuery();
  return (
    <userContext.Provider
      value={{
        user: queryResult.data?.me ?? null,
        loading: queryResult.loading,
        refetchUser: queryResult.refetch,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
