import { useHeader } from "./parts/Header";
import { useAttributes } from "./parts/Attributes";
import { usePreview } from "./parts/Preview";
import { css } from "@emotion/react";
import { useCallback, useState } from "react";

type Props = {
  id: string;
  name: string;
  onChangeName?: (name: string) => void;
};

type Dependencies = { getPreviewUrl: (id: string) => Promise<string> };

export function useMediaPanel(
  { id, name, onChangeName }: Props,
  { getPreviewUrl }: Dependencies
) {
  const [previewUrl, setPreviewUrl] = useState<string>();

  const load = useCallback(async () => {
    setPreviewUrl(undefined);
    setPreviewUrl(await getPreviewUrl(id));
  }, [id, getPreviewUrl]);

  const { render: Header } = useHeader({ name });
  const { render: Preview } = usePreview({ previewUrl }, {});
  const { render: Attributes } = useAttributes({ name, onChangeName }, {});

  return {
    load,
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
          <Preview />
        </div>
        <div
          css={css`
            margin-top: 12px;
          `}
        >
          <Attributes />
        </div>
      </div>
    ),
  };
}
