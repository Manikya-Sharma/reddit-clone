import { z } from "zod";

export const PostValidator = z
  .object({
    id: z.uuid(),
    content: z.string(),
    upvotes: z.int32(),
    downvotes: z.int32(),
    comments: z.array(z.uuid()),
    author: z.uuid(),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
  })
  .strict();

export type Post = z.infer<typeof PostValidator>;
