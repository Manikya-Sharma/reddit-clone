import { z } from "zod";

export const SubValidator = z
  .object({
    id: z.uuid(),
    title: z.string(),
    description: z.string(),
    members: z.array(z.uuid()),
    mods: z.array(z.uuid()),
    posts: z.array(z.uuid()),
    status: z.enum(["public", "private"]).default("public"),
    rules: z.array(z.string()).optional(),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
  })
  .strict();

export type Sub = z.infer<typeof SubValidator>;
