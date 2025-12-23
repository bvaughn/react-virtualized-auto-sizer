import { useLayoutEffect, useRef } from "react";
import type { Size } from "../types";
import { createDetectElementResize } from "../vendor/detectElementResize";

export function useSize({
  nonce,
  onResize,
  rootElement
}: {
  nonce: string | undefined;
  onResize: (size: Size) => void;
  rootElement: HTMLElement | null;
}) {
  const stableValuesRef = useRef<{
    onResize: (size: Size) => void;
    parentNode: HTMLElement | null;
    prevSize:
      | Size
      | {
          height: undefined;
          width: undefined;
        };
  }>({
    onResize,
    parentNode: null,
    prevSize: {
      height: undefined,
      width: undefined
    }
  });

  useLayoutEffect(() => {
    stableValuesRef.current.onResize = onResize;
  });

  const onResizeStableRef = useRef(() => {
    const { onResize, parentNode, prevSize } = stableValuesRef.current;
    if (parentNode === null) {
      return;
    }

    // Guard against AutoSizer component being removed from the DOM immediately after being added.
    // This can result in invalid style values which can result in NaN values if we don't handle them.
    const style = window.getComputedStyle(parentNode) || {};
    const paddingLeft = parseFloat(style.paddingLeft || "0");
    const paddingRight = parseFloat(style.paddingRight || "0");
    const paddingTop = parseFloat(style.paddingTop || "0");
    const paddingBottom = parseFloat(style.paddingBottom || "0");

    const rect = parentNode.getBoundingClientRect();
    const height = rect.height - paddingTop - paddingBottom;
    const width = rect.width - paddingLeft - paddingRight;

    const nextSize = { height, width };
    if (
      prevSize.height !== nextSize.height ||
      prevSize.width !== nextSize.width
    ) {
      stableValuesRef.current.prevSize = nextSize;

      onResize({
        height,
        width
      });
    }
  });

  useLayoutEffect(() => {
    if (rootElement === null) {
      return;
    }

    const parentNode = rootElement.parentNode;
    if (
      parentNode === null ||
      parentNode.ownerDocument === null ||
      parentNode.ownerDocument.defaultView === null ||
      !(parentNode instanceof parentNode.ownerDocument.defaultView.HTMLElement)
    ) {
      return;
    }

    stableValuesRef.current.parentNode = parentNode;

    const onResizeStable = onResizeStableRef.current;

    // Use ResizeObserver from the same context where parentNode (which we will observe) was defined
    // Using just global can result into onResize events not being emitted in cases with multiple realms
    const ResizeObserver = parentNode.ownerDocument.defaultView.ResizeObserver;
    if (ResizeObserver != null) {
      let timeoutId: NodeJS.Timeout;

      const resizeObserver = new ResizeObserver(() => {
        // Guard against "ResizeObserver loop limit exceeded" error;
        // could be triggered if the state update causes the ResizeObserver handler to run long.
        // See github.com/bvaughn/react-virtualized-auto-sizer/issues/55
        timeoutId = setTimeout(onResizeStable, 0);
      });

      resizeObserver.observe(parentNode);

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        resizeObserver.disconnect();
      };
    } else {
      // Defer requiring resize handler in order to support server-side rendering.
      // See github.com/bvaughn/react-virtualized-auto-sizer/issues/41
      const detectElementResize = createDetectElementResize(nonce);
      detectElementResize.addResizeListener(parentNode, onResizeStable);

      return () => {
        detectElementResize.removeResizeListener(parentNode, onResizeStable);
      };
    }
  }, [nonce, rootElement]);
}
