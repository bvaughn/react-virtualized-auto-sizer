import { Box, Callout, ExternalLink, Header } from "react-lib-tools";
import { Link } from "../components/Link";

export default function GettingStartedRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header title="Getting started" />
      <div>
        This package measures the available width and height of an{" "}
        <code>HTMLElement</code> and passes those values as props to a{" "}
        <code>Child</code> component. Refer to the{" "}
        <Link to="/examples/basic-usage">examples</Link> or{" "}
        <Link to="/props/auto-sizer">props</Link> pages for more information.
      </div>
      <Callout intent="primary">
        This package began as a fork of the <code>AutoSizer</code> component
        from{" "}
        <ExternalLink href="https://github.com/bvaughn/react-virtualized">
          react-virtualized
        </ExternalLink>
        , and was intended for use with earlier versions of{" "}
        <ExternalLink href="https://github.com/bvaughn/react-virtualized">
          react-window
        </ExternalLink>
        . More recent versions of <code>react-window</code> use{" "}
        <code>ResizeObserver</code> natively and do not require this package.
      </Callout>
      <div className="text-xl mt-4">Installation</div>
      <div>Begin by installing the library from NPM:</div>
      <code className="grow text-xs md:text-sm block text-left whitespace-pre-wrap rounded-md p-3 bg-black text-white!">
        npm install{" "}
        <span className="tok-keyword">react-virtualized-auto-sizer</span>
      </code>
      <Callout intent="primary">
        TypeScript definitions are included within the published{" "}
        <code>dist</code> folder.
      </Callout>
      <div className="text-xl mt-4">Support</div>
      <div>Here are some ways to support this project:</div>
      <ul className="pl-8">
        <li className="list-disc">
          <ExternalLink href="https://github.com/sponsors/bvaughn/">
            Become a GitHub sponsor
          </ExternalLink>
        </li>
        <li className="list-disc">
          <ExternalLink href="http://givebrian.coffee/">
            Buy me a coffee
          </ExternalLink>
        </li>
      </ul>
    </Box>
  );
}
