"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { BOARDS_DATA } from "@/data/boards";
import type { Board } from "@/types/board";
import { loadInitialBoards, saveBoards } from "@/lib/storage";

type BoardsContextValue = {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  addBoard: (title: string) => void;
  moveBoard: (activeBoardId: string, replaceBoardId: string) => void;
  deleteBoard: (boardId: string) => void;
};

const BoardsContext = createContext<BoardsContextValue | undefined>(undefined);

export const BoardsProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>(() => loadInitialBoards());

  useEffect(() => {
    saveBoards(boards);
  }, [boards]);

  const addBoard = useCallback((title: string) => {
    setBoards((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: title.trim() || "Untitled Board",
        cards: [],
      },
    ]);
  }, []);

  const moveBoard = useCallback(
    (activeBoardId: string, replaceBoardId: string) => {
      setBoards((prev) => {
        const oldIndex = prev.findIndex((b) => b.id === activeBoardId);
        const newIndex = prev.findIndex((b) => b.id === replaceBoardId);

        if (oldIndex === -1 || newIndex === -1) return prev;

        const newBoards = [...prev];
        const [moved] = newBoards.splice(oldIndex, 1);
        newBoards.splice(newIndex, 0, moved);

        return newBoards;
      });
    },
    []
  );

  const deleteBoard = useCallback((boardId: string) => {
    setBoards((prev) => prev.filter((b) => b.id !== boardId));
  }, []);

  return (
    <BoardsContext.Provider
      value={{ boards, setBoards, addBoard, moveBoard, deleteBoard }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

export const useBoards = () => {
  const ctx = useContext(BoardsContext);
  if (!ctx) throw new Error("useBoards must be used inside BoardsProvider");
  return ctx;
};
