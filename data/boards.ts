import type { Board } from "@/types/board";

export const BOARDS_DATA: Board[] = [
  { id: "todo", title: "To Do", cards: [] },
  { id: "inprogress", title: "In Progress", cards: [] },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "da1",
        title: "tast 1",
        description: "hello",
        completed: false,
      },
      {
        id: "da2",
        title: "tast 1",
        description: "hello",
        completed: false,
      },
      {
        id: "da3",
        title: "tast 1",
        description: "hello",
        completed: false,
      },
      {
        id: "da4",
        title: "tast 1",
        description: "hello",
        completed: false,
      },
      {
        id: "da5",
        title: "tast 1",
        description: "hello",
        completed: false,
      },
    ],
  },
];
