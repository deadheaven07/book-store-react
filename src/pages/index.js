import { lazy } from "react";

export const Homepage = lazy(() => import("./HomePage"));
export const Books = lazy(() => import("./Books"));
export const Authors = lazy(() => import("./Authors"));
export const EachAuthor = lazy(() => import("./EachAuthor"));
