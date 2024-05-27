import { FC } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { InputNoticeFragmentDoc } from "@/hooks/graphql/graphql";

export type GraphQLProviderProps = {
    children?: React.ReactNode;
};

const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL;

if (!uri)
    throw new Error(
        "NEXT_PUBLIC_GRAPHQL_URL environment variable is not defined"
    );

const GraphQLProvider: FC<GraphQLProviderProps> = (props) => {
    const client = new ApolloClient({
        uri,
        cache: new InMemoryCache({
            fragments: createFragmentRegistry(InputNoticeFragmentDoc),
        }),
    });
    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default GraphQLProvider;
