import {
  AppRoot,
  Callout,
  ExternalLink,
  Link,
  NavSection
} from "react-lib-tools";
import { NavLink } from "./components/NavLink";
import { routes } from "./routes";

export default function App() {
  return (
    <AppRoot
      hideVersions
      navLinks={
        <div>
          <NavLink path="/">Getting started</NavLink>
          <NavSection label="Examples">
            <NavLink path="/examples/child-component">Child component</NavLink>
            <NavLink path="/examples/render-prop">Render prop function</NavLink>
          </NavSection>
          <NavSection label="Props">
            <NavLink path="/props/auto-sizer">AutoSizer component</NavLink>
          </NavSection>
          <NavLink path="/support">Support</NavLink>
        </div>
      }
      overview={
        <>
          <div>
            This package measures the available width and height of an{" "}
            <code>HTMLElement</code> and passes those values as props to a{" "}
            <code>ChildComponent</code> or <code>renderProp</code>. Refer to the{" "}
            <Link to="/examples/child-component">examples</Link> or{" "}
            <Link to="/props/auto-sizer">props</Link> pages for more
            information.
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
            <code>ResizeObserver</code> natively and do not require this
            package.
          </Callout>
        </>
      }
      packageDescription="(re)sizing helper component"
      packageName="react-virtualized-auto-sizer"
      routes={routes}
    />
  );
}
