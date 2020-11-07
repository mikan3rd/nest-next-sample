import React from "react";

import { Global, css } from "@emotion/core";

export const GlobalStyle = (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        margin: 0;
        box-sizing: border-box;
        white-space: pre-wrap;
        word-break: break-word;
        -webkit-overflow-scrolling: touch;
      }
      body {
        background-color: #f7f7f7;
        min-height: 100vh;
      }
    `}
  />
);
