import type { HTMLAttributes, ReactNode } from "react";

export type Props = HTMLAttributes<HTMLElement> & {
  /**
   * [Nonce](https://www.w3.org/TR/2016/REC-CSP2-20161215/#script-src-the-nonce-attribute) used for inline `StyleSheet`
   * in browsers/environments that do not support the `ResizeObserver` API.
   */
  nonce?: string | undefined;

  /**
   * Optional callback notified after a resize.
   *
   * @param size New width and height of parent element
   */
  onResize?: ((size: { height: number; width: number }) => void) | undefined;

  /**
   * Function responsible for rendering children.
   *
   * ℹ️ Width and height will be undefined during the during the initial render and when server-rendering
   *
   * @param size Available width and height of parent element (once measured)
   * @return React children
   */
  render: (size: {
    height?: number | undefined;
    width?: number | undefined;
  }) => ReactNode;

  /**
   * Optional HTML tag name for root HTMLElement; defaults to `"div"`.
   */
  tagName?: string | undefined;
};
