import {
  Component,
  createElement,
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

// @ts-ignore
import { createDetectElementResize } from "../vendor/detectElementResize";

export type Size = {
  // Legacy width and height parameters (offsetWidth and offsetHeight)
  height?: number;
  width?: number;

  // Take transform:scale into account (getBoundingClientRect)
  scaledHeight?: number;
  scaledWidth?: number;
};

export type Props = {
  children: (size: Size) => ReactNode;
  defaultHeight?: number;
  defaultWidth?: number;
  disableHeight?: boolean;
  disableWidth?: boolean;
  nonce?: string;
  onResize?: (size: Size) => void;
  tagName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "onResize">;

type State = {
  height: number;
  scaledHeight: number;
  scaledWidth: number;
  width: number;
};

type ResizeHandler = (element: HTMLElement, onResize: () => void) => void;

type DetectElementResize = {
  addResizeListener: ResizeHandler;
  removeResizeListener: ResizeHandler;
};

export class AutoSizer extends Component<Props, State> {
  static defaultProps = {
    onResize: () => {},
    disableHeight: false,
    disableWidth: false,
    style: {},
  };

  state = {
    height: this.props.defaultHeight || 0,
    scaledHeight: this.props.defaultHeight || 0,
    scaledWidth: this.props.defaultWidth || 0,
    width: this.props.defaultWidth || 0,
  };

  _autoSizer: HTMLElement | null = null;
  _detectElementResize: DetectElementResize | null = null;
  _parentNode: HTMLElement | null = null;
  _resizeObserver: ResizeObserver | null = null;

  componentDidMount() {
    const { nonce } = this.props;

    if (
      this._autoSizer &&
      this._autoSizer.parentNode &&
      this._autoSizer.parentNode.ownerDocument &&
      this._autoSizer.parentNode.ownerDocument.defaultView &&
      this._autoSizer.parentNode instanceof
        this._autoSizer.parentNode.ownerDocument.defaultView.HTMLElement
    ) {
      // Delay access of parentNode until mount.
      // This handles edge-cases where the component has already been unmounted before its ref has been set,
      // As well as libraries like react-lite which have a slightly different lifecycle.
      this._parentNode = this._autoSizer.parentNode;

      // Defer requiring resize handler in order to support server-side rendering.
      // See issue #41
      if (this._parentNode != null) {
        if (typeof ResizeObserver !== "undefined") {
          this._resizeObserver = new ResizeObserver(() => {
            // Guard against "ResizeObserver loop limit exceeded" error;
            // could be triggered if the state update causes the ResizeObserver handler to run long.
            // See https://github.com/bvaughn/react-virtualized-auto-sizer/issues/55
            setTimeout(this._onResize, 0);
          });
          this._resizeObserver.observe(this._parentNode);
        } else {
          this._detectElementResize = createDetectElementResize(
            nonce
          ) as DetectElementResize;
          this._detectElementResize.addResizeListener(
            this._parentNode,
            this._onResize
          );
        }

        this._onResize();
      }
    }
  }

  componentWillUnmount() {
    if (this._parentNode) {
      if (this._detectElementResize) {
        this._detectElementResize.removeResizeListener(
          this._parentNode,
          this._onResize
        );
      }

      if (this._resizeObserver) {
        this._resizeObserver.observe(this._parentNode);
        this._resizeObserver.disconnect();
      }
    }
  }

  render(): ReactElement {
    const {
      children,
      defaultHeight,
      defaultWidth,
      disableHeight,
      disableWidth,
      nonce,
      onResize,
      style,
      tagName = "div",
      ...rest
    } = this.props;

    const { height, scaledHeight, scaledWidth, width } = this.state;

    // Outer div should not force width/height since that may prevent containers from shrinking.
    // Inner component should overflow and use calculated width/height.
    // See issue #68 for more information.
    const outerStyle: CSSProperties = { overflow: "visible" };
    const childParams: Size = {};

    // Avoid rendering children before the initial measurements have been collected.
    // At best this would just be wasting cycles.
    let bailoutOnChildren = false;

    if (!disableHeight) {
      if (height === 0) {
        bailoutOnChildren = true;
      }
      outerStyle.height = 0;
      childParams.height = height;
      childParams.scaledHeight = scaledHeight;
    }

    if (!disableWidth) {
      if (width === 0) {
        bailoutOnChildren = true;
      }
      outerStyle.width = 0;
      childParams.width = width;
      childParams.scaledWidth = scaledWidth;
    }

    return createElement(
      tagName,
      {
        ref: this._setRef,
        style: {
          ...outerStyle,
          ...style,
        },
        ...rest,
      },
      !bailoutOnChildren && children(childParams)
    );
  }

  _onResize = () => {
    const { disableHeight, disableWidth, onResize } = this.props;

    if (this._parentNode) {
      // Guard against AutoSizer component being removed from the DOM immediately after being added.
      // This can result in invalid style values which can result in NaN values if we don't handle them.
      // See issue #150 for more context.

      const style = window.getComputedStyle(this._parentNode) || {};
      const paddingLeft = parseInt(style.paddingLeft ?? "0", 10);
      const paddingRight = parseInt(style.paddingRight ?? "0", 10);
      const paddingTop = parseInt(style.paddingTop ?? "0", 10);
      const paddingBottom = parseInt(style.paddingBottom ?? "0", 10);

      const rect = this._parentNode.getBoundingClientRect();
      const scaledHeight = rect.height - paddingTop - paddingBottom;
      const scaledWidth = rect.width - paddingLeft - paddingRight;

      const height = this._parentNode.offsetHeight - paddingTop - paddingBottom;
      const width = this._parentNode.offsetWidth - paddingLeft - paddingRight;

      if (
        (!disableHeight &&
          (this.state.height !== height ||
            this.state.scaledHeight !== scaledHeight)) ||
        (!disableWidth &&
          (this.state.width !== width ||
            this.state.scaledWidth !== scaledWidth))
      ) {
        this.setState({
          height,
          width,
          scaledHeight,
          scaledWidth,
        });

        if (typeof onResize === "function") {
          onResize({ height, scaledHeight, scaledWidth, width });
        }
      }
    }
  };

  _setRef = (autoSizer: HTMLElement | null) => {
    this._autoSizer = autoSizer;
  };
}
