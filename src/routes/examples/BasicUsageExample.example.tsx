import { AutoSizer } from "react-virtualized-auto-sizer";

<div className="w-full h-full">
  <AutoSizer>
    {({ height = 600, width = 800 }) => (
      // Width and height are undefined during the during the initial render (including server-rendering)
      // You can assign default values or render a loading component
      <ComponentThatRequiresWidthAndHeight
        height={height}
        someOtherProp="Example"
        width={width}
      />
    )}
  </AutoSizer>
</div>;

// <end>

export function ComponentThatRequiresWidthAndHeight(_: {
  height: number;
  someOtherProp: string;
  width: number;
}) {
  return null;
}
