import type { Board } from "@/types/board";

export const BOARDS_DATA: Board[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      {
        id: "1",
        title: "Adding theme mode",
        description: "",
        completed: true,
      },
      {
        id: "2",
        title: "Saving into database",
        description: "",
        completed: false,
      },
      {
        id: "3",
        title: "Adding authentication",
        description: "",
        completed: false,
      },
      {
        id: "4",
        title: "Sharing feature",
        description: "",
        completed: false,
      },
    ],
  },
  { id: "inprogress", title: "In Progress", cards: [] },
  {
    id: "done",
    title: "Done",
    cards: [],
  },
];
