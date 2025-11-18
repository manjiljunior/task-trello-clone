"use client";
import styled from "styled-components";
import { useState } from "react";
import { useBoards } from "@/context/board";
import { useGlobal } from "@/context/global";
import { IconPlus, IconX } from "@tabler/icons-react";
import { toast } from "sonner";
import Input from "@/shared/Input";

const AddBoard = () => {
  const { setCursorStyle } = useGlobal();
  const { addBoard } = useBoards();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError(true);
      toast.error("Please enter a board title");
      return;
    }

    addBoard(title.trim());
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
    <AddBoardCard
      onMouseEnter={() => setCursorStyle("none")}
      onMouseLeave={() => setCursorStyle("default")}
    >
      {loading ? (
        <form className="addBoard__form" onSubmit={handleSubmit}>
          <Input
            autoFocus
            value={title}
            placeholder="Add Title"
            error={error}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error && e.target.value.trim()) {
                setError(false);
              }
            }}
          />

          <div className="addBoard__form--actionRow">
            <button className="addBoard__form--actionRow-submit" type="submit">
              Add board
            </button>

            <button
              className="addBoard__form--actionRow-cancel"
              onClick={handleCancel}
            >
              <IconX stroke={1.35} size={23} />
            </button>
          </div>
        </form>
      ) : (
        <div className="addBoard__addBtn" onClick={() => setLoading(true)}>
          <IconPlus stroke={1.35} size={22} />
          Add another board
        </div>
      )}
    </AddBoardCard>
  );
};

export default AddBoard;

const AddBoardCard = styled.div`
  width: 100%;
  font-family: "Poppins", sans-serif;

  .addBoard {
    &__addBtn {
      background: ${({ theme }) => theme.colors.black};
      border-radius: 0.4rem;
      padding: 0.75rem;
      border: none;
      outline: none;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      text-transform: capitalize;
      width: 100%;
      font-size: 0.9rem;
      transition: all ease-in-out 0.2s;
      border: 1px solid transparent;

      &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.black};
        cursor: pointer;
        border: 1px solid ${({ theme }) => theme.colors.card};
      }

      ${({ theme }) =>
        theme.mode === "dark" &&
        `
        background: ${theme.colors.primary};
        color: #000000;

        &:hover {
          border: 1px solid transparent;
          color: #000000;
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
