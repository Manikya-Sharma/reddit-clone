import { Hono } from "hono";
import { hc } from "hono/client";
import { handle } from "hono/vercel";
import { helloRouteApp } from "@/server/routes/hello-route";
import { userRouteApp } from "@/server/routes/user-route";

export const app = new Hono()
  .basePath("/api/v1")
  .route("/helloRoute", helloRouteApp)
  .route("/user", userRouteApp);

export type AppType = typeof app;

export const client = hc<AppType>("");

export const GET = handle(app);
export const POST = handle(app);
