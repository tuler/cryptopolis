import type { CodegenConfig } from "@graphql-codegen/cli";
const schema = "graphql/schema.graphql";

const plugins = [
    {
        add: {
            content:
                'import type { DocumentNode } from "graphql/language/ast";',
        },
    },
    "typescript",
    "typescript-operations",
    "typescript-urql",
];

const config = {
    withHooks: true,
};

console.info(`Codegen will use schema URL: ${schema}`);

const codegenConfig: CodegenConfig = {
    schema,
    documents: "./graphql/queries.graphql",
    generates: {
        "src/hooks/graphql.tsx": {
            plugins,
            config,
        },
    },
};

export default codegenConfig;
