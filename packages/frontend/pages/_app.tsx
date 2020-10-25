import React from "react";

import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";

import { client } from "../graphql/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
