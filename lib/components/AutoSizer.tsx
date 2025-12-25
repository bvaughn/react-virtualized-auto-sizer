import { createElement, memo, useMemo, useState } from "react";
import { useSize } from "../hooks/useSize";
import type { Size } from "../types";
import type { AutoSizerChildProps, AutoSizerProps } from "./types";

/**
 * Measures the available width and height of its parent `HTMLElement` and passes those values as `width` and `height` props to its `children`.
 *
 * ℹ️ This component began as a fork of the [javascript-detect-element-resize](https://www.npmjs.com/package/javascript-detect-element-resize) package.
 */
export function AutoSizer({
  box = "content-box",
  className,
  Child,
  "data-testid": dataTestId,
  id,
  nonce,
  onResize,
  style,
  tagName: TagName = "div"
}: AutoSizerProps) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  const [height, setHeight] = useState<number | undefined>();
  const [width, setWidth] = useState<number | undefined>();

  useSize({
    box,
    nonce,
    onResize: (nextSize: Size) => {
      setHeight(nextSize.height);
      setWidth(nextSize.width);

      if (typeof onResize !== "undefined") {
        onResize(nextSize);
      }
    },
    rootElement: element
  });

  const MemoizedChild = useMemo(() => memo(Child ?? NoopChild), [Child]);

  return createElement(
    TagName,
    {
      className,
      "data-auto-sizer": "",
      "data-testid": dataTestId,
      id,
      ref: setElement,
      style
    },
    createElement(MemoizedChild, { height, width })
  );
}

function NoopChild(_: AutoSizerChildProps) {
  return null;
}
