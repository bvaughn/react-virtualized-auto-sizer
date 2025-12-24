import { Box } from "../components/Box";
import { Header } from "../components/Header";
import { html as ChildComponentHTML } from "../../public/generated/code-snippets/ChildComponent.json";
import { html as RenderPropHTML } from "../../public/generated/code-snippets/RenderProp.json";
import { Code } from "../components/code/Code";
import { ExternalLink } from "../components/ExternalLink";

export default function BasicUsageRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Basic usage" />
      <div>
        The <code>AutoSizer</code> component measures the available width and
        height of its parent <code>HTMLElement</code> and passes those values as
        props to its <code>children</code>.
      </div>
      <div>The child can be a React component:</div>
      <Code html={ChildComponentHTML} />
      <div>
        The child can also be a{" "}
        <ExternalLink href="https://legacy.reactjs.org/docs/render-props.html">
          render prop
        </ExternalLink>{" "}
        which provides the added benefit of being able to reference other values
        that are in scope.
      </div>
      <Code html={RenderPropHTML} />
    </Box>
  );
}
