import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById, clearSelected } from "../features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../hook";

const PostDetails: React.FC = () => {
  const { id } = useParams();
  const postId = Number(id);
  const dispatch = useAppDispatch();
  const { selectedPost, loading, error } = useAppSelector(s => s.posts);

  useEffect(() => {
    if (postId) dispatch(fetchPostById(postId));
    return () => { dispatch(clearSelected()); };
  }, [dispatch, postId]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!selectedPost) return <p className="text-center mt-8">Post not found</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
      <p className="text-gray-700 mb-4">{selectedPost.body}</p>
      <div className="flex gap-2">
        <Link to={`/posts/${selectedPost.id}/edit`} className="px-3 py-2 bg-green-600 text-white rounded">Edit</Link>
        <Link to="/" className="px-3 py-2 bg-gray-200 rounded">Back</Link>
      </div>
    </div>
  );
};

export default PostDetails;
