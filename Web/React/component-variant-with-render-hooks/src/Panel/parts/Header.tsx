import { css } from "@emotion/react";

export function useHeader({ name }: { name: string }) {
  return {
    render: () => (
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
    ),
  };
}
