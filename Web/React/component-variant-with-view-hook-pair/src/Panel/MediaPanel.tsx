import { Header } from "./parts/Header";
import { Attributes } from "./parts/Attributes";
import { Preview } from "./parts/Preview";
import { css } from "@emotion/react";
import { useCallback, useState } from "react";

type Props = { id: string; name: string };

type Dependencies = { getPreviewUrl: (id: string) => Promise<string> };

function useObject({ id, name }: Props, { getPreviewUrl }: Dependencies) {
  const [previewUrl, setPreviewUrl] = useState<string>();

  const [previewProps] = Preview.useObject({ previewUrl }, {});
  const [attributesProps] = Attributes.useObject({ name }, {});

  const load = useCallback(async () => {
    setPreviewUrl(undefined);
    setPreviewUrl(await getPreviewUrl(id));
  }, [id, getPreviewUrl]);

  return [{ name, previewProps, attributesProps }, { load }] as const;
}

function View({
  name,
  previewProps,
  attributesProps,
}: ReturnType<typeof useObject>[0]) {
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

export const MediaPanel = { useObject, View };
