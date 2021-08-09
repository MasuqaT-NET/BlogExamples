import { Header } from "./parts/Header";
import { AttributesView, useAttributes } from "./parts/Attributes";
import { css } from "@emotion/react";

type Props = { name: string };

type Dependencies = {};

export function useTextPanel({ name }: Props, {}: Dependencies) {
  const attributes = useAttributes({ name }, {});

  return { name, attributes };
}

export function TextPanelView({
  name,
  attributes,
}: ReturnType<typeof useTextPanel>) {
  return (
    <div
      css={css`
        padding: 16px;
      `}
    >
      <div>
        <Header name={name} />
      </div>
      <div
        css={css`
          margin-top: 16px;
        `}
      >
        <AttributesView {...attributes} />
      </div>
    </div>
  );
}
