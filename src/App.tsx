import { AppRoot, NavLink, NavSection } from "react-lib-tools";
import { routes } from "./routes";

export default function App() {
  return (
    <AppRoot
      navLinks={
        <div>
          <NavLink path="/">Getting started</NavLink>
          <NavSection label="Examples">
            <NavLink path="/examples/basic-usage">Basic usage</NavLink>
            <NavLink path="/examples/render-prop">Render prop</NavLink>
          </NavSection>
          <NavSection label="Props">
            <NavLink path="/props/auto-sizer">AutoSizer component</NavLink>
          </NavSection>
          <NavLink path="/support">Support</NavLink>
        </div>
      }
      packageDescription="(re)sizing helper component"
      packageName="react-virtualized-auto-sizer"
      routes={routes}
    />
  );
}
