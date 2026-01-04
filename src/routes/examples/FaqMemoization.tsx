import type { ReactNode } from "react";

declare function ChildComponent(): ReactNode;

// <begin>

import { memo } from "react";
import type { SizeProps } from "react-virtualized-auto-sizer";

const MemoizedChildComponent = memo(
  ChildComponent,
  function arePropsEqual(oldProps: SizeProps, newProps: SizeProps) {
    return oldProps.height === newProps.height;
  }
);

// <end>

export { MemoizedChildComponent };
