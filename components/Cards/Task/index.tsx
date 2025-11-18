import styled from "styled-components";
import { useTasks } from "@/context/task";
import { Card } from "@/types/board";
import { hexToRgba } from "@/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface Props {
  data: Card;
  boardId: string;
}

const Task = ({ data, boardId }: Props) => {
  const { toggleTaskCompleted, deleteTask } = useTasks();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(boardId, data.id);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: {
      type: "task",
      taskId: data.id,
      boardId,
    },
  });

  const draggingStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskStyled
      ref={setNodeRef}
      style={draggingStyle}
      {...attributes}
      {...listeners}
    >
      <div
        className={`main ${data.completed && "main__done"} ${
          isDragging && "main__dragging"
        }`}
      >
        <div
          className={`main__complete`}
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskCompleted(boardId, data.id);
          }}
        >
          {data.completed && (
            <IconCheck className="icon" size={18} stroke={2} />
          )}
        </div>
        <h3 className="main__title">{data.title}</h3>

        <div className={`main__delete`} onClick={handleDelete}>
          <IconTrash size={18} stroke={1.35} />
        </div>
      </div>
    </TaskStyled>
  );
};

export default Task;

const TaskStyled = styled.div`
  .main {
    position: relative;
    padding: 0.5rem 0.75rem;
    box-shadow: ${({ theme }) => theme.shadows.customSm};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.6rem;
    border: 1.5px solid transparent;
    overflow: hidden;

    ${({ theme }) =>
      theme.mode === "dark" &&
      `
      border: 1.5px solid ${hexToRgba("#FFFFFF", 0.1)};

      &:hover {
        border: 1.5px solid #FFFFFF !important;
      }
    `}

    &:hover {
      border: 1.5px solid #000;
    }

    &__dragging {
      border: 1.5px dashed
        ${({ theme }) =>
          theme.mode === "dark"
            ? theme.colors.white
            : theme.colors.primaryDark} !important;
      background-color: ${({ theme }) =>
        theme.mode === "dark"
          ? theme.colors.black
          : theme.colors.primaryLight} !important;
      transform: rotate(8deg);
    }

    &__complete {
      position: absolute;
      top: 50%;
      left: 0.35rem;
      transform: translateY(-50%);
      width: 1rem;
      height: 1rem;
      border-radius: 10rem;
      background: transparent;
      border: 1.5px solid
        ${({ theme }) =>
          theme.mode === "dark" ? theme.colors.white : theme.colors.black};
      transition: all ease-in-out 0.2s;
      opacity: 0;
      color: ${({ theme }) => theme.colors.black};
    }

    &__done {
      .main__complete {
        opacity: 1 !important;
        width: 1.2rem !important;
        height: 1.2rem !important;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1px;
        background-color: ${({ theme }) =>
          theme.mode === "dark"
            ? theme.colors.primary
            : theme.colors.primaryLight};
        border: 1.5px solid ${({ theme }) => theme.colors.black};
      }

      .main__title {
        transform: translateX(1.15rem);
      }

      .main__delete {
        transform: scale(1);
        opacity: 1;
      }
    }

    &__delete {
      position: absolute;
      right: 0;
      top: 0;
      width: 2.25rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => hexToRgba(theme.colors.danger, 0.2)};
      transition: all ease-in-out 0.2s;
      transform: scale(0);
      opacity: 0;

      &:hover {
        background-color: ${({ theme }) => theme.colors.danger};
      }
    }

    &__title {
      font-size: 0.9rem;
      font-weight: 500;
      transition: all ease-in-out 0.2s;

      &::first-letter {
        text-transform: capitalize;
      }
    }
  }

  &:hover {
    .main__complete {
      opacity: 1;
      z-index: 100;
    }

    .main__title {
      transform: translateX(1.15rem);
    }
  }
`;
