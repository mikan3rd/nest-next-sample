import React from "react";

import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";

import { client } from "@/graphql/client";
import { GlobalStyle } from "@/styles/GlobalStyle";

import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      {GlobalStyle}
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
