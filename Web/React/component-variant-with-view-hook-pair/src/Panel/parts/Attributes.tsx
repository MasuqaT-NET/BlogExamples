import { css } from "@emotion/react";
import { useCallback, useMemo, useState } from "react";

type Props = { name: string };

type Dependencies = {};

export function useAttributes({ name }: Props, {}: Dependencies) {
  const [editing, setEditing] = useState(false);

  const startEditing = useCallback(() => setEditing(true), []);
  const finishEditing = useCallback(() => setEditing(false), []);

  return [{ name, editing, startEditing, finishEditing }];
}

export function AttributesView({
  name,
  editing,
  startEditing,
  finishEditing,
}: ReturnType<typeof useAttributes>[0]) {
  const time = useMemo(() => new Date().toDateString(), []);

  return (
    <dl
      css={css`
        dd + dt {
          margin-top: 4px;
        }
      `}
    >
      <dt>Name</dt>
      <dd
        css={css`
          display: flex;
          gap: 8px;
        `}
      >
        <input
          css={css`
            flex: 1 0 auto;
            :not([readonly]) {
              outline: 1px solid #282c34;
            }
          `}
          type="text"
          value={name}
          readOnly={!editing}
          role={!editing ? "paragraph" : undefined}
        />
        <button title="Edit" onClick={editing ? finishEditing : startEditing}>
          <i className={`fas ${editing ? "fa-check" : "fa-pencil-alt"}`} />
        </button>
      </dd>
      <dt>Last Updated</dt>
      <dd>
        <time dateTime={time}>{time}</time>
      </dd>
    </dl>
  );
}
