import { Component, createElement, CSSProperties, ReactNode } from "react";

import {
  createDetectElementResize,
  DetectElementResize,
} from "./vendor/detectElementResize";
import { HeightAndWidthProps, Props, Size } from "./types";

type State = {
  height: number;
  width: number;
};

export class AutoSizer extends Component<Props, State> {
  state = {
    height: (this.props as HeightAndWidthProps).defaultHeight || 0,
    width: (this.props as HeightAndWidthProps).defaultWidth || 0,
  };

  _autoSizer: HTMLElement | null = null;
  _detectElementResize: DetectElementResize | null = null;
  _parentNode: HTMLElement | null = null;
  _resizeObserver: ResizeObserver | null = null;
  _timeoutId: number | null = null;

  componentDidMount() {
    const { nonce } = this.props;
    const parentNode = this._autoSizer ? this._autoSizer.parentNode : null;

    if (
      parentNode != null &&
      parentNode.ownerDocument &&
      parentNode.ownerDocument.defaultView &&
      parentNode instanceof parentNode.ownerDocument.defaultView.HTMLElement
    ) {
      // Delay access of parentNode until mount.
      // This handles edge-cases where the component has already been unmounted before its ref has been set,
      // As well as libraries like react-lite which have a slightly different lifecycle.
      this._parentNode = parentNode;

      // Use ResizeObserver from the same context where parentNode (which we will observe) was defined
      // Using just global can result into onResize events not being emitted in cases with multiple realms
      const ResizeObserverInstance =
        parentNode.ownerDocument.defaultView.ResizeObserver;

      if (ResizeObserverInstance != null) {
        this._resizeObserver = new ResizeObserverInstance(() => {
          // Guard against "ResizeObserver loop limit exceeded" error;
          // could be triggered if the state update causes the ResizeObserver handler to run long.
          // See https://github.com/bvaughn/react-virtualized-auto-sizer/issues/55
          this._timeoutId = setTimeout(this._onResize, 0);
        });
        this._resizeObserver.observe(parentNode);
      } else {
        // Defer requiring resize handler in order to support server-side rendering.
        // See issue #41
        this._detectElementResize = createDetectElementResize(nonce);
        this._detectElementResize.addResizeListener(parentNode, this._onResize);
      }

      this._onResize();
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

      if (this._timeoutId !== null) {
        clearTimeout(this._timeoutId);
      }

      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
      }
    }
  }

  render(): ReactNode {
    const {
      children,
      defaultHeight,
      defaultWidth,
      disableHeight = false,
      disableWidth = false,
      doNotBailOutOnEmptyChildren = false,
      nonce,
      onResize,
      style = {},
      tagName = "div",
      ...rest
    } = this.props as HeightAndWidthProps;

    const { height, width } = this.state;

    // Outer div should not force width/height since that may prevent containers from shrinking.
    // Inner component should overflow and use calculated width/height.
    // See issue #68 for more information.
    const outerStyle: CSSProperties = { overflow: "visible" };
    const childParams: Partial<Size> = {};

    // Avoid rendering children before the initial measurements have been collected.
    // At best this would just be wasting cycles.
    let bailoutOnChildren = false;

    if (!disableHeight) {
      if (height === 0) {
        bailoutOnChildren = true;
      }
      outerStyle.height = 0;
      childParams.height = height;

      // TODO Remove this in the next major release
      childParams.scaledHeight = height;
    }

    if (!disableWidth) {
      if (width === 0) {
        bailoutOnChildren = true;
      }
      outerStyle.width = 0;
      childParams.width = width;

      // TODO Remove this in the next major release
      childParams.scaledWidth = width;
    }

    if (doNotBailOutOnEmptyChildren) {
      bailoutOnChildren = false;
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
      !bailoutOnChildren && children(childParams as Size)
    );
  }

  _onResize = () => {
    this._timeoutId = null;

    const { disableHeight, disableWidth, onResize } = this
      .props as HeightAndWidthProps;

    if (this._parentNode) {
      // Guard against AutoSizer component being removed from the DOM immediately after being added.
      // This can result in invalid style values which can result in NaN values if we don't handle them.
      // See issue #150 for more context.

      const style = window.getComputedStyle(this._parentNode) || {};
      const paddingLeft = parseFloat(style.paddingLeft || "0");
      const paddingRight = parseFloat(style.paddingRight || "0");
      const paddingTop = parseFloat(style.paddingTop || "0");
      const paddingBottom = parseFloat(style.paddingBottom || "0");

      const rect = this._parentNode.getBoundingClientRect();
      const height = rect.height - paddingTop - paddingBottom;
      const width = rect.width - paddingLeft - paddingRight;

      if (
        (!disableHeight && this.state.height !== height) ||
        (!disableWidth && this.state.width !== width)
      ) {
        this.setState({
          height,
          width,
        });

        if (typeof onResize === "function") {
          onResize({
            height,
            width,

            // TODO Remove these params in the next major release
            scaledHeight: height,
            scaledWidth: width,
          });
        }
      }
    }
  };

  _setRef = (autoSizer: HTMLElement | null) => {
    this._autoSizer = autoSizer;
  };
}
