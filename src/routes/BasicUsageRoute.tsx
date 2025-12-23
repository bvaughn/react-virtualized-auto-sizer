import { Box } from "../components/Box";
import { Header } from "../components/Header";
import BasicUsageExampleMarkdown from "../../public/generated/code-snippets/BasicUsageExample.json";
import { Code } from "../components/code/Code";

export default function BasicUsageRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Basic usage" />
      <div>
        This component measures the available width and height and passes those
        values to a <code>render</code> function:
      </div>
      <Code html={BasicUsageExampleMarkdown.html} />
    </Box>
  );
}
