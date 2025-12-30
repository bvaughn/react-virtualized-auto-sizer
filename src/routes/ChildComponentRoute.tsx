import { Box, Callout, Code, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/ChildComponent.json";

export default function ChildComponentRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Child component" />
      <div>
        <code>AutoSizer</code> measures the available width and height of its
        parent <code>HTMLElement</code> and passes them as props to a child
        component.
      </div>
      <Code html={html} />
      <Callout intent="primary">
        The child component is auto-memoized to avoid re-rendering until the
        size has changed.
      </Callout>
    </Box>
  );
}
