import styled from "styled-components";
import SingleBoard from "../Cards/SingleBoard";
import AddBoard from "../Forms/AddBoard";
import { useBoards } from "@/context/board";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTasks } from "@/context/task";
import { useState } from "react";

const Boards = () => {
  const { boards, moveBoard } = useBoards();
  const { moveTask } = useTasks();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current as any;
    const overData = over.data.current as any;

    // board dragging
    if (activeData?.type === "board" && overData?.type === "board") {
      if (active.id !== over.id) {
        moveBoard(active.id as string, over.id as string);
      }
      return;
    }

    // task dragging
    if (activeData?.type === "task") {
      const fromBoardId = activeData.boardId;

      let toBoardId = fromBoardId;
      let overTaskId: string | null = null;

      if (overData?.type === "task") {
        toBoardId = overData.boardId;
        overTaskId = over.id as string;
      } else if (overData?.type === "board") {
        toBoardId = overData.boardId;
        overTaskId = null;
      }

      moveTask(active.id as string, fromBoardId, toBoardId, overTaskId);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={boards.map((b) => b.id)}
        strategy={horizontalListSortingStrategy}
      >
        <BoardsStyled>
          {boards.map((item, i) => {
            return <SingleBoard data={item} key={i} />;
          })}

          <AddBoard />
        </BoardsStyled>
      </SortableContext>
    </DndContext>
  );
};

export default Boards;

const BoardsStyled = styled.div`
  width: 100%;
  padding: 2.5rem;
  margin: 0 auto;
  height: 80vh;

  display: flex;
  align-items: flex-start;
  gap: 1.25rem;

  overflow-x: auto;

  & > * {
    width: 300px;
    flex-shrink: 0;
  }
`;
