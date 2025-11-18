"use client";
import { createContext, useContext, ReactNode, useCallback } from "react";
import { useBoards } from "@/context/board";

type TasksContextType = {
  addTask: (boardId: string, title: string, description?: string) => void;
  toggleTaskCompleted: (boardId: string, taskId: string) => void;
  deleteTask: (boardId: string, taskId: string) => void;
  moveTask: (
    taskId: string,
    fromBoardId: string,
    toBoardId: string,
    overTaskId: string | null
  ) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const { boards, setBoards } = useBoards();

  const addTask = useCallback(
    (boardId: string, title: string, description?: string) => {
      setBoards((prev) =>
        prev.map((b) =>
          b.id === boardId
            ? {
                ...b,
                cards: [
                  ...b.cards,
                  {
                    id: crypto.randomUUID(),
                    title,
                    description,
                    completed: false,
                  },
                ],
              }
            : b
        )
      );
    },
    [setBoards]
  );

  const toggleTaskCompleted = useCallback(
    (boardId: string, taskId: string) => {
      setBoards((prev) =>
        prev.map((b) =>
          b.id === boardId
            ? {
                ...b,
                cards: b.cards.map((card) =>
                  card.id === taskId
                    ? { ...card, completed: !card.completed }
                    : card
                ),
              }
            : b
        )
      );
    },
    [setBoards]
  );

  const deleteTask = useCallback(
    (boardId: string, taskId: string) => {
      setBoards((prev) =>
        prev.map((b) =>
          b.id === boardId
            ? {
                ...b,
                cards: b.cards.filter((card) => card.id !== taskId),
              }
            : b
        )
      );
    },
    [setBoards]
  );

  const moveTask = useCallback(
    (
      taskId: string,
      fromBoardId: string,
      toBoardId: string,
      overTaskId: string | null
    ) => {
      setBoards((prev) => {
        const boardsCopy = prev.map((b) => ({ ...b, cards: [...b.cards] }));

        const fromBoard = boardsCopy.find((b) => b.id === fromBoardId);
        const toBoard = boardsCopy.find((b) => b.id === toBoardId);

        if (!fromBoard || !toBoard) return prev;

        const fromIndex = fromBoard.cards.findIndex((c) => c.id === taskId);
        if (fromIndex === -1) return prev;

        const [movedTask] = fromBoard.cards.splice(fromIndex, 1);

        let insertIndex =
          overTaskId !== null
            ? toBoard.cards.findIndex((c) => c.id === overTaskId)
            : toBoard.cards.length;

        if (insertIndex === -1) {
          insertIndex = toBoard.cards.length;
        }

        toBoard.cards.splice(insertIndex, 0, movedTask);

        return boardsCopy;
      });
    },
    [setBoards]
  );

  return (
    <TasksContext.Provider
      value={{ addTask, toggleTaskCompleted, deleteTask, moveTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside TasksProvider");
  return ctx;
};
