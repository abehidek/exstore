/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Naive DateTime` scalar type represents a naive date and time without
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string.
   */
  NaiveDateTime: any;
};

export type CreateProductInput = {
  name: Scalars['String'];
  photo?: InputMaybe<Scalars['String']>;
};

export type MePayload = {
  __typename?: 'MePayload';
  id: Scalars['String'];
  insertedAt: Scalars['NaiveDateTime'];
  token: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  insertedAt: Scalars['NaiveDateTime'];
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  updatedAt: Scalars['NaiveDateTime'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  createProduct: Product;
  createUser?: Maybe<User>;
  deleteProduct: Product;
  signIn?: Maybe<SignInPayload>;
  signOut: MePayload;
};


export type RootMutationTypeCreateProductArgs = {
  product: CreateProductInput;
};


export type RootMutationTypeCreateUserArgs = {
  user: UserInput;
};


export type RootMutationTypeDeleteProductArgs = {
  productId: Scalars['Int'];
};


export type RootMutationTypeSignInArgs = {
  credentials: SignInInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  listProducts?: Maybe<Array<Maybe<Product>>>;
  me?: Maybe<MePayload>;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  token: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

/** Basic unit of authentication */
export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  cpf: Scalars['String'];
  email: Scalars['String'];
  insertedAt: Scalars['NaiveDateTime'];
  name: Scalars['String'];
  passwordHash: Scalars['String'];
  updatedAt: Scalars['NaiveDateTime'];
};

export type UserInput = {
  address: Scalars['String'];
  cpf: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'RootQueryType', me?: { __typename?: 'MePayload', token: string, id: string, userId: string, user: { __typename?: 'User', name: string, address: string, email: string, cpf: string, insertedAt: any, updatedAt: any, passwordHash: string } } | null };


export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"cpf"}},{"kind":"Field","name":{"kind":"Name","value":"insertedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passwordHash"}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;