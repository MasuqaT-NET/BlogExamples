import { css } from "@emotion/react";

export function Header({ name }: { name: string }) {
  return (
    <div>
      <h1
        css={css`
          font-size: 18px;
          font-weight: bold;
        `}
      >
        {name}
      </h1>
    </div>
  );
}
