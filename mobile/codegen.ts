import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://127.0.0.1:4000/graphql",
  documents: ["src/**/*.{tsx,ts,gql,graphql,js,jsx}"],
  ignoreNoDocuments: true,
  generates: {
    "src/__gql__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
