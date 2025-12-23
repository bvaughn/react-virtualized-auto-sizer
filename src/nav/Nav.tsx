import { NavLink } from "./NavLink";

export function Nav() {
  return (
    <div className="w-full shrink-0 flex flex-col gap-4 py-4 overflow-y-auto">
      <NavLink path="/">Documentation</NavLink>
    </div>
  );
}
