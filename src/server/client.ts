import { hc } from "hono/client";
import type { AppType } from "@/app/api/v1/[[...route]]/route";

export const client = hc<AppType>("");
