import { createElement, memo, useMemo, useState } from "react";
import { useSize } from "../hooks/useSize";
import type { Size } from "../types";
import type { AutoSizerProps } from "./types";

/**
 * Measures the available width and height of its parent `HTMLElement` and passes those values as `width` and `height` props to its `children`.
 *
 * ℹ️ This component began as a fork of the [javascript-detect-element-resize](https://www.npmjs.com/package/javascript-detect-element-resize) package.
 */
export function AutoSizer({
  children: Children,
  nonce,
  onResize,
  tagName: TagName = "div",
  ...rest
}: AutoSizerProps) {
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

  const MemoizedChildren = useMemo(
    () => (Children ? memo(Children) : undefined),
    [Children]
  );

  return createElement(
    TagName,
    { "data-auto-sizer": "", ref: setElement, ...rest },
    MemoizedChildren ? createElement(MemoizedChildren, size) : undefined
  );
}
