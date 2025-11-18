import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: {
      bg: string;
      text: string;
      primary: string;
      primaryLight: string;
      primaryDark: string;
      card: string;
      danger: string;
      black: string;
      white: string
    };
    shadows: {
      airbnb: string;
      customSm: string;
    };
  }
}
