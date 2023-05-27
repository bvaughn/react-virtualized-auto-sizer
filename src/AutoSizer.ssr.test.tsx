/**
 * @jest-environment node
 */

import { renderToString } from "react-dom/server";
import { AutoSizer } from "./AutoSizer";
import { Size } from "./types";

test("should render content with default widths and heights initially", () => {
  const rendered = renderToString(
    <AutoSizer defaultHeight={100} defaultWidth={200}>
      {({ height, width }: Size) => (
        <div>{`height:${height};width:${width}`}</div>
      )}
    </AutoSizer>
  );
  expect(rendered).toContain("height:100");
  expect(rendered).toContain("width:200");
});
