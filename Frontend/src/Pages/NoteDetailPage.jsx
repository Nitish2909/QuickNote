import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast, { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import axiosInstance from "../utils/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axiosInstance.get(`/notes/${id}`);
        setNote(response.data);

        // set values in form
        setTitle(response.data.title || "");
        setContent(response.data.content || "");
      } catch (error) {
        toast.error("Failed to load note");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Update note
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Title is required");
    if (!content.trim()) return toast.error("Content is required");

    try {
      setIsSaving(true);

      await axiosInstance.put(`/notes/${id}`, {
        title,
        content,
      });

      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Note not found
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto bg-gray-50 p-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-700 hover:text-black mb-6"
      >
        <ArrowLeftIcon size={20} />
        <div className="font-semibold">Back To Notes</div>
      </Link>
      {/* Form */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Note</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Content</label>
            <textarea
              rows="5"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;
