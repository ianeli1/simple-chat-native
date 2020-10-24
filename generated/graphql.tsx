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

export type Channel = {
  __typename?: 'Channel';
  author: User;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  messages: Array<Message>;
  name: Scalars['String'];
  owner: Server;
  updatedAt: Scalars['String'];
};


export type Emote = {
  __typename?: 'Emote';
  author: User;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  image: Scalars['String'];
  name: Scalars['String'];
  owner: Server;
  updatedAt: Scalars['String'];
};

export type Invite = {
  __typename?: 'Invite';
  author: User;
  createdAt: Scalars['String'];
  expire?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  owner: Server;
  updatedAt: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  author: User;
  channel: Channel;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  emotes?: Maybe<Array<Emote>>;
  id: Scalars['Float'];
  image?: Maybe<Scalars['String']>;
  invite?: Maybe<Invite>;
  updatedAt: Scalars['String'];
};

export type MessageData = {
  content: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRequest?: Maybe<Scalars['Boolean']>;
  createChannel?: Maybe<Channel>;
  createInvite?: Maybe<Invite>;
  createMessage?: Maybe<Message>;
  createServer?: Maybe<Server>;
  createUser: User;
  declineRequest: Scalars['Boolean'];
  leaveServer?: Maybe<User>;
  removeFriend?: Maybe<Scalars['Boolean']>;
  sendRequest?: Maybe<Scalars['Boolean']>;
  useInvite?: Maybe<Server>;
};


export type MutationAcceptRequestArgs = {
  userId: Scalars['String'];
};


export type MutationCreateChannelArgs = {
  name: Scalars['String'];
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


export type MutationLeaveServerArgs = {
  serverId: Scalars['Float'];
};


export type MutationRemoveFriendArgs = {
  userId: Scalars['String'];
};


export type MutationSendRequestArgs = {
  userId: Scalars['String'];
};


export type MutationUseInviteArgs = {
  inviteId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  allChannels: Array<Channel>;
  allInvites: Array<Invite>;
  allMessages: Array<Message>;
  channel?: Maybe<Channel>;
  channels?: Maybe<Array<Channel>>;
  debugGetToken?: Maybe<Scalars['String']>;
  emotes: Array<Emote>;
  invite?: Maybe<Invite>;
  invites?: Maybe<Array<Invite>>;
  login?: Maybe<User>;
  me?: Maybe<User>;
  messages?: Maybe<Array<Message>>;
  myEmotes?: Maybe<Array<Emote>>;
  myServers?: Maybe<Array<Server>>;
  servers: Array<Server>;
  user?: Maybe<User>;
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


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Server = {
  __typename?: 'Server';
  author: User;
  channels: Array<Channel>;
  createdAt: Scalars['String'];
  emotes: Array<Emote>;
  id: Scalars['Float'];
  invites: Array<Invite>;
  members: Array<User>;
  name: Scalars['String'];
  updatedAt: Scalars['String'];
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
  birthday: Scalars['DateTime'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  friendRequests: Array<User>;
  friends: Array<User>;
  id: Scalars['String'];
  name: Scalars['String'];
  servers: Array<Server>;
  serversOwned: Array<Server>;
  updatedAt: Scalars['String'];
};

export type UserData = {
  birthday: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type CreateChannelMutationVariables = Exact<{
  name: Scalars['String'];
  id: Scalars['Float'];
}>;


export type CreateChannelMutation = (
  { __typename?: 'Mutation' }
  & { createChannel?: Maybe<(
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name'>
    & { owner: (
      { __typename?: 'Server' }
      & Pick<Server, 'id'>
    ) }
  )> }
);

export type SendMessageMutationVariables = Exact<{
  id: Scalars['Float'];
  content: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'id'>
  )> }
);

export type UseInviteMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type UseInviteMutation = (
  { __typename?: 'Mutation' }
  & { useInvite?: Maybe<(
    { __typename?: 'Server' }
    & Pick<Server, 'id' | 'name'>
    & { channels: Array<(
      { __typename?: 'Channel' }
      & Pick<Channel, 'id' | 'name'>
    )> }
  )> }
);

export type CreateInviteMutationVariables = Exact<{
  id: Scalars['Float'];
  expire?: Maybe<Scalars['DateTime']>;
}>;


export type CreateInviteMutation = (
  { __typename?: 'Mutation' }
  & { createInvite?: Maybe<(
    { __typename?: 'Invite' }
    & Pick<Invite, 'id' | 'expire'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ), owner: (
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'name'>
    ) }
  )> }
);

export type CreateServerMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateServerMutation = (
  { __typename?: 'Mutation' }
  & { createServer?: Maybe<(
    { __typename?: 'Server' }
    & Pick<Server, 'id' | 'name'>
  )> }
);

export type LeaveServerMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type LeaveServerMutation = (
  { __typename?: 'Mutation' }
  & { leaveServer?: Maybe<(
    { __typename?: 'User' }
    & { servers: Array<(
      { __typename?: 'Server' }
      & Pick<Server, 'id'>
    )> }
  )> }
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
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
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

export type GetChannelsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetChannelsQuery = (
  { __typename?: 'Query' }
  & { channels?: Maybe<Array<(
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name' | 'updatedAt'>
  )>> }
);

export type GetChannelQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetChannelQuery = (
  { __typename?: 'Query' }
  & { channel?: Maybe<(
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name'>
    & { owner: (
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
        & Pick<User, 'id' | 'name'>
      ) }
    )> }
  )> }
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
  & { invites?: Maybe<Array<(
    { __typename?: 'Invite' }
    & Pick<Invite, 'id' | 'createdAt' | 'expire'>
    & { owner: (
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'name'>
    ), author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'createdAt'>
    & { servers: Array<(
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'name'>
    )>, friendRequests: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )>, friends: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'birthday'>
  )> }
);

export type MyServersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyServersQuery = (
  { __typename?: 'Query' }
  & { myServers?: Maybe<Array<(
    { __typename?: 'Server' }
    & Pick<Server, 'id' | 'name' | 'updatedAt'>
    & { channels: Array<(
      { __typename?: 'Channel' }
      & Pick<Channel, 'id' | 'name' | 'updatedAt'>
    )>, emotes: Array<(
      { __typename?: 'Emote' }
      & Pick<Emote, 'id' | 'name' | 'image'>
      & { owner: (
        { __typename?: 'Server' }
        & Pick<Server, 'id' | 'name'>
      ) }
    )> }
  )>> }
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
  & { myEmotes?: Maybe<Array<(
    { __typename?: 'Emote' }
    & Pick<Emote, 'id' | 'name' | 'image'>
  )>> }
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
      & Pick<User, 'id' | 'name'>
    ), channel: (
      { __typename?: 'Channel' }
      & Pick<Channel, 'id'>
    ) }
  ) }
);


export const CreateChannelDocument = gql`
    mutation CreateChannel($name: String!, $id: Float!) {
  createChannel(name: $name, serverId: $id) {
    id
    name
    owner {
      id
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
export const SendMessageDocument = gql`
    mutation SendMessage($id: Float!, $content: String!) {
  createMessage(channelId: $id, message: {content: $content}) {
    id
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
    id
    name
    channels {
      id
      name
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
    id
    expire
    author {
      id
    }
    owner {
      id
      name
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
export const CreateServerDocument = gql`
    mutation CreateServer($name: String!) {
  createServer(name: $name) {
    id
    name
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
    servers {
      id
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
export const RegisterDocument = gql`
    mutation Register($token: String!, $name: String!, $email: String!, $birthday: DateTime!) {
  createUser(userData: {name: $name, email: $email, birthday: $birthday}, token: $token) {
    id
    name
    email
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
export const GetChannelsDocument = gql`
    query GetChannels($id: Float!) {
  channels(serverId: $id) {
    id
    name
    updatedAt
  }
}
    `;

/**
 * __useGetChannelsQuery__
 *
 * To run a query within a React component, call `useGetChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChannelsQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
        return Apollo.useQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, baseOptions);
      }
export function useGetChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
          return Apollo.useLazyQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, baseOptions);
        }
export type GetChannelsQueryHookResult = ReturnType<typeof useGetChannelsQuery>;
export type GetChannelsLazyQueryHookResult = ReturnType<typeof useGetChannelsLazyQuery>;
export type GetChannelsQueryResult = Apollo.QueryResult<GetChannelsQuery, GetChannelsQueryVariables>;
export const GetChannelDocument = gql`
    query GetChannel($id: Float!) {
  channel(channelId: $id) {
    id
    name
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
      }
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
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    createdAt
    servers {
      id
      name
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
    id
    name
    birthday
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
export const MyServersDocument = gql`
    query MyServers {
  myServers {
    id
    name
    channels {
      id
      name
      updatedAt
    }
    emotes {
      id
      name
      image
      owner {
        id
        name
      }
    }
    updatedAt
  }
}
    `;

/**
 * __useMyServersQuery__
 *
 * To run a query within a React component, call `useMyServersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyServersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyServersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyServersQuery(baseOptions?: Apollo.QueryHookOptions<MyServersQuery, MyServersQueryVariables>) {
        return Apollo.useQuery<MyServersQuery, MyServersQueryVariables>(MyServersDocument, baseOptions);
      }
export function useMyServersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyServersQuery, MyServersQueryVariables>) {
          return Apollo.useLazyQuery<MyServersQuery, MyServersQueryVariables>(MyServersDocument, baseOptions);
        }
export type MyServersQueryHookResult = ReturnType<typeof useMyServersQuery>;
export type MyServersLazyQueryHookResult = ReturnType<typeof useMyServersLazyQuery>;
export type MyServersQueryResult = Apollo.QueryResult<MyServersQuery, MyServersQueryVariables>;
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
    id
    name
    image
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