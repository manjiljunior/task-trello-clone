"use client";
import Image from "next/image";
import styled from "styled-components";
import { useGlobal } from "@/context/global";
import { useTheme } from "@/context/theme";

const Navbar = () => {
  const { mode, toggleMode } = useTheme();
  const { setCursorStyle } = useGlobal();

  return (
    <NavbarStyled>
      <Image
        onMouseEnter={() => setCursorStyle("link")}
        onMouseLeave={() => setCursorStyle("default")}
        className="logo"
        height={200}
        width={200}
        src={`${
          mode === "light" ? "/icons/logo-dark.png" : "/icons/logo-light.png"
        }`}
        alt="Trello Task"
      />

      <button
        onMouseEnter={() => setCursorStyle("link")}
        onMouseLeave={() => setCursorStyle("default")}
        className="themeToggler"
        onClick={toggleMode}
      ></button>
    </NavbarStyled>
  );
};

export default Navbar;

const NavbarStyled = styled.nav`
  background-color: transparent;
  width: 90%;
  margin: 0 auto;
  height: 5rem;
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    height: 3.5rem;
    width: auto;
    cursor: pointer;
  }

  .themeToggler {
    width: 1.5rem;
    height: 1.5rem;
    background-color: #fff;
    border-radius: 10rem;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: ${({ theme }) =>
      theme.mode === "light" ? "#000" : "#fff"};
  }
`;
