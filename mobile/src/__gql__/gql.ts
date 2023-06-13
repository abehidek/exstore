/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query getMe {\n      me {\n        token\n        id\n        userId\n        user {\n          id name address email cpf insertedAt updatedAt\n        }\n      }\n    }\n  ": types.GetMeDocument,
    "\n    mutation signIn($credentials: SignInInput!) {\n      signIn(credentials: $credentials) {\n        user {\n          id\n          address\n          cpf\n          email\n          name\n        }\n        token\n        userId\n      }\n    }\n  ": types.SignInDocument,
    "\n    mutation signOut {\n      signOut {\n        id\n        user {\n          cpf\n          name\n          cpf\n        }\n        token\n        userId\n      }\n    }\n  ": types.SignOutDocument,
    "\n    mutation createProduct($product: CreateProductInput!) {\n      createProduct(product:$product) {\n        id\n        insertedAt\n        name\n        photo\n        updatedAt\n      }\n    }\n  ": types.CreateProductDocument,
    "\n    mutation deleteProduct($productId:Int!){\n      deleteProduct(productId:$productId){\n        id\n        name\n        insertedAt\n        photo\n      }\n    }\n  ": types.DeleteProductDocument,
    "\n    query listProducts {\n      listProducts {\n        id\n        name\n        photo\n        insertedAt\n        updatedAt\n      }\n    }\n  ": types.ListProductsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getMe {\n      me {\n        token\n        id\n        userId\n        user {\n          id name address email cpf insertedAt updatedAt\n        }\n      }\n    }\n  "): (typeof documents)["\n    query getMe {\n      me {\n        token\n        id\n        userId\n        user {\n          id name address email cpf insertedAt updatedAt\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation signIn($credentials: SignInInput!) {\n      signIn(credentials: $credentials) {\n        user {\n          id\n          address\n          cpf\n          email\n          name\n        }\n        token\n        userId\n      }\n    }\n  "): (typeof documents)["\n    mutation signIn($credentials: SignInInput!) {\n      signIn(credentials: $credentials) {\n        user {\n          id\n          address\n          cpf\n          email\n          name\n        }\n        token\n        userId\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation signOut {\n      signOut {\n        id\n        user {\n          cpf\n          name\n          cpf\n        }\n        token\n        userId\n      }\n    }\n  "): (typeof documents)["\n    mutation signOut {\n      signOut {\n        id\n        user {\n          cpf\n          name\n          cpf\n        }\n        token\n        userId\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation createProduct($product: CreateProductInput!) {\n      createProduct(product:$product) {\n        id\n        insertedAt\n        name\n        photo\n        updatedAt\n      }\n    }\n  "): (typeof documents)["\n    mutation createProduct($product: CreateProductInput!) {\n      createProduct(product:$product) {\n        id\n        insertedAt\n        name\n        photo\n        updatedAt\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation deleteProduct($productId:Int!){\n      deleteProduct(productId:$productId){\n        id\n        name\n        insertedAt\n        photo\n      }\n    }\n  "): (typeof documents)["\n    mutation deleteProduct($productId:Int!){\n      deleteProduct(productId:$productId){\n        id\n        name\n        insertedAt\n        photo\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query listProducts {\n      listProducts {\n        id\n        name\n        photo\n        insertedAt\n        updatedAt\n      }\n    }\n  "): (typeof documents)["\n    query listProducts {\n      listProducts {\n        id\n        name\n        photo\n        insertedAt\n        updatedAt\n      }\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;