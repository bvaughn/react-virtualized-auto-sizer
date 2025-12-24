import { AutoSizer } from "react-virtualized-auto-sizer";

// <begin>

function ExampleComponent(props: ExampleComponentProps) {
  return (
    <AutoSizer>
      {({ height = 600, width = 800 }) => {
        // Render prop can access width and height params,
        // as well as the parent component props and state
        return `${props}${height}${width}`; // hidden
      }}
    </AutoSizer>
  )
}

// <end>

type ExampleComponentProps = {};

export { ExampleComponent }