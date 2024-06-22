import "server-only";

import { db } from "./db";
import { eq, and } from "drizzle-orm";
import { posts } from "./db/schema";
import { type UserSession, withAuth } from "@/server/auth";

const postsPolicy = {
  view: true,
  edit: (user: UserSession) => user.isAdmin,
};

const postsApi = {
  getPosts: () => {
    return withAuth(postsPolicy.view, async (user) =>
      db
        .select()
        .from(posts)
        .where(eq(posts.createdBy, user.name))
        .orderBy(posts.createdAt),
    );
  },

  createPost: async () => {
    return withAuth(postsPolicy.edit, async (user) =>
      db.insert(posts).values({ name: "new", createdBy: user.name }),
    );
  },

  updatePost: async (id: number, data: { name: string }) => {
    return withAuth(postsPolicy.edit, async (user) =>
      db
        .update(posts)
        .set(data)
        .where(and(eq(posts.id, id), eq(posts.createdBy, user.name)))
        .returning(),
    );
  },

  deletePost: async (id: number) => {
    return withAuth(postsPolicy.edit, async () =>
      db.delete(posts).where(eq(posts.id, id)),
    );
  },
};

export const api = {
  ...postsApi,
};
