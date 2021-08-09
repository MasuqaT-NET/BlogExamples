import { css } from "@emotion/react";

export function FileList({
  items,
  selectedItemId,
  clickItem,
}: {
  items: { id: string; name: string }[];
  selectedItemId?: string;
  clickItem?: (id: string) => void;
}) {
  return (
    <ul
      role="listbox"
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fill, 120px);
        justify-content: space-between;
        gap: 16px 8px;
      `}
      aria-label="List of files"
    >
      {items.map(({ id, name }) => (
        <li
          role="option"
          css={css`
            cursor: pointer;
            border: 1px solid transparent;

            :hover {
              background: #e0f2f1;
            }

            &[aria-selected="true"] {
              border: 1px dotted #004d40;
              background: #b2dfdb;
            }
          `}
          key={id}
          aria-selected={id === selectedItemId}
          onClick={(e) => {
            e.stopPropagation();
            clickItem?.(id);
          }}
        >
          <Item name={name} />
        </li>
      ))}
    </ul>
  );
}

function Item({ name }: { name: string }) {
  return (
    <div
      css={css`
        width: 120px;
        padding: 8px;
      `}
    >
      <div
        css={css`
          display: flex;
          font-size: 64px;
          justify-content: center;
        `}
      >
        <i
          className={`far ${mapIcon(name)}`}
          role="img"
          title="File image icon"
        />
      </div>
      <p
        css={css`
          text-align: center;
          margin-top: 4px;
        `}
      >
        {name}
      </p>
    </div>
  );
}

function mapIcon(fileName: string): string {
  switch (fileName.split(".").pop()) {
    case "sh":
    case "c":
    case "php":
      return "fa-file-code";
    case "png":
      return "fa-file-image";
    case "mp4":
      return "fa-file-video";
    case "txt":
      return "fa-file-alt";
    default:
      return "fa-file";
  }
}
