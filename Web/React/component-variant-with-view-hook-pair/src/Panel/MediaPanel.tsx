import { Header } from "./parts/Header";
import { AttributesView, useAttributes } from "./parts/Attributes";
import { PreviewView, usePreview } from "./parts/Preview";
import { css } from "@emotion/react";
import { useCallback, useState } from "react";

type Props = { id: string; name: string };

type Dependencies = { getPreviewUrl: (id: string) => Promise<string> };

export function useMediaPanel(
  { id, name }: Props,
  { getPreviewUrl }: Dependencies
) {
  const [previewUrl, setPreviewUrl] = useState<string>();

  const preview = usePreview({ previewUrl }, {});
  const attributes = useAttributes({ name }, {});

  const load = useCallback(async () => {
    setPreviewUrl(undefined);
    setPreviewUrl(await getPreviewUrl(id));
  }, [id, getPreviewUrl]);

  return { name, preview, attributes, load };
}

export function MediaPanelView({
  name,
  preview,
  attributes,
}: ReturnType<typeof useMediaPanel>) {
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
        <PreviewView {...preview} />
      </div>
      <div
        css={css`
          margin-top: 12px;
        `}
      >
        <AttributesView {...attributes} />
      </div>
    </div>
  );
}
