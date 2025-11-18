import { BOARDS_DATA } from "@/data/boards";
import type { Board } from "@/types/board";

const STORAGE_KEY = "trello_task_boards";

export function loadInitialBoards(): Board[] {
  if (typeof window === "undefined") return BOARDS_DATA;

  try {
    const savedBoards = window.localStorage.getItem(STORAGE_KEY);
    if (!savedBoards) return BOARDS_DATA;

    const parsed = JSON.parse(savedBoards) as Board[];
    return Array.isArray(parsed) ? parsed : BOARDS_DATA;
  } catch (err) {
    return BOARDS_DATA;
  }
}

export const saveBoards = (boards: Board[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
  } catch (e) {
    console.error("Failed to save boards to localStorage", e);
  }
};
