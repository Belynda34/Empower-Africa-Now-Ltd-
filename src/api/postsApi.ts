// src/api/postsApi.ts
const BASE = "https://jsonplaceholder.typicode.com";

export async function fetchPostsApi() {
  const res = await fetch(`${BASE}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchPostByIdApi(id: number) {
  const res = await fetch(`${BASE}/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function createPostApi(data: { title: string; body: string; userId?: number }) {
  const res = await fetch(`${BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function updatePostApi(id: number, data: { title: string; body: string }) {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

export async function deletePostApi(id: number) {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res;
}
