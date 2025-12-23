import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../../packages/contracts/schema.graphql",
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/generated/graphql/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
    },
  },
};

export default config;
