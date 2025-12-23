import type { HTMLAttributes, ReactNode } from "react";

export type HorizontalSize = {
  width: number;
  scaledWidth: number;
};
export type VerticalSize = {
  height: number;
  scaledHeight: number;
};
export type Size = HorizontalSize & VerticalSize;

type BaseProps = {
  doNotBailOutOnEmptyChildren?: boolean | undefined;
  nonce?: string | undefined;
  tagName?: string | undefined;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "onResize">;

export type HeightOnlyProps = BaseProps & {
  children: (size: VerticalSize) => ReactNode;
  defaultHeight?: number | undefined;
  disableHeight?: false | undefined;
  disableWidth: true;
  onResize?: ((size: VerticalSize) => void) | undefined;
};

export type WidthOnlyProps = BaseProps & {
  children: (size: HorizontalSize) => ReactNode;
  defaultWidth?: number | undefined;
  disableHeight: true;
  disableWidth?: false | undefined;
  onResize?: ((size: HorizontalSize) => void) | undefined;
};

export type HeightAndWidthProps = BaseProps & {
  children: (size: Size) => ReactNode;
  defaultHeight?: number | undefined;
  defaultWidth?: number | undefined;
  disableHeight?: false | undefined;
  disableWidth?: false | undefined;
  onResize?: ((size: Size) => void) | undefined;
};

export type Props = HeightOnlyProps | WidthOnlyProps | HeightAndWidthProps;

export function isHeightAndWidthProps(
  props: unknown
): props is HeightAndWidthProps {
  return (
    props !== null &&
    typeof props === "object" &&
    "disableHeight" in props &&
    props.disableHeight !== true &&
    "disableWidth" in props &&
    props.disableWidth !== true
  );
}

export function isHeightOnlyProps(props: unknown): props is HeightOnlyProps {
  return (
    props !== null &&
    typeof props === "object" &&
    "disableWidth" in props &&
    props.disableWidth === true &&
    (!("disableHeight" in props) || props.disableHeight !== true)
  );
}

export function isWidthOnlyProps(props: unknown): props is WidthOnlyProps {
  return (
    props !== null &&
    typeof props === "object" &&
    "disableHeight" in props &&
    props.disableHeight === true &&
    (!("disableWidth" in props) || props.disableWidth !== true)
  );
}
