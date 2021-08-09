import { useState } from "react";
import { FileList } from "./FileList";
import { Panel } from "./Panel";
import { css } from "@emotion/react";

const items = [
  { id: "a", name: "ant.sh", type: "text" } as const,
  {
    id: "b",
    name: "bear.mp4",
    type: "media",
    meta: { height: 320, width: 320 },
  } as const,
  { id: "c", name: "cat.c", type: "text" } as const,
  {
    id: "d",
    name: "dog.png",
    type: "media",
    meta: { height: 320, width: 320 },
  } as const,
  { id: "e", name: "elephant.php", type: "text" } as const,
  { id: "f", name: "fox.txt", type: "text" } as const,
];

function Filer() {
  const [selectedItemId, setSelectedItemId] = useState<string>();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        height: 100%;
        background: #ffffff;
        border: 1px solid #9ea7aa;
      `}
    >
      <div
        css={css`
          flex: 1 1 auto;
          flex-wrap: wrap;
          padding: 20px;
          overflow-y: scroll;
        `}
        onClick={() => setSelectedItemId(undefined)}
      >
        <FileList
          items={items}
          selectedItemId={selectedItemId}
          clickItem={setSelectedItemId}
        />
      </div>
      <div
        css={css`
          flex: 0 0 300px;
          border-left: 1px solid #9ea7aa;
        `}
      >
        <Panel item={items.find(({ id }) => id === selectedItemId)} />
      </div>
    </div>
  );
}

export default Filer;
