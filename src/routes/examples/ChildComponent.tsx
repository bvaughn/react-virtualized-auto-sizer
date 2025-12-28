import { AutoSizer, type AutoSizerChildProps } from "react-virtualized-auto-sizer";

function ExampleComponent() {
  return (
    <AutoSizer Child={Child} />
  )
}

// Height and width will be undefined for the initial render (or when server rendering)
// You can either set default values (as shown below) or render some sort of placeholder
function Child({ height = 600, width = 600 }: AutoSizerChildProps) {
  return <div>{width} x {height} pixels</div>;
}

// <end>

export { Child, ExampleComponent };
