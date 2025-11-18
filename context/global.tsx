import React, { createContext, ReactNode, useContext, useState } from "react";

interface GlobalContextProps {
  cursorStyle: string;
  setCursorStyle: (val: string) => void;
}

export const GlobalContext = createContext<GlobalContextProps>(
  {} as GlobalContextProps
);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [cursorStyle, setCursorStyle] = useState("default");

  return (
    <GlobalContext.Provider
      value={{
        cursorStyle,
        setCursorStyle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobal() {
  const ctx = useContext(GlobalContext);
  if (!ctx) {
    throw new Error("useGlobal must be used inside GlobalProvider");
  }
  return ctx;
}
