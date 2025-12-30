import type { CSSProperties, FunctionComponent, ReactNode } from "react";

/**
 * Props passed to the `AutoSizer` component's `ChildComponent` or `renderProp`.
 */
export type SizeProps = {
  height: number | undefined;
  width: number | undefined;
};

export type ChildComponent = FunctionComponent<{
  height: number | undefined;
  width: number | undefined;
}>;

export type RenderProp = (params: {
  height: number | undefined;
  width: number | undefined;
}) => ReactNode;

export type AutoSizerBox =
  | "border-box"
  | "content-box"
  | "device-pixel-content-box";

/**
 * Props definition to the `AutoSizer` component.
 */
export type AutoSizerProps = {
  /**
   * Corresponds to the `ResizeObserver` [box](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#box) parameter.
   * Sets which box model the observer will observe changes to.
   *
   * - `border-box`: Size of the box border area as defined in CSS.
   * - `content-box`: Size of the content area as defined in CSS.
   * - `device-pixel-content-box`: The size of the content area as defined in CSS, in device pixels, before applying any CSS transforms on the element or its ancestors.
   */
  box?: "border-box" | "content-box" | "device-pixel-content-box" | undefined;

  /**
   * Class name to be applied to the auto-sizer `HTMLElement`.
   */
  className?: string | undefined;

  /**
   * Test id attribute to interop with frameworks like [Testing Library](https://testing-library.com/docs/queries/bytestid/).
   */
  "data-testid"?: string | undefined;

  /**
   * Unique id attribute to attach to root DOM element.
   */
  id?: string | number | undefined;

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
   * Style properties to be applied to the auto-sizer `HTMLElement`.
   */
  style?: CSSProperties | undefined;

  /**
   * Optional HTML tag name for root HTMLElement; defaults to `"div"`.
   */
  tagName?: string | undefined;
} & (
  | {
      /**
       * Child component to be passed the available width and height values as props.
       *
       * @deprecated Use the `ChildComponent` or `renderProp` props instead.
       */
      Child: ChildComponent;

      ChildComponent?: never;
      renderProp?: never;
    }
  | {
      /**
       * Child component to be passed the available width and height values as props.
       *
       * ℹ️ Use `renderProp` instead if you need access to local state.
       *
       * ⚠️ Width and height are undefined during the during the initial render (including server-rendering).
       */
      ChildComponent: ChildComponent;

      Child?: never;
      renderProp?: never;
    }
  | {
      /**
       * Render prop to be passed the available width and height values as props.
       *
       * ℹ️ Use `ChildComponent` instead for better memoization if you do not need access to local state.
       *
       * ⚠️ Width and height are undefined during the during the initial render (including server-rendering).
       */
      renderProp: RenderProp;

      Child?: never;
      ChildComponent?: never;
    }
);
