import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:3300/graphql",
  cache: new InMemoryCache(),
});
