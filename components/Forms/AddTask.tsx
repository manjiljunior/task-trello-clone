"use client";
import styled from "styled-components";
import Input from "@/shared/Input";
import { useState } from "react";
import { useGlobal } from "@/context/global";
import { IconPlus, IconX } from "@tabler/icons-react";
import { toast } from "sonner";
import { hexToRgba } from "@/utils";
import { useTasks } from "@/context/task";

interface Props {
  boardId: string;
}

const AddTask = ({ boardId }: Props) => {
  const { setCursorStyle } = useGlobal();
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError(true);
      toast.error("Please enter a task title");
      return;
    }

    addTask(boardId, title.trim());
    setTitle("");
    setLoading(false);
    setError(false);
  };

  const handleCancel = () => {
    setLoading(false);
    setTitle("");
    setError(false);
  };

  return (
    <AddTaskCard
      onMouseEnter={() => setCursorStyle("none")}
      onMouseLeave={() => setCursorStyle("default")}
    >
      {loading ? (
        <form className="addTask__form" onSubmit={handleSubmit}>
          <Input
            autoFocus
            value={title}
            placeholder="Add Task"
            error={error}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error && e.target.value.trim()) {
                setError(false);
              }
            }}
          />

          <div className="addTask__form--actionRow">
            <button className="addTask__form--actionRow-submit" type="submit">
              Add Task
            </button>

            <button
              className="addTask__form--actionRow-cancel"
              onClick={handleCancel}
            >
              <IconX stroke={1.35} size={23} />
            </button>
          </div>
        </form>
      ) : (
        <div className="addTask__addBtn" onClick={() => setLoading(true)}>
          <IconPlus stroke={1.35} size={22} />
          Add another task
        </div>
      )}
    </AddTaskCard>
  );
};

export default AddTask;

const AddTaskCard = styled.div`
  width: 100%;

  .addTask {
    &__addBtn {
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: all ease-in-out 0.2s;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.35rem;

      h3 {
        font-size: 0.85rem;
        font-weight: 500;
      }

      &:hover {
        background-color: ${({ theme }) => hexToRgba(theme.colors.black, 0.05)};
      }

      ${({ theme }) =>
        theme.mode === "dark" &&
        `
        background-color: ${theme.colors.bg};

        &:hover {
          background-color: ${theme.colors.primary};
          color: #000;
        }
      `}
    }

    &__form {
      &--input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        outline: 2px solid transparent;
        outline-offset: 2px;
        font-size: 0.95rem;

        &:focus {
          outline: 2px solid ${({ theme }) => theme.colors.primaryDark};
        }

        &::placeholder {
          font-weight: 300;
        }
      }

      &--input.error {
        border-color: ${({ theme }) => theme.colors.danger};
        outline: 2px solid ${({ theme }) => theme.colors.danger};

        &::placeholder {
          color: ${({ theme }) => theme.colors.danger};
        }
      }

      button {
        height: 2rem;
        border: none;
        outline: none;
        line-height: 1;
        cursor: pointer;
      }

      &--actionRow {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding-top: 0.75rem;

        &-submit {
          background-color: ${({ theme }) => theme.colors.primary};
          color: #000;
          border-radius: 0.4rem;
          padding: 0.5rem 0.5rem;
          text-transform: capitalize;
          font-weight: 500;
        }

        &-cancel {
          height: 100%;
          aspect-ratio: 1 / 1;
          width: auto;
          background-color: rgba(0, 0, 0, 0.15);
          border-radius: 0.4rem;
          transition: all 0.2s ease-in-out;

          &:hover {
            background-color: ${({ theme }) => theme.colors.danger};
          }

          ${({ theme }) =>
            theme.mode === "dark" &&
            `
            background-color: ${theme.colors.danger};
          `}
        }
      }
    }
  }
`;
