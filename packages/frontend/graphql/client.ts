import { ApolloClient, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const APOLLO_URI = serverRuntimeConfig.APOLLO_URI || publicRuntimeConfig.APOLLO_URI;

export const client = new ApolloClient({
  uri: `${APOLLO_URI}/graphql`,
  cache: new InMemoryCache(),
});
