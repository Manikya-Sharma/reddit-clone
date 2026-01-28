import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/database/drizzle/db";
import { posts, subs, users } from "@/database/drizzle/schema";
import { eq } from "drizzle-orm";

const postsRouteApp = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      title: z.string(),
      content: z.string(),
      subId: z.string(),
      userId: z.number(),
    }),
  ),
  async (c) => {
    const { title, content, subId, userId } = c.req.valid("json");
    const parsedSubId = parseInt(subId, 10);
    const usersResult = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (!usersResult || usersResult.length === 0) {
      return c.json({ message: "user not found" }, 404);
    }
    const user = usersResult[0];
    const subResult = await db
      .select()
      .from(subs)
      .where(eq(subs.id, parsedSubId));
    if (!subResult || subResult.length === 0) {
      return c.json({ message: "sub not found" }, 404);
    }
    const sub = subResult[0];

    const post = (
      await db
        .insert(posts)
        .values({
          title,
          content,
          author: userId,
          sub: parsedSubId,
        })
        .returning()
    )[0];

    await db.update(users).set({ posts: [...(user.posts ?? []), post.id] });
    await db.update(subs).set({ posts: [...(sub.posts ?? []), post.id] });

    return c.json({ message: "ok" });
  },
);

export { postsRouteApp };
