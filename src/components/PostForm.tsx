import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost, fetchPostById } from "../features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../hook";
import { Loader2, FileText, Type, ArrowLeftCircle, Save, CheckCircle2 } from "lucide-react";

type Props = { editMode?: boolean };

const PostForm: React.FC<Props> = ({ editMode = false }) => {
  const { id } = useParams();
  const postId = id ? Number(id) : null;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedPost, loading } = useAppSelector((s) => s.posts);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ for toast


  // Fetch post whenever postId changes
  // useEffect(() => {
  //   if (postId) {
  //     dispatch(fetchPostById(postId));
  //   }
  // }, [dispatch, postId]);


  useEffect(() => {
    if (editMode && postId) {
      if (!selectedPost || selectedPost.id !== postId) {
        dispatch(fetchPostById(postId));
      }
    }
  }, [dispatch, editMode, postId, selectedPost]);


  // Sync form fields with selectedPost
  useEffect(() => {
    if (editMode && selectedPost) {
      setTitle(selectedPost.title);
      setBody(selectedPost.body);
    }
  }, [editMode,selectedPost]);


  // Clear form when switching to create mode
  useEffect(() => {
    if (!editMode) {
      setTitle("");
      setBody("");
    }
  }, [editMode]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editMode && postId) {
      await dispatch(updatePost({ id: postId,data : { title, body} }));
      setSuccessMessage("Post updated successfully!");
      setTimeout(() => navigate(`/`), 1500);
    } else {
      await dispatch(createPost({ title, body }));
      setSuccessMessage("Post created successfully!");
      setTimeout(() => navigate("/"), 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-fadeIn relative">

      {/* Success Toast */}
      {successMessage && (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        {editMode ? <FileText /> : <Type />}
        {editMode ? "Edit Post" : "Create Post"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title Field */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Enter post title..."
            required
            disabled={loading}
          />
        </div>

        {/* Body Field */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Write your post content..."
            rows={6}
            required
            disabled={loading}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 items-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2 
              bg-green-600 hover:bg-green-700 transition 
              disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save />}
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium flex items-center gap-2 transition"
          >
            <ArrowLeftCircle />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

