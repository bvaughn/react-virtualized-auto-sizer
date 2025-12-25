import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Nav() {
  return (
    <div className="w-full shrink-0 flex flex-col gap-4 py-4 overflow-y-auto">
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
    </div>
  );
}
