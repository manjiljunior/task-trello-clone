"use client";
import StyledComponentsRegistry from "@/styles/registry";
import { StyledThemeProvider } from "./StyledThemeProvider";
import { ThemeProvider } from "@/context/theme";
import { GlobalStyles } from "@/styles/globalStyles";
import { GlobalProvider } from "@/context/global";
import { BoardsProvider } from "@/context/board";
import { Toaster } from "sonner";
import { TasksProvider } from "@/context/task";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <GlobalProvider>
        <BoardsProvider>
          <TasksProvider>
            <StyledComponentsRegistry>
              <StyledThemeProvider>
                <GlobalStyles />
                <Toaster richColors />
                {children}
              </StyledThemeProvider>
            </StyledComponentsRegistry>
          </TasksProvider>
        </BoardsProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}
