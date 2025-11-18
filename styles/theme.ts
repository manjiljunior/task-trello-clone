import { DefaultTheme } from "styled-components";
import { baseTheme } from "./baseTheme";

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  mode: "light",
  colors: {
    bg: "#F8FAFC",
    text: "#0F172A",
    primary: "#74F5A1",
    primaryLight: "#d5fce3",
    primaryDark: "#3c7c52",
    card: "#ffff",
    danger: "#D34E4E",
    black: "#000000",
    white: "#FFFFFF",
  },
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  mode: "dark",
  colors: {
    bg: "#101010",
    text: "#ffffff",
    primary: "#74F5A1",
    primaryLight: "#d5fce3",
    primaryDark: "#3c7c52",
    card: "#191919",
    danger: "#D34E4E",
    black: "#000000",
    white: "#FFFFFF",
  },
};
