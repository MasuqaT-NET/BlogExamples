import { MediaPanelView, useMediaPanel } from "./MediaPanel";
import { TextPanelView, useTextPanel } from "./TextPanel";
import { useEffect } from "react";

export function Panel({
  item,
}: {
  item?: { id: string; name: string } & ({ type: "media" } | { type: "text" });
}) {
  return item ? (
    item.type === "media" ? (
      <MediaPanel id={item.id} name={item.name} />
    ) : (
      <TextPanel name={item.name} />
    )
  ) : (
    <div /> // Empty
  );
}

function MediaPanel(props: Parameters<typeof useMediaPanel>[0]) {
  const values = useMediaPanel(props, { getPreviewUrl });

  useEffect(() => {
    values.load();
  }, [props.id]);

  return <MediaPanelView {...values} />;
}

function TextPanel(props: Parameters<typeof useTextPanel>[0]) {
  const values = useTextPanel(props, {});

  return <TextPanelView {...values} />;
}

async function getPreviewUrl(id: string): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          id === "b"
            ? "https://picsum.photos/id/433/300/200"
            : id === "d"
            ? "https://picsum.photos/id/237/300/200"
            : ""
        ),
      1000
    )
  );
}
