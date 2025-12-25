import { html } from "../../public/generated/code-snippets/RenderProp.json";
import { Box } from "../components/Box";
import { Callout } from "../components/Callout";
import { ExternalLink } from "../components/ExternalLink";
import { Header } from "../components/Header";
import { Code } from "../components/code/Code";

export default function RenderPropRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Render props" />
      <div>
        The <code>Child</code> component can also be a{" "}
        <ExternalLink href="https://legacy.reactjs.org/docs/render-props.html">
          render prop
        </ExternalLink>
        .
      </div>
      <Code html={html} />
      <Callout intent="primary">
        Render props provide the added benefit of being able to reference other
        values that are in scope.
      </Callout>
    </Box>
  );
}
