import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "@/database/drizzle/db";
import { users } from "@/database/drizzle/schema";

const userRouteApp = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        username: z.string().optional(),
        email: z.email().optional(),
      }),
    ),
    async (c) => {
      const { username, email } = c.req.valid("query");
      let usersResult: (typeof users.$inferSelect)[] | null = null;
      if (email) {
        usersResult = await db
          .select()
          .from(users)
          .where(eq(users.email, email));
      }
      if (username) {
        usersResult = await db
          .select()
          .from(users)
          .where(eq(users.username, username));
      }
      if (!usersResult || usersResult.length === 0) {
        return c.json({ message: "Not found" }, 404);
      }
      return c.json({ user: usersResult[0] });
    },
  )
  .post(
    "/",
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
      try {
        await db.insert(users).values(user);
        return c.json({ message: "ok" });
      } catch (e) {
        console.error(e);
        return c.json({ message: "Something went wrong" }, 500);
      }
    },
  );

export { userRouteApp };
