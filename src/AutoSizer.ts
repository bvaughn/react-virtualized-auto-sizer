import {
  Component,
  createElement,
  CSSProperties,
  HTMLAttributes,
  ReactElement,
} from "react";

// @ts-ignore
import { createDetectElementResize } from "./vendor/detectElementResize";

export type Size = {
  height?: number;
  width?: number;
};

export type Props = {
  children: (size: Size) => ReactElement;
  defaultHeight?: number;
  defaultWidth?: number;
  disableHeight?: boolean;
  disableWidth?: boolean;
  nonce?: string;
  onResize?: (size: Size) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

type State = {
  height: number;
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
    width: this.props.defaultWidth || 0,
  };

  _parentNode: HTMLElement | null = null;
  _autoSizer: HTMLElement | null = null;
  _detectElementResize: DetectElementResize | null = null;

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
      const detectElementResize = createDetectElementResize(nonce);
      detectElementResize.addResizeListener(this._parentNode, this._onResize);

      this._detectElementResize = detectElementResize;

      this._onResize();
    }
  }

  componentWillUnmount() {
    if (this._detectElementResize && this._parentNode) {
      this._detectElementResize.removeResizeListener(
        this._parentNode,
        this._onResize
      );
    }
  }

  render() {
    const {
      children,
      defaultHeight,
      defaultWidth,
      disableHeight,
      disableWidth,
      nonce,
      onResize,
      style,
      ...rest
    } = this.props;

    const { height, width } = this.state;

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
    }

    if (!disableWidth) {
      if (width === 0) {
        bailoutOnChildren = true;
      }
      outerStyle.width = 0;
      childParams.width = width;
    }

    return createElement(
      "div",
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

      const rect = this._parentNode.getBoundingClientRect();
      const height = rect.height || 0;
      const width = rect.width || 0;

      const style = window.getComputedStyle(this._parentNode) || {};
      const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      const paddingRight = parseInt(style.paddingRight, 10) || 0;
      const paddingTop = parseInt(style.paddingTop, 10) || 0;
      const paddingBottom = parseInt(style.paddingBottom, 10) || 0;

      const newHeight = height - paddingTop - paddingBottom;
      const newWidth = width - paddingLeft - paddingRight;

      if (
        (!disableHeight && this.state.height !== newHeight) ||
        (!disableWidth && this.state.width !== newWidth)
      ) {
        this.setState({
          height: height - paddingTop - paddingBottom,
          width: width - paddingLeft - paddingRight,
        });

        if (typeof onResize === "function") {
          onResize({ height, width });
        }
      }
    }
  };

  _setRef = (autoSizer: HTMLElement | null) => {
    this._autoSizer = autoSizer;
  };
}
