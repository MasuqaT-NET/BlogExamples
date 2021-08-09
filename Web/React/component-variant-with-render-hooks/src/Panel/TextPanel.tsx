import { useHeader } from "./parts/Header";
import { useAttributes } from "./parts/Attributes";
import { css } from "@emotion/react";

type Props = { name: string; onChangeName?: (name: string) => void };

type Dependencies = {};

export function useTextPanel({ name, onChangeName }: Props, {}: Dependencies) {
  const { render: Header } = useHeader({ name });
  const { render: Attributes } = useAttributes({ name, onChangeName }, {});

  return {
    render: () => (
      <div
        css={css`
          padding: 16px;
        `}
      >
        <div>
          <Header />
        </div>
        <div
          css={css`
            margin-top: 16px;
          `}
        >
          <Attributes />
        </div>
      </div>
    ),
  };
}
