import { AutoSizer, type AutoSizerChildrenProps } from "react-virtualized-auto-sizer";

function ExampleComponent() {
  return (
    <AutoSizer>
      {ComponentThatRequiresWidthAndHeight}
    </AutoSizer>
  )
}

// Default height and width will be used for the initial render or when server rendering
function ComponentThatRequiresWidthAndHeight({
  height = 600,
  width = 600
}: AutoSizerChildrenProps) {
  return <div>{width} x {height} pixels</div>;
}

// <end>

export { ExampleComponent, ComponentThatRequiresWidthAndHeight }