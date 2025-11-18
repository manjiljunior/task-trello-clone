"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --font-poppins: "Poppins", sans-serif;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: var(--font-poppins);
  }

  button, input {
    font-family: var(--font-poppins);

    &::placeholder {
      font-family: var(--font-poppins) !important;
    }
  }
`;
