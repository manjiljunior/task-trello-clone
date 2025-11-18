"use client";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "@/styles/theme";
import { useTheme } from "@/context/theme";

export function StyledThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useTheme();
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
