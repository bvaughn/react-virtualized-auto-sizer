import type { FunctionComponent, HTMLAttributes } from "react";

export type ChildrenProps =
  | {
      height: number;
      width: number;
    }
  | {
      height: undefined;
      width: undefined;
    };

export type Props = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  /**
   * Child component to be passed the available width and height values as props.
   *
   * ℹ️ Width and height are undefined during the during the initial render (including server-rendering)
   */
  children?: FunctionComponent<ChildrenProps> | undefined;

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
   * Optional HTML tag name for root HTMLElement; defaults to `"div"`.
   */
  tagName?: string | undefined;
};
