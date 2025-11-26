import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../hook";

const PostDetails: React.FC = () => {
  const { id } = useParams();
  const postId = id ? Number(id) : null;
  const { selectedPost } = useAppSelector((s) => s.posts);

  if (!selectedPost || selectedPost.id !== postId) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
      <p className="mb-4">{selectedPost.body}</p>
      <Link
        to={`/posts/${selectedPost.id}/edit`}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Edit
      </Link>
    </div>
  );
};

export default PostDetails;
