import React from "react";

import { Global, css } from "@emotion/core";

export const GlobalStyle = (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        margin: 0;
        color: white;
        box-sizing: border-box;
        white-space: pre-wrap;
        word-break: break-word;
        -webkit-overflow-scrolling: touch;
      }
      body {
        background-color: #1b1c1d;
        min-height: 100vh;
      }
    `}
  />
);
