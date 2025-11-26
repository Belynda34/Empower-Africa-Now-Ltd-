import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hook";
import { fetchPostById } from "../features/posts/postsSlice";
import { useEffect } from "react";
const PostDetails: React.FC = () => {
  const { id } = useParams();
  const postId = id ? Number(id) : null;
  const { selectedPost } = useAppSelector((s) => s.posts);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  // Fetch post if needed
  useEffect(() => {
    if (postId) {
      if (!selectedPost || selectedPost.id !== postId) {
        dispatch(fetchPostById(postId));
      }
    }
  }, [dispatch, postId, selectedPost]);

  if (!selectedPost || selectedPost.id !== postId) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      {/* Back Button */}
      <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
      <p className="mb-4">{selectedPost.body}</p>
      <p className="mb-4">User Id : {selectedPost.userId}</p>
      <p className="mb-4">Id : {selectedPost.id}</p>
      <div className="space-x-5">
        <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
       Back
      </button>
      <Link
        to={`/posts/${selectedPost.id}/edit`}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Edit
      </Link>
      </div>
      
      
    </div>
  );
};

export default PostDetails;
