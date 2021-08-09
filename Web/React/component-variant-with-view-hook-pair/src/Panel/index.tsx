import { useMediaPanel } from "./MediaPanel";
import { useTextPanel } from "./TextPanel";
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
  const { render: MediaPanel, load } = useMediaPanel(props, { getPreviewUrl });

  useEffect(() => {
    load();
  }, [props.id]);

  return <MediaPanel />;
}

function TextPanel(props: Parameters<typeof useTextPanel>[0]) {
  const { render: TextPanel } = useTextPanel(props, {});

  return <TextPanel />;
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
