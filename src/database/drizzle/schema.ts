import {
  type AnyPgColumn,
  date,
  integer,
  pgEnum,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  username: varchar({ length: 20 }).unique(),
  email: varchar({ length: 20 }).unique(),
  password: varchar({ length: 20 }),
  karma: integer().default(0),
  posts: integer()
    .references((): AnyPgColumn => posts.id)
    .array(),
  comments: integer()
    .references((): AnyPgColumn => comments.id)
    .array(),
  subs: integer()
    .references((): AnyPgColumn => posts.id)
    .array(),
  createdAt: date().defaultNow(),
  updatedAt: date().defaultNow(),
});

export const comments = pgTable("comments", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  content: varchar({ length: 200 }),
  upvotes: integer().default(0),
  downvotes: integer().default(0),
  comments: integer()
    .references((): AnyPgColumn => comments.id)
    .array(),
  author: integer().references(() => users.id),
  createdAt: date().defaultNow(),
  updatedAt: date().defaultNow(),
});

export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  content: varchar({ length: 200 }),
  upvotes: integer().default(0),
  downvotes: integer().default(0),
  comments: integer()
    .references((): AnyPgColumn => comments.id)
    .array(),
  author: integer().references(() => users.id),
  createdAt: date().defaultNow(),
  updatedAt: date().defaultNow(),
});

export const statusEnum = pgEnum("status", ["public", "private"]);

export const subs = pgTable("subs", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  title: varchar({ length: 20 }),
  description: varchar({ length: 20 }),
  members: integer()
    .references(() => users.id)
    .array(),
  mods: integer()
    .references(() => users.id)
    .array(),
  posts: integer()
    .references(() => posts.id)
    .array(),
  status: statusEnum().default("public"),
  rules: varchar({ length: 30 }).array(),
  createdAt: date().defaultNow(),
  updatedAt: date().defaultNow(),
});
