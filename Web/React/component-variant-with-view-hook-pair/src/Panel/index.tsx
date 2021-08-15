import { MediaPanel } from "./MediaPanel";
import { TextPanel } from "./TextPanel";
import { useEffect } from "react";

export function Panel({
  item,
}: {
  item?: { id: string; name: string } & ({ type: "media" } | { type: "text" });
}) {
  return item ? (
    item.type === "media" ? (
      <MediaPanel_ id={item.id} name={item.name} />
    ) : (
      <TextPanel_ name={item.name} />
    )
  ) : (
    <div /> // Empty
  );
}

function MediaPanel_(props: Parameters<typeof MediaPanel.useObject>[0]) {
  const [viewProps, { load }] = MediaPanel.useObject(props, { getPreviewUrl });

  useEffect(() => {
    load();
  }, [props.id]);

  return <MediaPanel.View {...viewProps} />;
}

function TextPanel_(props: Parameters<typeof TextPanel.useObject>[0]) {
  const [viewProps] = TextPanel.useObject(props, {});

  return <TextPanel.View {...viewProps} />;
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
