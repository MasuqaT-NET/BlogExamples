import { Header } from "./parts/Header";
import { Attributes } from "./parts/Attributes";
import { css } from "@emotion/react";

type Props = { name: string };

type Dependencies = {};

function useObject({ name }: Props, {}: Dependencies) {
  const [attributesProps] = Attributes.useObject({ name }, {});

  return [{ name, attributesProps }];
}

function View({ name, attributesProps }: ReturnType<typeof useObject>[0]) {
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
        <Attributes.View {...attributesProps} />
      </div>
    </div>
  );
}

export const TextPanel = { useObject, View };
