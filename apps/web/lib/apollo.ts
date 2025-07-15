import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            console.error(
                "[GraphQL error]:",
                { message, locations, path, extensions, operation }
            );
        });
    }

    if (networkError) {
        console.error("[Network error]:", networkError);
    }
});

const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT!!,
    fetch,
    headers: {
        "x-api-key": process.env.API_KEY!,
    },
});

const link = ApolloLink.from([errorLink, httpLink]);

const createApolloClient = () => {
    return new ApolloClient({
        link,
        ssrMode: typeof window === 'undefined',
        cache: new InMemoryCache(),
    });
};

const client = createApolloClient();

export { client };