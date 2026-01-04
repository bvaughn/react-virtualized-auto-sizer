import type { ReactNode } from "react";
import { AutoSizer } from "react-virtualized-auto-sizer";

declare function ChildComponent(): ReactNode;

// <begin>

<div style={{ display: "flex" }}>
  {/* Other children... */}
  <div style={{ flex: "1 1 auto" }}>
    <AutoSizer Child={ChildComponent} />
  </div>
</div>