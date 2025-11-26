import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchPosts, deletePost } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";
import {
  Eye,
  Pencil,
  Trash2,
  FilePlus2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.items);
  const loading = useAppSelector((state) => state.posts.loading);
  const error = useAppSelector((state) => state.posts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  // Delete dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const indexOfLastPost = currentPage * postsPerPage;
  const currentPosts = posts.slice(
    indexOfLastPost - postsPerPage,
    indexOfLastPost
  );
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Open dialog
  const openDeleteDialog = (id: number) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deletePost(deleteId));
    }
    setShowDialog(false);
    setDeleteId(null);
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading posts...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-green-900 flex items-center gap-2">
          Posts
        </h1>

        <Link
          to="/posts/create"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          <FilePlus2 size={18} />
          Add New Post
        </Link>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3">{post.body}</p>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-between items-center">
              <Link
                to={`/posts/${post.id}`}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                <Eye size={16} />
                View
              </Link>

              <Link
                to={`/posts/${post.id}/edit`}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                <Pencil size={16} />
                Edit
              </Link>

              <button
                onClick={() => openDeleteDialog(post.id)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
          Prev
        </button>

        <span className="font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md border">
            <h3 className="text-xl font-bold text-red-600 mb-3 flex items-center gap-2">
              <Trash2 /> Confirm Delete
            </h3>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsList;


