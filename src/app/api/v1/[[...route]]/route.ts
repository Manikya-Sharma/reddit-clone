import { Hono } from "hono";
import { handle } from "hono/vercel";
import { helloRouteApp } from "@/server/routes/hello-route";
import { sessionsRouteApp } from "@/server/routes/sessions-route";
import { subsRouteApp } from "@/server/routes/subs-route";
import { userRouteApp } from "@/server/routes/user-route";

export const app = new Hono()
  .basePath("/api/v1")
  .route("/helloRoute", helloRouteApp)
  .route("/user", userRouteApp)
  .route("/sessions", sessionsRouteApp)
  .route("/subs", subsRouteApp);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
