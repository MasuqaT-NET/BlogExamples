import { useMediaPanel } from "./MediaPanel";
import { useTextPanel } from "./TextPanel";
import { useCallback, useEffect } from "react";

export function Panel({
  item,
}: {
  item?: { id: string; name: string } & ({ type: "media" } | { type: "text" });
}) {
  const handleChangeName = useCallback((name) => console.log(name), []);

  return item ? (
    item.type === "media" ? (
      <MediaPanel
        id={item.id}
        name={item.name}
        onChangeName={handleChangeName}
      />
    ) : (
      <TextPanel name={item.name} onChangeName={handleChangeName} />
    )
  ) : (
    <div /> // Empty
  );
}

// converter
function MediaPanel(props: Parameters<typeof useMediaPanel>[0]) {
  const { render: MediaPanel, load } = useMediaPanel(props, { getPreviewUrl });
  // const { render: MediaPanel, load } = useContext(MediaPanelContext);

  useEffect(() => {
    load();
  }, [props.id]);

  return <MediaPanel />;
}

// converter
function TextPanel(props: Parameters<typeof useTextPanel>[0]) {
  const { render: TextPanel } = useTextPanel(props, {});
  // const { render: TextPanel } = useContext(TextPanelContext);

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
