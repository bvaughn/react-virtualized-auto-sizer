import { createElement, useState } from "react";
import { useSize } from "../hooks/useSize";
import type { Size } from "../types";
import type { Props } from "./types";

/**
 * Decorates a render prop child and passes it `width` and `height` information.
 *
 * ℹ️ This component began as a fork of the [javascript-detect-element-resize](https://www.npmjs.com/package/javascript-detect-element-resize) package.
 */
export function AutoSizer({
  children: Children,
  nonce,
  onResize,
  tagName: TagName = "div",
  ...rest
}: Props) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState<Partial<Size>>({});

  useSize({
    nonce,
    onResize: (nextSize: Size) => {
      setSize(nextSize);

      if (typeof onResize !== "undefined") {
        onResize(nextSize);
      }
    },
    rootElement: element
  });

  return createElement(
    TagName,
    { "data-auto-sizer": "", ref: setElement, ...rest },
    Children ? createElement(Children, size) : undefined
  );
}
