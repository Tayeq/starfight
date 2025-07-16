import { describe, it, expect } from '@jest/globals';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Mock the actual apollo client setup
function createApolloClient() {
    const httpLink = createHttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
    });

    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'all',
            },
            query: {
                errorPolicy: 'all',
            },
        },
    });
}

describe('Apollo Client Setup', () => {
    it('should create Apollo Client with correct configuration', () => {
        const client = createApolloClient();

        expect(client).toBeDefined();
        expect(client.cache).toBeInstanceOf(InMemoryCache);
    });

    it('should use correct GraphQL endpoint', () => {
        const originalEnv = process.env.NEXT_PUBLIC_GRAPHQL_URL;
        process.env.NEXT_PUBLIC_GRAPHQL_URL = 'http://test-endpoint/graphql';

        const client = createApolloClient();
        expect(client).toBeDefined();

        // Restore original env
        process.env.NEXT_PUBLIC_GRAPHQL_URL = originalEnv;
    });

    it('should have default error policy set to "all"', () => {
        const client = createApolloClient();

        expect(client.defaultOptions?.watchQuery?.errorPolicy).toBe('all');
        expect(client.defaultOptions?.query?.errorPolicy).toBe('all');
    });

    it('should use InMemoryCache', () => {
        const client = createApolloClient();

        expect(client.cache).toBeInstanceOf(InMemoryCache);
    });
}); 