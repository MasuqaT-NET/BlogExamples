import { Barrier } from "./Barrier";
import React, { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CacheProvider, type EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";

const ID = "portal-head";

export const PortalHead = () => <Barrier id={ID} />;

function getElement() {
  return document.getElementById(ID)!.shadowRoot as unknown as HTMLElement;
}

export function createPagePortal(children: ReactNode) {
  const element = getElement();

  let emotionCache = cacheRef?.deref();
  if (!emotionCache) {
    emotionCache = createCache({ key: "portal-head", container: element });
    cacheRef = new WeakRef(emotionCache);
  }

  return createPortal(
    <CacheProvider value={emotionCache}>{children}</CacheProvider>,
    element
  );
}

let cacheRef: WeakRef<EmotionCache> | undefined;
