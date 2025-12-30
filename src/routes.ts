import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export type Route = LazyExoticComponent<ComponentType<unknown>>;

export const routes = {
  "/examples/child-component": lazy(
    () => import("./routes/ChildComponentRoute")
  ),
  "/examples/render-prop": lazy(() => import("./routes/RenderPropRoute")),
  "/props/auto-sizer": lazy(() => import("./routes/AutoSizerPropsRoute"))
} satisfies Record<string, Route>;

export type Routes = Record<keyof typeof routes, Route>;
export type Path = keyof Routes;
