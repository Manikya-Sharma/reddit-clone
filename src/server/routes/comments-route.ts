import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "@/database/drizzle/db";
import { comments } from "@/database/drizzle/schema";

const commentsRouteApp = new Hono()
  .post(
    "/get-comment",
    zValidator("json", z.object({ id: z.number() })),
    async (c) => {
      const { id } = c.req.valid("json");
      const commentsResults = await db
        .select()
        .from(comments)
        .where(eq(comments.id, id));
      if (!commentsResults || commentsResults.length === 0) {
        return c.json({ message: "not found" }, 404);
      }
      return c.json({ comment: commentsResults[0] });
    },
  )
  .post(
    "/upvote",
    zValidator("json", z.object({ commentId: z.number(), userId: z.number() })),
    async (c) => {
      const { commentId, userId } = c.req.valid("json");
      const commentsResults = await db
        .select()
        .from(comments)
        .where(eq(comments.id, commentId));
      if (!commentsResults || commentsResults.length === 0) {
        return c.json({ message: "not found" }, 404);
      }
      const comment = commentsResults[0];
      if (comment.downvotes?.includes(userId)) {
        await db
          .update(comments)
          .set({ downvotes: comment.downvotes.filter((id) => id !== userId) })
          .where(eq(comments.id, commentId));
      }
      if (comment.upvotes?.includes(userId)) {
        await db
          .update(comments)
          .set({ upvotes: comment.upvotes.filter((id) => id !== userId) })
          .where(eq(comments.id, commentId));
      } else {
        await db
          .update(comments)
          .set({ upvotes: [...(comment.upvotes ?? []), userId] })
          .where(eq(comments.id, commentId));
      }
      return c.json({ message: "ok" });
    },
  )
  .post(
    "/downvote",
    zValidator("json", z.object({ commentId: z.number(), userId: z.number() })),
    async (c) => {
      const { commentId: postId, userId } = c.req.valid("json");
      const commentsResult = await db
        .select()
        .from(comments)
        .where(eq(comments.id, postId));
      if (!commentsResult || commentsResult.length === 0) {
        return c.json({ message: "not found" }, 404);
      }
      const comment = commentsResult[0];
      if (comment.upvotes?.includes(userId)) {
        await db
          .update(comments)
          .set({ upvotes: comment.upvotes.filter((id) => id !== userId) })
          .where(eq(comments.id, postId));
      }
      if (comment.downvotes?.includes(userId)) {
        await db
          .update(comments)
          .set({ downvotes: comment.downvotes.filter((id) => id !== userId) })
          .where(eq(comments.id, postId));
      } else {
        await db
          .update(comments)
          .set({ downvotes: [...(comment.downvotes ?? []), userId] })
          .where(eq(comments.id, postId));
      }
      return c.json({ message: "ok" });
    },
  );

export { commentsRouteApp };
