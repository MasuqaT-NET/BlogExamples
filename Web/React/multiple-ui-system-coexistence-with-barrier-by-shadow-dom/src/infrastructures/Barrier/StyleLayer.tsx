import { type ReactNode } from "react";
import { CacheProvider, type EmotionCache, Global, css } from "@emotion/react";
import createCache from "@emotion/cache";

type Props = {
  container: HTMLElement;
  children: ReactNode;
};

export const StyleLayer = ({ container, children }: Props) => {
  let emotionCache = cache.get(container);
  if (!emotionCache) {
    emotionCache = createCache({
      key: "barrier",
      container,
    });
    cache.set(container, emotionCache);
  }

  return (
    <CacheProvider value={emotionCache}>
      <Global styles={theNewCssReset} />
      {children}
    </CacheProvider>
  );
};

const cache = new WeakMap<HTMLElement, EmotionCache>();

const theNewCssReset = css`
  /*** The new CSS Reset - version 1.4.4 (last updated 22.12.2021) ***/

  /*
      Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
      - The "symbol *" part is to solve Firefox SVG sprite bug
   */
  *:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *)) {
    all: unset;
    display: revert;
  }

  /* Preferred box-sizing value */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove list styles (bullets/numbers) */
  ol,
  ul,
  menu {
    list-style: none;
  }

  /* For images to not be able to exceed their container */
  img {
    max-width: 100%;
  }

  /* removes spacing between cells in tables */
  table {
    border-collapse: collapse;
  }

  /* revert the 'white-space' property for textarea elements on Safari */
  textarea {
    white-space: revert;
  }

  /* fix the feature of 'hidden' attribute.
     display:revert; revert to element instead of attribute */
  :where([hidden]) {
    display: none;
  }

  /* revert for bug in Chromium browsers
     - fix for the content editable attribute will work properly. */
  :where([contenteditable]) {
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
  }

  /* apply back the draggable feature - exist only in Chromium and Safari */
  :where([draggable="true"]) {
    -webkit-user-drag: element;
  }
`;
