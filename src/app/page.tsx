import { api } from "@/server/router";
import { PostsList } from "./PostsList";
import { revalidatePath } from "next/cache";
import { match, P } from "ts-pattern";
import { AddButton } from "./AddButton";

export default async function HomePage() {
  const posts = await api.getPosts();

  const handleDelete = async (id: number) => {
    "use server";
    await api.deletePost(id);
    revalidatePath("/");
  };

  const handleUpdate = async (id: number, data: { name: string }) => {
    "use server";
    await api.updatePost(id, data);
    revalidatePath("/");
  };

  const handleAdd = async () => {
    "use server";
    await api.createPost();
    revalidatePath("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {match(posts)
        .with([P.not(P.nullish), ...P.array()], (posts) => (
          <PostsList
            posts={posts}
            onChange={handleUpdate}
            onDelete={handleDelete}
          />
        ))
        .otherwise(() => null)}
      <AddButton handleAdd={handleAdd} />
    </main>
  );
}
