import { css } from "@emotion/react";
import { createPagePortal } from "../infrastructures/PortalHead";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Props = { message: string; children: ReactNode };

export const Tooltip = ({ message, children }: Props) => {
  const baseRef = useRef<HTMLSpanElement>(null);

  const [rect, setRect] = useState<DOMRectReadOnly>();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((e) => {
      setRect(e[0].target.getBoundingClientRect());
    });
    observer.observe(baseRef.current!);

    return () => observer.disconnect();
  }, []);

  // work
  useLayoutEffect(() => {
    const ac = new AbortController();
    baseRef.current!.addEventListener("mouseenter", () => setHovered(true), {
      signal: ac.signal,
    });
    baseRef.current!.addEventListener("mouseleave", () => setHovered(false), {
      signal: ac.signal,
    });

    return () => ac.abort();
  }, []);

  return (
    <>
      <span
        ref={baseRef}
        css={css`
          display: inline-flex;
        `}
        // does not work
        // maybe by https://github.com/Wildhoney/ReactShadow/issues/81
        // onMouseEnter={() => setHovered(true)}
        // onMouseLeave={() => setHovered(false)}
      >
        {children}
      </span>
      {rect
        ? createPagePortal(
            <div
              css={css`
                position: fixed;
                justify-content: center;
                pointer-events: none;
              `}
              style={{
                top: rect.bottom,
                left: rect.left,
                right: document.body.clientWidth - rect.right,
                display: hovered ? "flex" : "none",
              }}
              role="presentation"
            >
              <div
                css={css`
                  display: inline-flex;
                  justify-content: center;
                  min-width: 200px;
                `}
              >
                <div
                  css={css`
                    display: inline-flex;
                    background: white;
                    border-radius: 4px;
                    pointer-events: initial;
                    padding: 4px;
                  `}
                >
                  {message}
                </div>
              </div>
            </div>
          )
        : null}
    </>
  );
};
