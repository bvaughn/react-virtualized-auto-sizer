import { Box, Code, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/ChildComponent.json";

export default function BasicUsageRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Basic usage" />
      <div>
        <code>AutoSizer</code> measures the available width and height of its
        parent <code>HTMLElement</code> and passes them as props to a{" "}
        <code>Child</code> component.
      </div>
      <Code html={html} />
    </Box>
  );
}
