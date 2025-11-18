"use client";

import styled from "styled-components";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

const InputBase = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.95rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: all 0.15s ease-in-out;

  border: 1px solid
    ${({ $error, theme }) =>
      $error
        ? theme.colors.danger
        : theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.25)"
        : "rgba(0, 0, 0, 0.2)"};

  background: ${({ theme }) =>
    theme.mode === "dark" ? theme.colors.card : "#ffffff"};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: 2px solid
      ${({ theme, $error }) =>
        $error ? theme.colors.danger : theme.colors.primaryDark};
  }

  &::placeholder {
    font-weight: 400;
    color: ${({ theme, $error }) =>
      $error
        ? theme.colors.danger
        : theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.6)"
        : "rgba(0, 0, 0, 0.4)"};
  }
`;

const Input: React.FC<Props> = ({ error, ...rest }) => {
  return <InputBase $error={error} {...rest} />;
};

export default Input;
