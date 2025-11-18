export type Card = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export type Board = {
  id: string;
  title: string;
  cards: Card[];
};

export type BoardState = {
  boards: Board[];
};
