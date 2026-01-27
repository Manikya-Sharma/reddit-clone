import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "@/database/drizzle/db";
import { users } from "@/database/drizzle/schema";

const userRouteApp = new Hono()
  .get(
    "/user",
    zValidator(
      "query",
      z.object({
        username: z.string().optional(),
        email: z.email().optional(),
      }),
    ),
    (c) => {
      const { username, email } = c.req.valid("query");
      if (email) {
        const user = db.select().from(users).where(eq(users.email, email));
        return c.json({ user });
      }
      if (username) {
        const user = db
          .select()
          .from(users)
          .where(eq(users.username, username));
        return c.json({ user });
      }
      return c.json({ message: "Bad request!" }, 400);
    },
  )
  .post(
    "/user",
    zValidator(
      "json",
      z.object({
        username: z.string().min(5),
        email: z.email(),
        password: z.string().min(5),
      }),
    ),
    async (c) => {
      const data = c.req.valid("json");
      const user = { ...data };
      await db.insert(users).values(user);
      return c.json({ message: "ok" });
    },
  );

export { userRouteApp };
