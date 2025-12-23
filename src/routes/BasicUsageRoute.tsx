import { Box } from "../components/Box";
import { Header } from "../components/Header";
import BasicUsageExampleMarkdown from "../../public/generated/code-snippets/BasicUsageExample.json";
import { Code } from "../components/code/Code";

export default function BasicUsageRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Basic usage" />
      <div>
        Measures the available width and height of its parent and passes those
        values to a child component in the form of <code>width</code> and{" "}
        <code>height</code> props.
      </div>
      <Code html={BasicUsageExampleMarkdown.html} />
    </Box>
  );
}
