import React, {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { css } from "@emotion/react";
import { createPortal } from "react-dom";
import { StyleLayer } from "./StyleLayer";

type Props = {
  id?: string;
  children?: ReactNode;
};

export const ShadowLayer = ({ id, children }: Props) => {
  const baseRef = useRef<HTMLElement>(null);

  const [shadowRoot, setShadowRoot] = useState<HTMLElement>();

  useLayoutEffect(() => {
    setShadowRoot(
      baseRef.current!.attachShadow({ mode: "open" }) as unknown as HTMLElement
    );
  }, []);

  return (
    <span
      id={id}
      ref={baseRef}
      css={css`
        display: contents;
      `}
    >
      {shadowRoot
        ? createPortal(
            <StyleLayer container={shadowRoot}>{children}</StyleLayer>,
            shadowRoot
          )
        : null}
    </span>
  );
};
