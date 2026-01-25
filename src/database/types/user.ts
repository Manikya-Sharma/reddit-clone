import { z } from "zod";

export const UserValidator = z
  .object({
    id: z.uuid(),
    username: z.string(),
    email: z.email(),
    password: z.string(),
    posts: z.array(z.uuid()),
    comments: z.array(z.uuid()),
    subs: z.array(z.uuid()),
    karma: z.int32(),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
  })
  .strict();

export type User = z.infer<typeof UserValidator>;
