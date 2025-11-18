"use client";
import React, { useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { GlobalContext } from "@/context/global";
import { useMediaQuery } from "react-responsive";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  hoverElement?: string;
}

const CursorRoot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  transition: height 0.3s ease-out, width 0.3s ease-out;
  transform: translate(-50%, -50%);
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.6);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const BaseCircle = styled.div`
  border-radius: 9999px;
  animation: ${scaleIn} 0.25s ease-out;
`;

const DefaultCircle = styled(BaseCircle)`
  width: 1.75rem;
  height: 1.75rem;
  border: 1.5px solid
    ${({ theme }) =>
      theme.mode === "dark" ? theme.colors.white : theme.colors.black};
  background: transparent;
`;

const LinkCircle = styled(BaseCircle)`
  width: 3.25rem;
  height: 3.25rem;
  border: 2px solid
    ${({ theme }) =>
      theme.mode === "dark" ? theme.colors.white : theme.colors.black};
  background: transparent;
`;

const DragCircle = styled(BaseCircle)`
  width: 5rem;
  height: 5rem;
  border: 2px solid transparent;
  background: ${({ theme }) => theme.colors.primaryDark};
`;

const Cursor: React.FC<Props> = ({ hoverElement }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const { setCursorStyle } = useContext(GlobalContext);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 25, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 25, mass: 0.4 });

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    const bodyElement = document.getElementById("body");
    const handleMouseLeave = () => setCursorStyle("none");
    const handleMouseEnter = () => setCursorStyle("default");

    if (bodyElement) {
      bodyElement.addEventListener("mouseleave", handleMouseLeave);
      bodyElement.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (bodyElement) {
        bodyElement.removeEventListener("mouseleave", handleMouseLeave);
        bodyElement.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  }, [isMobile, x, y, setCursorStyle]);

  if (isMobile) return null;

  return (
    <CursorRoot
      style={{
        left: springX,
        top: springY,
      }}
    >
      {hoverElement === "default" && <DefaultCircle />}
      {hoverElement === "link" && <LinkCircle />}
      {hoverElement === "none" && null}
    </CursorRoot>
  );
};

export default Cursor;
