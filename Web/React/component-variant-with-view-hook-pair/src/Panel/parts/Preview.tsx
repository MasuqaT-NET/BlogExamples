import { css } from "@emotion/react";

type Props = { previewUrl?: string };

type Dependencies = {};

function useObject({ previewUrl }: Props, {}: Dependencies) {
  return [{ previewUrl }];
}

function View({ previewUrl }: ReturnType<typeof useObject>[0]) {
  return (
    <div
      css={css`
        display: flex;
        aspect-ratio: 3/2;
      `}
    >
      {previewUrl ? (
        <img
          css={css`
            height: 100%;
            width: 100%;
          `}
          src={previewUrl}
          alt="Preview"
        />
      ) : (
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            color: #78909c;
            background: #eceff1;
            user-select: none;
          `}
          role="presentation"
        >
          Loading...
        </div>
      )}
    </div>
  );
}

export const Preview = { useObject, View };
