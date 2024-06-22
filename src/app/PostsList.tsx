"use client";

import { type Post } from "@/server/db/schema";
import { useRef, useState } from "react";

type Props = {
  posts: Post[];
  onChange: (id: number, data: { name: string }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export const PostsList = ({ posts, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} {...props} />
      ))}
    </div>
  );
};

type PostProps = {
  post: Post;
  onChange: (id: number, data: { name: string }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export const PostItem = ({ post, onChange, onDelete }: PostProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState(post.name ?? "");

  return (
    <div key={post.id} className="flex gap-4 rounded border border-black p-4">
      <form ref={formRef} action={() => onChange(post.id, { name })}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => formRef.current?.requestSubmit()}
        />
      </form>

      <form action={() => onDelete(post.id)}>
        <button type="submit">delete</button>
      </form>
    </div>
  );
};
