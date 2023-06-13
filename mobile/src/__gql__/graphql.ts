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
  listProducts?: Maybe<Array<Product>>;
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
  id: Scalars['Int'];
  insertedAt: Scalars['NaiveDateTime'];
  name: Scalars['String'];
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


export type GetMeQuery = { __typename?: 'RootQueryType', me?: { __typename?: 'MePayload', token: string, id: string, userId: string, user: { __typename?: 'User', id: number, name: string, address: string, email: string, cpf: string, insertedAt: any, updatedAt: any } } | null };

export type SignInMutationVariables = Exact<{
  credentials: SignInInput;
}>;


export type SignInMutation = { __typename?: 'RootMutationType', signIn?: { __typename?: 'SignInPayload', token: string, userId: string, user: { __typename?: 'User', id: number, address: string, cpf: string, email: string, name: string } } | null };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'RootMutationType', signOut: { __typename?: 'MePayload', id: string, token: string, userId: string, user: { __typename?: 'User', cpf: string, name: string } } };

export type CreateProductMutationVariables = Exact<{
  product: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'RootMutationType', createProduct: { __typename?: 'Product', id: number, insertedAt: any, name: string, photo?: string | null, updatedAt: any } };

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type DeleteProductMutation = { __typename?: 'RootMutationType', deleteProduct: { __typename?: 'Product', id: number, name: string, insertedAt: any, photo?: string | null } };

export type ListProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListProductsQuery = { __typename?: 'RootQueryType', listProducts?: Array<{ __typename?: 'Product', id: number, name: string, photo?: string | null, insertedAt: any, updatedAt: any }> | null };


export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"cpf"}},{"kind":"Field","name":{"kind":"Name","value":"insertedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"credentials"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"credentials"},"value":{"kind":"Variable","name":{"kind":"Name","value":"credentials"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"cpf"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cpf"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cpf"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"product"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"insertedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"insertedAt"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const ListProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"insertedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ListProductsQuery, ListProductsQueryVariables>;