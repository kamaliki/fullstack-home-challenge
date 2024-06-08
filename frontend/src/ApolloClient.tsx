import { ApolloClient, InMemoryCache } from '@apollo/client';

/**
 * Create a new Apollo Client
 * The function takes an object with two properties:
 * uri: The URL of the GraphQL server
 * cache: The cache that Apollo Client will use to store the data
 * In this case, we're using the InMemoryCache, which is a normalized cache that stores data in memory
 * The cache is used to store the results of queries and mutations, so that they can be reused later
 */
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

export default client;