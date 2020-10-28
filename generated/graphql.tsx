import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ApiError = {
  __typename?: 'APIError';
  code: ErrorCode;
  message: Scalars['String'];
};

export type Channel = {
  __typename?: 'Channel';
  author: User;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  messages: Array<Message>;
  name: Scalars['String'];
  owner: Server;
  updatedAt: Scalars['DateTime'];
};

export type ChannelResponse = {
  __typename?: 'ChannelResponse';
  channel?: Maybe<Channel>;
  error?: Maybe<ApiError>;
};

export type Confirmation = {
  __typename?: 'Confirmation';
  error?: Maybe<ApiError>;
  ok: Scalars['Boolean'];
};


export type Emote = {
  __typename?: 'Emote';
  author: User;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  image: Scalars['String'];
  name: Scalars['String'];
  owner: Server;
  updatedAt: Scalars['DateTime'];
};

export type EmoteData = {
  image: Scalars['String'];
  name: Scalars['String'];
};

export type EmoteObject = {
  __typename?: 'EmoteObject';
  id: Scalars['Float'];
  image: Scalars['String'];
  name: Scalars['String'];
  owner: ProtoServer;
};

export type EmoteResponse = {
  __typename?: 'EmoteResponse';
  emotes?: Maybe<Array<EmoteObject>>;
  error?: Maybe<ApiError>;
};

export enum ErrorCode {
  ChannelDoesntExist = 'CHANNEL_DOESNT_EXIST',
  EmoteDoesntExist = 'EMOTE_DOESNT_EXIST',
  InviteDoesntExist = 'INVITE_DOESNT_EXIST',
  NotLoggedIn = 'NOT_LOGGED_IN',
  NotServerAdmin = 'NOT_SERVER_ADMIN',
  NotServerMember = 'NOT_SERVER_MEMBER',
  Other = 'OTHER',
  ServerDoesntExist = 'SERVER_DOESNT_EXIST',
  Unknown = 'UNKNOWN',
  UserDoesntExist = 'USER_DOESNT_EXIST'
}

export type Invite = {
  __typename?: 'Invite';
  author: User;
  createdAt: Scalars['DateTime'];
  expire?: Maybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  owner: Server;
  updatedAt: Scalars['DateTime'];
};

export type InviteListResponse = {
  __typename?: 'InviteListResponse';
  error?: Maybe<ApiError>;
  invites?: Maybe<Array<ProtoInvite>>;
};

export type InviteResponse = {
  __typename?: 'InviteResponse';
  error?: Maybe<ApiError>;
  invite?: Maybe<ProtoInvite>;
};

export type Message = {
  __typename?: 'Message';
  author: User;
  channel: Channel;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  emotes?: Maybe<Array<Emote>>;
  id: Scalars['Float'];
  image?: Maybe<Scalars['String']>;
  invite?: Maybe<Invite>;
  updatedAt: Scalars['DateTime'];
};

export type MessageData = {
  content: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRequest?: Maybe<Scalars['Boolean']>;
  changeAvatar: Confirmation;
  changeServerIcon: Confirmation;
  createChannel: Confirmation;
  createEmote: Confirmation;
  createInvite: InviteResponse;
  createMessage: Confirmation;
  createServer: Confirmation;
  createUser: UserResponse;
  declineRequest: Scalars['Boolean'];
  kickMember: Confirmation;
  leaveServer: Confirmation;
  removeChannel: Confirmation;
  removeEmote: Confirmation;
  removeFriend?: Maybe<Scalars['Boolean']>;
  removeInvite: Confirmation;
  sendRequest?: Maybe<Scalars['Boolean']>;
  useInvite: Confirmation;
};


export type MutationAcceptRequestArgs = {
  userId: Scalars['String'];
};


export type MutationChangeAvatarArgs = {
  image: Scalars['String'];
};


export type MutationChangeServerIconArgs = {
  image: Scalars['String'];
  serverId: Scalars['Float'];
};


export type MutationCreateChannelArgs = {
  name: Scalars['String'];
  serverId: Scalars['Float'];
};


export type MutationCreateEmoteArgs = {
  emote: EmoteData;
  serverId: Scalars['Float'];
};


export type MutationCreateInviteArgs = {
  expire?: Maybe<Scalars['DateTime']>;
  serverId: Scalars['Float'];
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['Float'];
  message: MessageData;
};


export type MutationCreateServerArgs = {
  name: Scalars['String'];
};


export type MutationCreateUserArgs = {
  token: Scalars['String'];
  userData: UserData;
};


export type MutationDeclineRequestArgs = {
  userId: Scalars['String'];
};


export type MutationKickMemberArgs = {
  serverId: Scalars['Float'];
  userId: Scalars['String'];
};


export type MutationLeaveServerArgs = {
  serverId: Scalars['Float'];
};


export type MutationRemoveChannelArgs = {
  channelId: Scalars['Float'];
};


export type MutationRemoveEmoteArgs = {
  emoteId: Scalars['Float'];
};


export type MutationRemoveFriendArgs = {
  userId: Scalars['String'];
};


export type MutationRemoveInviteArgs = {
  inviteId: Scalars['Float'];
};


export type MutationSendRequestArgs = {
  userId: Scalars['String'];
};


export type MutationUseInviteArgs = {
  inviteId: Scalars['Float'];
};

export type ProtoInvite = {
  __typename?: 'ProtoInvite';
  author: ProtoUser;
  createdAt: Scalars['DateTime'];
  expire?: Maybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  owner: ProtoServer;
};

export type ProtoServer = {
  __typename?: 'ProtoServer';
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type ProtoUser = {
  __typename?: 'ProtoUser';
  birthday?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isFriend?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  sentFriendRequest?: Maybe<Scalars['Boolean']>;
};

export type ProtoUserResponse = {
  __typename?: 'ProtoUserResponse';
  error?: Maybe<ApiError>;
  user?: Maybe<ProtoUser>;
};

export type Query = {
  __typename?: 'Query';
  /** @deprecated debug */
  allChannels: Array<Channel>;
  allInvites: InviteListResponse;
  allMessages: Array<Message>;
  channel: ChannelResponse;
  /** @deprecated useless */
  channels?: Maybe<Array<Channel>>;
  debugGetToken?: Maybe<Scalars['String']>;
  emotes: EmoteResponse;
  invite: InviteResponse;
  invites: InviteListResponse;
  login?: Maybe<User>;
  me: UserResponse;
  messages?: Maybe<Array<Message>>;
  myEmotes: EmoteResponse;
  /** @deprecated doesn't populate all values, deemed unnecessary, use the query me{} */
  myServers: ServerListResponse;
  server: ServerResponse;
  /** @deprecated debug */
  servers: Array<Server>;
  user: ProtoUserResponse;
  /** @deprecated only for debug use */
  users: Array<User>;
};


export type QueryChannelArgs = {
  channelId: Scalars['Float'];
};


export type QueryChannelsArgs = {
  serverId: Scalars['Float'];
};


export type QueryDebugGetTokenArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryInviteArgs = {
  inviteId: Scalars['Float'];
};


export type QueryInvitesArgs = {
  serverId: Scalars['Float'];
};


export type QueryLoginArgs = {
  token: Scalars['String'];
};


export type QueryMessagesArgs = {
  channelId: Scalars['Float'];
};


export type QueryServerArgs = {
  serverId: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Server = {
  __typename?: 'Server';
  author: User;
  channels: Array<Channel>;
  createdAt: Scalars['DateTime'];
  emotes: Array<Emote>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  invites: Array<Invite>;
  members: Array<User>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ServerListResponse = {
  __typename?: 'ServerListResponse';
  error?: Maybe<ApiError>;
  servers?: Maybe<Array<Server>>;
};

export type ServerResponse = {
  __typename?: 'ServerResponse';
  error?: Maybe<ApiError>;
  server?: Maybe<Server>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  birthday?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  friendRequests: Array<User>;
  friends: Array<User>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  servers: Array<Server>;
  serversOwned: Array<Server>;
  updatedAt: Scalars['DateTime'];
};

export type UserData = {
  birthday: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<ApiError>;
  user?: Maybe<User>;
};

export type CreateChannelMutationVariables = Exact<{
  name: Scalars['String'];
  id: Scalars['Float'];
}>;


export type CreateChannelMutation = (
  { __typename?: 'Mutation' }
  & { createChannel: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type RemoveChannelMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RemoveChannelMutation = (
  { __typename?: 'Mutation' }
  & { removeChannel: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type SendMessageMutationVariables = Exact<{
  id: Scalars['Float'];
  content: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type UseInviteMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type UseInviteMutation = (
  { __typename?: 'Mutation' }
  & { useInvite: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type CreateInviteMutationVariables = Exact<{
  id: Scalars['Float'];
  expire?: Maybe<Scalars['DateTime']>;
}>;


export type CreateInviteMutation = (
  { __typename?: 'Mutation' }
  & { createInvite: (
    { __typename?: 'InviteResponse' }
    & { invite?: Maybe<(
      { __typename?: 'ProtoInvite' }
      & Pick<ProtoInvite, 'id' | 'expire' | 'createdAt'>
      & { author: (
        { __typename?: 'ProtoUser' }
        & Pick<ProtoUser, 'id' | 'name'>
      ), owner: (
        { __typename?: 'ProtoServer' }
        & Pick<ProtoServer, 'id' | 'name' | 'icon'>
      ) }
    )> }
  ) }
);

export type RemoveInviteMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RemoveInviteMutation = (
  { __typename?: 'Mutation' }
  & { removeInvite: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type CreateServerMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateServerMutation = (
  { __typename?: 'Mutation' }
  & { createServer: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type LeaveServerMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type LeaveServerMutation = (
  { __typename?: 'Mutation' }
  & { leaveServer: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type ChangeServerIconMutationVariables = Exact<{
  id: Scalars['Float'];
  imageUrl: Scalars['String'];
}>;


export type ChangeServerIconMutation = (
  { __typename?: 'Mutation' }
  & { changeServerIcon: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type CreateEmoteMutationVariables = Exact<{
  id: Scalars['Float'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
}>;


export type CreateEmoteMutation = (
  { __typename?: 'Mutation' }
  & { createEmote: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'message' | 'code'>
    )> }
  ) }
);

export type RemoveEmoteMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RemoveEmoteMutation = (
  { __typename?: 'Mutation' }
  & { removeEmote: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  token: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  birthday: Scalars['DateTime'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email' | 'birthday'>
    )>, error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type ChangeAvatarMutationVariables = Exact<{
  imageUrl: Scalars['String'];
}>;


export type ChangeAvatarMutation = (
  { __typename?: 'Mutation' }
  & { changeAvatar: (
    { __typename?: 'Confirmation' }
    & Pick<Confirmation, 'ok'>
    & { error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type RemoveFriendMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveFriendMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFriend'>
);

export type SendFriendRequestMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type SendFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendRequest'>
);

export type AcceptFriendRequestMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AcceptFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptRequest'>
);

export type DeleteFriendRequestMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'declineRequest'>
);

export type GetChannelQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetChannelQuery = (
  { __typename?: 'Query' }
  & { channel: (
    { __typename?: 'ChannelResponse' }
    & { channel?: Maybe<(
      { __typename?: 'Channel' }
      & Pick<Channel, 'id' | 'createdAt' | 'updatedAt' | 'name'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      ), owner: (
        { __typename?: 'Server' }
        & Pick<Server, 'id' | 'name'>
      ), messages: Array<(
        { __typename?: 'Message' }
        & Pick<Message, 'id' | 'content' | 'image' | 'createdAt'>
        & { emotes?: Maybe<Array<(
          { __typename?: 'Emote' }
          & Pick<Emote, 'id' | 'name' | 'image'>
        )>>, invite?: Maybe<(
          { __typename?: 'Invite' }
          & Pick<Invite, 'id' | 'expire'>
          & { owner: (
            { __typename?: 'Server' }
            & Pick<Server, 'id' | 'name'>
          ) }
        )>, author: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name' | 'icon'>
        ) }
      )> }
    )>, error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type GetMessagesQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetMessagesQuery = (
  { __typename?: 'Query' }
  & { messages?: Maybe<Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content' | 'image'>
    & { emotes?: Maybe<Array<(
      { __typename?: 'Emote' }
      & Pick<Emote, 'id' | 'name' | 'image'>
    )>>, invite?: Maybe<(
      { __typename?: 'Invite' }
      & Pick<Invite, 'id' | 'expire'>
      & { owner: (
        { __typename?: 'Server' }
        & Pick<Server, 'id' | 'name'>
      ) }
    )>, author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  )>> }
);

export type GetInvitesQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetInvitesQuery = (
  { __typename?: 'Query' }
  & { invites: (
    { __typename?: 'InviteListResponse' }
    & { invites?: Maybe<Array<(
      { __typename?: 'ProtoInvite' }
      & Pick<ProtoInvite, 'id' | 'createdAt' | 'expire'>
      & { owner: (
        { __typename?: 'ProtoServer' }
        & Pick<ProtoServer, 'id' | 'name'>
      ), author: (
        { __typename?: 'ProtoUser' }
        & Pick<ProtoUser, 'id' | 'name'>
      ) }
    )>>, error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type GetServerQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetServerQuery = (
  { __typename?: 'Query' }
  & { server: (
    { __typename?: 'ServerResponse' }
    & { server?: Maybe<(
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'name' | 'icon' | 'updatedAt'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'icon'>
      ), members: Array<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'icon'>
      )>, channels: Array<(
        { __typename?: 'Channel' }
        & Pick<Channel, 'id' | 'name' | 'updatedAt'>
      )>, emotes: Array<(
        { __typename?: 'Emote' }
        & Pick<Emote, 'id' | 'name' | 'image' | 'createdAt'>
      )>, invites: Array<(
        { __typename?: 'Invite' }
        & Pick<Invite, 'id' | 'expire' | 'createdAt'>
      )> }
    )>, error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'icon' | 'createdAt'>
      & { servers: Array<(
        { __typename?: 'Server' }
        & Pick<Server, 'id' | 'name' | 'icon' | 'updatedAt'>
        & { channels: Array<(
          { __typename?: 'Channel' }
          & Pick<Channel, 'id' | 'name' | 'updatedAt'>
        )> }
      )>, friendRequests: Array<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      )>, friends: Array<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      )> }
    )>, error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'ProtoUserResponse' }
    & { user?: Maybe<(
      { __typename?: 'ProtoUser' }
      & Pick<ProtoUser, 'id' | 'name' | 'icon' | 'birthday' | 'createdAt' | 'isFriend' | 'sentFriendRequest'>
    )>, error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type LoginQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { servers: Array<(
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'name'>
    )>, friends: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )>, friendRequests: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type MyEmotesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyEmotesQuery = (
  { __typename?: 'Query' }
  & { myEmotes: (
    { __typename?: 'EmoteResponse' }
    & { emotes?: Maybe<Array<(
      { __typename?: 'EmoteObject' }
      & Pick<EmoteObject, 'id' | 'image' | 'name'>
      & { owner: (
        { __typename?: 'ProtoServer' }
        & Pick<ProtoServer, 'id' | 'name' | 'icon'>
      ) }
    )>>, error?: Maybe<(
      { __typename?: 'APIError' }
      & Pick<ApiError, 'code' | 'message'>
    )> }
  ) }
);

export type NewMessageSubscriptionVariables = Exact<{
  id: Scalars['Float'];
}>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content' | 'image' | 'createdAt'>
    & { emotes?: Maybe<Array<(
      { __typename?: 'Emote' }
      & Pick<Emote, 'id' | 'name' | 'image'>
    )>>, invite?: Maybe<(
      { __typename?: 'Invite' }
      & Pick<Invite, 'id' | 'expire'>
      & { owner: (
        { __typename?: 'Server' }
        & Pick<Server, 'id' | 'name'>
      ) }
    )>, author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'icon'>
    ), channel: (
      { __typename?: 'Channel' }
      & Pick<Channel, 'id'>
    ) }
  ) }
);


export const CreateChannelDocument = gql`
    mutation CreateChannel($name: String!, $id: Float!) {
  createChannel(name: $name, serverId: $id) {
    ok
    error {
      code
      message
    }
  }
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, baseOptions);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const RemoveChannelDocument = gql`
    mutation RemoveChannel($id: Float!) {
  removeChannel(channelId: $id) {
    ok
    error {
      code
      message
    }
  }
}
    `;
export type RemoveChannelMutationFn = Apollo.MutationFunction<RemoveChannelMutation, RemoveChannelMutationVariables>;

/**
 * __useRemoveChannelMutation__
 *
 * To run a mutation, you first call `useRemoveChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeChannelMutation, { data, loading, error }] = useRemoveChannelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveChannelMutation(baseOptions?: Apollo.MutationHookOptions<RemoveChannelMutation, RemoveChannelMutationVariables>) {
        return Apollo.useMutation<RemoveChannelMutation, RemoveChannelMutationVariables>(RemoveChannelDocument, baseOptions);
      }
export type RemoveChannelMutationHookResult = ReturnType<typeof useRemoveChannelMutation>;
export type RemoveChannelMutationResult = Apollo.MutationResult<RemoveChannelMutation>;
export type RemoveChannelMutationOptions = Apollo.BaseMutationOptions<RemoveChannelMutation, RemoveChannelMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($id: Float!, $content: String!) {
  createMessage(channelId: $id, message: {content: $content}) {
    ok
    error {
      code
      message
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UseInviteDocument = gql`
    mutation UseInvite($id: Float!) {
  useInvite(inviteId: $id) {
    ok
    error {
      code
      message
    }
  }
}
    `;
export type UseInviteMutationFn = Apollo.MutationFunction<UseInviteMutation, UseInviteMutationVariables>;

/**
 * __useUseInviteMutation__
 *
 * To run a mutation, you first call `useUseInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUseInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [useInviteMutation, { data, loading, error }] = useUseInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUseInviteMutation(baseOptions?: Apollo.MutationHookOptions<UseInviteMutation, UseInviteMutationVariables>) {
        return Apollo.useMutation<UseInviteMutation, UseInviteMutationVariables>(UseInviteDocument, baseOptions);
      }
export type UseInviteMutationHookResult = ReturnType<typeof useUseInviteMutation>;
export type UseInviteMutationResult = Apollo.MutationResult<UseInviteMutation>;
export type UseInviteMutationOptions = Apollo.BaseMutationOptions<UseInviteMutation, UseInviteMutationVariables>;
export const CreateInviteDocument = gql`
    mutation CreateInvite($id: Float!, $expire: DateTime) {
  createInvite(serverId: $id, expire: $expire) {
    invite {
      id
      expire
      createdAt
      author {
        id
        name
      }
      owner {
        id
        name
        icon
      }
    }
  }
}
    `;
export type CreateInviteMutationFn = Apollo.MutationFunction<CreateInviteMutation, CreateInviteMutationVariables>;

/**
 * __useCreateInviteMutation__
 *
 * To run a mutation, you first call `useCreateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteMutation, { data, loading, error }] = useCreateInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      expire: // value for 'expire'
 *   },
 * });
 */
export function useCreateInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteMutation, CreateInviteMutationVariables>) {
        return Apollo.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument, baseOptions);
      }
export type CreateInviteMutationHookResult = ReturnType<typeof useCreateInviteMutation>;
export type CreateInviteMutationResult = Apollo.MutationResult<CreateInviteMutation>;
export type CreateInviteMutationOptions = Apollo.BaseMutationOptions<CreateInviteMutation, CreateInviteMutationVariables>;
export const RemoveInviteDocument = gql`
    mutation RemoveInvite($id: Float!) {
  removeInvite(inviteId: $id) {
    ok
    error {
      code
      message
    }
  }
}
    `;
export type RemoveInviteMutationFn = Apollo.MutationFunction<RemoveInviteMutation, RemoveInviteMutationVariables>;

/**
 * __useRemoveInviteMutation__
 *
 * To run a mutation, you first call `useRemoveInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeInviteMutation, { data, loading, error }] = useRemoveInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveInviteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveInviteMutation, RemoveInviteMutationVariables>) {
        return Apollo.useMutation<RemoveInviteMutation, RemoveInviteMutationVariables>(RemoveInviteDocument, baseOptions);
      }
export type RemoveInviteMutationHookResult = ReturnType<typeof useRemoveInviteMutation>;
export type RemoveInviteMutationResult = Apollo.MutationResult<RemoveInviteMutation>;
export type RemoveInviteMutationOptions = Apollo.BaseMutationOptions<RemoveInviteMutation, RemoveInviteMutationVariables>;
export const CreateServerDocument = gql`
    mutation CreateServer($name: String!) {
  createServer(name: $name) {
    ok
    error {
      code
      message
    }
  }
}
    `;
export type CreateServerMutationFn = Apollo.MutationFunction<CreateServerMutation, CreateServerMutationVariables>;

/**
 * __useCreateServerMutation__
 *
 * To run a mutation, you first call `useCreateServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerMutation, { data, loading, error }] = useCreateServerMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateServerMutation(baseOptions?: Apollo.MutationHookOptions<CreateServerMutation, CreateServerMutationVariables>) {
        return Apollo.useMutation<CreateServerMutation, CreateServerMutationVariables>(CreateServerDocument, baseOptions);
      }
export type CreateServerMutationHookResult = ReturnType<typeof useCreateServerMutation>;
export type CreateServerMutationResult = Apollo.MutationResult<CreateServerMutation>;
export type CreateServerMutationOptions = Apollo.BaseMutationOptions<CreateServerMutation, CreateServerMutationVariables>;
export const LeaveServerDocument = gql`
    mutation LeaveServer($id: Float!) {
  leaveServer(serverId: $id) {
    ok
    error {
      code
      message
    }
  }
}
    `;
export type LeaveServerMutationFn = Apollo.MutationFunction<LeaveServerMutation, LeaveServerMutationVariables>;

/**
 * __useLeaveServerMutation__
 *
 * To run a mutation, you first call `useLeaveServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveServerMutation, { data, loading, error }] = useLeaveServerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveServerMutation(baseOptions?: Apollo.MutationHookOptions<LeaveServerMutation, LeaveServerMutationVariables>) {
        return Apollo.useMutation<LeaveServerMutation, LeaveServerMutationVariables>(LeaveServerDocument, baseOptions);
      }
export type LeaveServerMutationHookResult = ReturnType<typeof useLeaveServerMutation>;
export type LeaveServerMutationResult = Apollo.MutationResult<LeaveServerMutation>;
export type LeaveServerMutationOptions = Apollo.BaseMutationOptions<LeaveServerMutation, LeaveServerMutationVariables>;
export const ChangeServerIconDocument = gql`
    mutation ChangeServerIcon($id: Float!, $imageUrl: String!) {
  changeServerIcon(image: $imageUrl, serverId: $id) {
    ok
    error {
      code
      message
    }
  }
}
    `;
export type ChangeServerIconMutationFn = Apollo.MutationFunction<ChangeServerIconMutation, ChangeServerIconMutationVariables>;

/**
 * __useChangeServerIconMutation__
 *
 * To run a mutation, you first call `useChangeServerIconMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeServerIconMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeServerIconMutation, { data, loading, error }] = useChangeServerIconMutation({
 *   variables: {
 *      id: // value for 'id'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useChangeServerIconMutation(baseOptions?: Apollo.MutationHookOptions<ChangeServerIconMutation, ChangeServerIconMutationVariables>) {
        return Apollo.useMutation<ChangeServerIconMutation, ChangeServerIconMutationVariables>(ChangeServerIconDocument, baseOptions);
      }
export type ChangeServerIconMutationHookResult = ReturnType<typeof useChangeServerIconMutation>;
export type ChangeServerIconMutationResult = Apollo.MutationResult<ChangeServerIconMutation>;
export type ChangeServerIconMutationOptions = Apollo.BaseMutationOptions<ChangeServerIconMutation, ChangeServerIconMutationVariables>;
export const CreateEmoteDocument = gql`
    mutation CreateEmote($id: Float!, $name: String!, $imageUrl: String!) {
  createEmote(emote: {image: $imageUrl, name: $name}, serverId: $id) {
    ok
    error {
      message
      code
    }
  }
}
    `;
export type CreateEmoteMutationFn = Apollo.MutationFunction<CreateEmoteMutation, CreateEmoteMutationVariables>;

/**
 * __useCreateEmoteMutation__
 *
 * To run a mutation, you first call `useCreateEmoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmoteMutation, { data, loading, error }] = useCreateEmoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useCreateEmoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmoteMutation, CreateEmoteMutationVariables>) {
        return Apollo.useMutation<CreateEmoteMutation, CreateEmoteMutationVariables>(CreateEmoteDocument, baseOptions);
      }
export type CreateEmoteMutationHookResult = ReturnType<typeof useCreateEmoteMutation>;
export type CreateEmoteMutationResult = Apollo.MutationResult<CreateEmoteMutation>;
export type CreateEmoteMutationOptions = Apollo.BaseMutationOptions<CreateEmoteMutation, CreateEmoteMutationVariables>;
export const RemoveEmoteDocument = gql`
    mutation RemoveEmote($id: Float!) {
  removeEmote(emoteId: $id) {
    ok
    error {
      code
      message
    }
  }
}
    `;
export type RemoveEmoteMutationFn = Apollo.MutationFunction<RemoveEmoteMutation, RemoveEmoteMutationVariables>;

/**
 * __useRemoveEmoteMutation__
 *
 * To run a mutation, you first call `useRemoveEmoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEmoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEmoteMutation, { data, loading, error }] = useRemoveEmoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveEmoteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveEmoteMutation, RemoveEmoteMutationVariables>) {
        return Apollo.useMutation<RemoveEmoteMutation, RemoveEmoteMutationVariables>(RemoveEmoteDocument, baseOptions);
      }
export type RemoveEmoteMutationHookResult = ReturnType<typeof useRemoveEmoteMutation>;
export type RemoveEmoteMutationResult = Apollo.MutationResult<RemoveEmoteMutation>;
export type RemoveEmoteMutationOptions = Apollo.BaseMutationOptions<RemoveEmoteMutation, RemoveEmoteMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($token: String!, $name: String!, $email: String!, $birthday: DateTime!) {
  createUser(userData: {name: $name, email: $email, birthday: $birthday}, token: $token) {
    user {
      id
      name
      email
      birthday
    }
    error {
      code
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      token: // value for 'token'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      birthday: // value for 'birthday'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ChangeAvatarDocument = gql`
    mutation ChangeAvatar($imageUrl: String!) {
  changeAvatar(image: $imageUrl) {
    ok
    error {
      code
      message
    }
  }
}
    `;
export type ChangeAvatarMutationFn = Apollo.MutationFunction<ChangeAvatarMutation, ChangeAvatarMutationVariables>;

/**
 * __useChangeAvatarMutation__
 *
 * To run a mutation, you first call `useChangeAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAvatarMutation, { data, loading, error }] = useChangeAvatarMutation({
 *   variables: {
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useChangeAvatarMutation(baseOptions?: Apollo.MutationHookOptions<ChangeAvatarMutation, ChangeAvatarMutationVariables>) {
        return Apollo.useMutation<ChangeAvatarMutation, ChangeAvatarMutationVariables>(ChangeAvatarDocument, baseOptions);
      }
export type ChangeAvatarMutationHookResult = ReturnType<typeof useChangeAvatarMutation>;
export type ChangeAvatarMutationResult = Apollo.MutationResult<ChangeAvatarMutation>;
export type ChangeAvatarMutationOptions = Apollo.BaseMutationOptions<ChangeAvatarMutation, ChangeAvatarMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation RemoveFriend($id: String!) {
  removeFriend(userId: $id)
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, baseOptions);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($id: String!) {
  sendRequest(userId: $id)
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, baseOptions);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($id: String!) {
  acceptRequest(userId: $id)
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, baseOptions);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const DeleteFriendRequestDocument = gql`
    mutation DeleteFriendRequest($id: String!) {
  declineRequest(userId: $id)
}
    `;
export type DeleteFriendRequestMutationFn = Apollo.MutationFunction<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>;

/**
 * __useDeleteFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeleteFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFriendRequestMutation, { data, loading, error }] = useDeleteFriendRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>) {
        return Apollo.useMutation<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>(DeleteFriendRequestDocument, baseOptions);
      }
export type DeleteFriendRequestMutationHookResult = ReturnType<typeof useDeleteFriendRequestMutation>;
export type DeleteFriendRequestMutationResult = Apollo.MutationResult<DeleteFriendRequestMutation>;
export type DeleteFriendRequestMutationOptions = Apollo.BaseMutationOptions<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>;
export const GetChannelDocument = gql`
    query GetChannel($id: Float!) {
  channel(channelId: $id) {
    channel {
      id
      createdAt
      updatedAt
      name
      author {
        id
        name
      }
      owner {
        id
        name
      }
      messages {
        id
        content
        image
        createdAt
        emotes {
          id
          name
          image
        }
        invite {
          id
          owner {
            id
            name
          }
          expire
        }
        author {
          id
          name
          icon
        }
      }
    }
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useGetChannelQuery__
 *
 * To run a query within a React component, call `useGetChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChannelQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelQuery, GetChannelQueryVariables>) {
        return Apollo.useQuery<GetChannelQuery, GetChannelQueryVariables>(GetChannelDocument, baseOptions);
      }
export function useGetChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelQuery, GetChannelQueryVariables>) {
          return Apollo.useLazyQuery<GetChannelQuery, GetChannelQueryVariables>(GetChannelDocument, baseOptions);
        }
export type GetChannelQueryHookResult = ReturnType<typeof useGetChannelQuery>;
export type GetChannelLazyQueryHookResult = ReturnType<typeof useGetChannelLazyQuery>;
export type GetChannelQueryResult = Apollo.QueryResult<GetChannelQuery, GetChannelQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($id: Float!) {
  messages(channelId: $id) {
    id
    content
    image
    emotes {
      id
      name
      image
    }
    invite {
      id
      owner {
        id
        name
      }
      expire
    }
    author {
      id
      name
    }
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetInvitesDocument = gql`
    query GetInvites($id: Float!) {
  invites(serverId: $id) {
    invites {
      id
      createdAt
      expire
      owner {
        id
        name
      }
      author {
        id
        name
      }
    }
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useGetInvitesQuery__
 *
 * To run a query within a React component, call `useGetInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvitesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInvitesQuery(baseOptions?: Apollo.QueryHookOptions<GetInvitesQuery, GetInvitesQueryVariables>) {
        return Apollo.useQuery<GetInvitesQuery, GetInvitesQueryVariables>(GetInvitesDocument, baseOptions);
      }
export function useGetInvitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvitesQuery, GetInvitesQueryVariables>) {
          return Apollo.useLazyQuery<GetInvitesQuery, GetInvitesQueryVariables>(GetInvitesDocument, baseOptions);
        }
export type GetInvitesQueryHookResult = ReturnType<typeof useGetInvitesQuery>;
export type GetInvitesLazyQueryHookResult = ReturnType<typeof useGetInvitesLazyQuery>;
export type GetInvitesQueryResult = Apollo.QueryResult<GetInvitesQuery, GetInvitesQueryVariables>;
export const GetServerDocument = gql`
    query GetServer($id: Float!) {
  server(serverId: $id) {
    server {
      id
      name
      icon
      updatedAt
      author {
        id
        name
        icon
      }
      members {
        id
        name
        icon
      }
      channels {
        id
        name
        updatedAt
      }
      emotes {
        id
        name
        image
        createdAt
      }
      invites {
        id
        expire
        createdAt
      }
    }
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useGetServerQuery__
 *
 * To run a query within a React component, call `useGetServerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServerQuery(baseOptions?: Apollo.QueryHookOptions<GetServerQuery, GetServerQueryVariables>) {
        return Apollo.useQuery<GetServerQuery, GetServerQueryVariables>(GetServerDocument, baseOptions);
      }
export function useGetServerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServerQuery, GetServerQueryVariables>) {
          return Apollo.useLazyQuery<GetServerQuery, GetServerQueryVariables>(GetServerDocument, baseOptions);
        }
export type GetServerQueryHookResult = ReturnType<typeof useGetServerQuery>;
export type GetServerLazyQueryHookResult = ReturnType<typeof useGetServerLazyQuery>;
export type GetServerQueryResult = Apollo.QueryResult<GetServerQuery, GetServerQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    user {
      id
      name
      icon
      createdAt
      servers {
        id
        name
        icon
        updatedAt
        channels {
          id
          name
          updatedAt
        }
      }
      friendRequests {
        id
        name
      }
      friends {
        id
        name
      }
    }
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    user {
      id
      name
      icon
      birthday
      createdAt
      isFriend
      sentFriendRequest
    }
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const LoginDocument = gql`
    query Login($token: String!) {
  login(token: $token) {
    id
    name
    servers {
      id
      name
    }
    friends {
      id
      name
    }
    friendRequests {
      id
      name
    }
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useLoginQuery(baseOptions?: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, baseOptions);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, baseOptions);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const MyEmotesDocument = gql`
    query myEmotes {
  myEmotes {
    emotes {
      id
      image
      name
      owner {
        id
        name
        icon
      }
    }
    error {
      code
      message
    }
  }
}
    `;

/**
 * __useMyEmotesQuery__
 *
 * To run a query within a React component, call `useMyEmotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEmotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEmotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyEmotesQuery(baseOptions?: Apollo.QueryHookOptions<MyEmotesQuery, MyEmotesQueryVariables>) {
        return Apollo.useQuery<MyEmotesQuery, MyEmotesQueryVariables>(MyEmotesDocument, baseOptions);
      }
export function useMyEmotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyEmotesQuery, MyEmotesQueryVariables>) {
          return Apollo.useLazyQuery<MyEmotesQuery, MyEmotesQueryVariables>(MyEmotesDocument, baseOptions);
        }
export type MyEmotesQueryHookResult = ReturnType<typeof useMyEmotesQuery>;
export type MyEmotesLazyQueryHookResult = ReturnType<typeof useMyEmotesLazyQuery>;
export type MyEmotesQueryResult = Apollo.QueryResult<MyEmotesQuery, MyEmotesQueryVariables>;
export const NewMessageDocument = gql`
    subscription NewMessage($id: Float!) {
  newMessage(channelId: $id) {
    id
    content
    image
    createdAt
    emotes {
      id
      name
      image
    }
    invite {
      id
      owner {
        id
        name
      }
      expire
    }
    author {
      id
      name
      icon
    }
    channel {
      id
    }
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, baseOptions);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;