import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export type Route = LazyExoticComponent<ComponentType<unknown>>;

export const routes = {
  "*": lazy(() => import("./routes/PageNotFound")),
  "/": lazy(() => import("./routes/GettingStartedRoute")),
  "/examples/basic-usage": lazy(() => import("./routes/BasicUsageRoute")),
  "/examples/render-prop": lazy(() => import("./routes/RenderPropRoute")),
  "/props/auto-sizer": lazy(() => import("./routes/AutoSizerPropsRoute")),
  "/support": lazy(() => import("./routes/SupportRoute"))
} satisfies Record<string, Route>;

export type Routes = Record<keyof typeof routes, Route>;
export type Path = keyof Routes;
