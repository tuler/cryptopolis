import type { CodegenConfig } from "@graphql-codegen/cli";
const schema = "graphql/schema.graphql";

const plugins = [
    "typescript",
    "typescript-operations",
    "typescript-react-apollo",
];
const config = {
    withHooks: true,
};

console.info(`Codegen will use schema URL: ${schema}`);

const codegenConfig: CodegenConfig = {
    schema,
    documents: "./graphql/queries.graphql",
    generates: {
        "src/hooks/graphql/": {
            preset: "client",
            plugins: [],
            presetConfig: {
                gqlTagName: "gql",
                //fragmentMasking: { unmaskFunctionName: "getFragmentData" },
                fragmentMasking: false,
            },
        },
    },
};

export default codegenConfig;
