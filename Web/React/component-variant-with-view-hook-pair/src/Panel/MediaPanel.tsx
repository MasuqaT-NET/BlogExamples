import { Header } from "./parts/Header";
import { Attributes } from "./parts/Attributes";
import { Preview } from "./parts/Preview";
import { css, keyframes } from "@emotion/react";
import { useCallback, useState } from "react";

type Props = { id: string; name: string };

type Dependencies = { getPreviewUrl: (id: string) => Promise<string> };

function useObject({ id, name }: Props, { getPreviewUrl }: Dependencies) {
  const [previewUrl, setPreviewUrl] = useState<string>();

  const [previewProps] = Preview.useObject({ previewUrl }, {});
  const [attributesProps, { editing: attributesEditing }] =
    Attributes.useObject({ name }, {});

  const load = useCallback(async () => {
    setPreviewUrl(undefined);
    setPreviewUrl(await getPreviewUrl(id));
  }, [id, getPreviewUrl]);

  return [
    { name, attributesEditing, previewProps, attributesProps },
    { load },
  ] as const;
}

function View({
  name,
  attributesEditing,
  previewProps,
  attributesProps,
}: ReturnType<typeof useObject>[0]) {
  const [previewHovered, setPreviewHovered] = useState(false);

  return (
    <div
      css={css`
        padding: 16px;
      `}
    >
      <div
        css={
          previewHovered &&
          !attributesEditing &&
          css`
            animation: ${bounce} 0.4s ease infinite;
          `
        }
      >
        <Header name={name} />
      </div>
      <div
        css={css`
          margin-top: 16px;
        `}
        onMouseEnter={() => setPreviewHovered(true)}
        onMouseLeave={() => setPreviewHovered(false)}
      >
        <Preview.View {...previewProps} />
      </div>
      <div
        css={css`
          margin-top: 12px;
        `}
      >
        <Attributes.View {...attributesProps} />
      </div>
    </div>
  );
}

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -10px, 0);
  }

  70% {
    transform: translate3d(0, -5px, 0);
  }

  90% {
    transform: translate3d(0,-1px,0);
  }
`;

export const MediaPanel = { useObject, View };
