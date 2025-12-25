import { useState } from "react";

// <begin>

import { AutoSizer } from "react-virtualized-auto-sizer";

function ExampleComponent(props: ExampleComponentProps) {
  const [state, setState] = useState();

  return (
    <AutoSizer Child={
      ({ height = 600, width = 800 }) => {
        // Render prop can access width and height params,
        // as well as the parent component props and state
        setState; // hidden
        return `${props}${state}${height}${width}`; // hidden
      }
    } />
  )
}

// <end>

type ExampleComponentProps = {};

export { ExampleComponent };
