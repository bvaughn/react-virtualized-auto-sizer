import { useState } from "react";
import { AutoSizer } from "react-virtualized-auto-sizer";

export function ScrollingDomState() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen h-screen">
      <AutoSizer
        renderProp={({ height, width }) => (
          <div style={{ height, overflow: "auto", width }}>
            <button
              className="sticky top-0"
              onClick={() => setCount(count + 1)}
            >
              force update ({count})
            </button>
            <ul>
              {Array.from({ length: 100 }, (_, index) => index).map((index) => {
                return (
                  <li key={index}>Row {`${index + 1}`.padStart(2, "0")}</li>
                );
              })}
            </ul>
          </div>
        )}
      />
    </div>
  );
}
