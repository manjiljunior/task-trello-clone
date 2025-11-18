import styled from "styled-components";
import { hexToRgba } from "@/utils";

interface Props {
  title: string;
}

const NoResults = ({ title }: Props) => {
  return <NoResultsStyled>{title}</NoResultsStyled>;
};

export default NoResults;

const NoResultsStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => hexToRgba(theme.colors.primaryLight, 0.5)};
  font-size: 0.95rem;
  padding: 0.5rem 0;

  ${({ theme }) =>
    theme.mode === "dark" &&
    `
      background-color: ${hexToRgba(theme.colors.danger, 0.25)};
    `}
`;
