"use client";
import Task from "../Task";
import styled from "styled-components";
import AddTask from "@/components/Forms/AddTask";
import NoResults from "@/components/NoResults";
import { useGlobal } from "@/context/global";
import { Board } from "@/types/board";
import { IconX } from "@tabler/icons-react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { hexToRgba } from "@/utils";
import { AnimatePresence } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import { useBoards } from "@/context/board";

interface Props {
  data: Board;
}

const SingleBoard = ({ data }: Props) => {
  const { setCursorStyle } = useGlobal();
  const { deleteBoard } = useBoards();
  const {
    attributes,
    listeners,
    setNodeRef: setSortableNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
    isDragging,
  } = useSortable({ id: data.id, data: { type: "board", boardId: data.id } });

  const draggingStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: "1rem",
  };

  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: data.id,
    data: {
      type: "board",
      boardId: data.id,
      isTaskDroppable: true,
    },
  });

  const setNodeRef = (node: HTMLElement | null) => {
    setSortableNodeRef(node);
    setDroppableNodeRef(node);
  };

  return (
    <SingleBoardStyled
      onMouseEnter={() => setCursorStyle("none")}
      onMouseLeave={() => setCursorStyle("default")}
      ref={setNodeRef}
      style={draggingStyle}
      {...attributes}
    >
      <div className={`card ${isDragging && "card__dragging"}`}>
        <div className="card__header" ref={setActivatorNodeRef} {...listeners}>
          <h2 className="card__header--title">{data.title}</h2>

          <div
            className="card__header--close"
            onClick={(e) => {
              e.stopPropagation();
              const ok = window.confirm(
                `Are you sure you want to delete "${data.title}"?`
              );
              if (ok) deleteBoard(data.id);
            }}
          >
            <IconX size={18} stroke={1.35} />
          </div>
        </div>

        <div className="card__boards">
          {data.cards?.length ? (
            <SortableContext
              items={data.cards.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
              id={data.id}
            >
              <AnimatePresence>
                {data.cards.map((item, i) => (
                  <Task key={item.id} data={item} boardId={data.id} />
                ))}
              </AnimatePresence>
            </SortableContext>
          ) : (
            <NoResults title="No tasks available." />
          )}
          <AddTask boardId={data.id} />
        </div>
      </div>
    </SingleBoardStyled>
  );
};

export default SingleBoard;

const SingleBoardStyled = styled.div`
  cursor: pointer;

  .card {
    border-radius: 0.65rem;
    background: ${({ theme }) => theme.colors.card};
    padding: 0;
    box-shadow: ${({ theme }) => theme.shadows.airbnb};

    &__dragging {
      border: 2px dashed ${({ theme }) => theme.colors.primaryDark};
      transform: rotate(10deg);
      transition: all ease-in-out 0.2s;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 0.5rem;
      border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
      margin-bottom: 1rem;
      padding: 1rem;

      &--title {
        font-size: 1rem;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.text};
        user-select: none;
      }

      &--close {
        height: auto;
        aspect-ratio: 1 / 1;
        width: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${({ theme }) =>
          theme.mode === "dark"
            ? hexToRgba(theme.colors.white, 0.15)
            : "rgba(0, 0, 0, 0.09)"};
        transition: all 0.2s ease-in-out;
        flex-shrink: 0;

        &:hover {
          background-color: ${({ theme }) => theme.colors.danger};
        }
      }
    }

    &__boards {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      padding: 0 0.75rem 1rem 0.75rem;
    }
  }
`;
