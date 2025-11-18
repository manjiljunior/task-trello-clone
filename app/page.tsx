"use client";
import Cursor from "@/components/Cursor";
import { Fragment, useContext } from "react";
import { GlobalContext } from "@/context/global";
import Boards from "@/components/Boards";
import styled from "styled-components";

export default function Home() {
  const { cursorStyle } = useContext(GlobalContext);

  return (
    <Fragment>
      {/* <Cursor hoverElement={cursorStyle} /> */}

      <HomeStyled>
        <Boards />
      </HomeStyled>
    </Fragment>
  );
}

const HomeStyled = styled.div`
  margin-top: 3rem;
  height: calc(100% - 10rem);
  overflow-y: hidden;
`;
