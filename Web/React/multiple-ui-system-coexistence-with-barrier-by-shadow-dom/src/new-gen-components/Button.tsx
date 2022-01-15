import { type ReactNode } from "react";
import { css } from "@emotion/react";

type Props = {
  children?: ReactNode;
  onClick?: () => void;
};

export const Button = ({ children, onClick }: Props) => (
  <button
    type="button"
    css={css`
      font-size: calc(10px + 2vmin);
    `}
    onClick={onClick}
  >
    {children}
  </button>
);
