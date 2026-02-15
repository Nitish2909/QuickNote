import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInatnce from "../utils/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All Fields are Required");
      return;
    }
    setIsLoading(true);

    try {
      await axiosInatnce.post("/notes", {
        title,
        content,
      });

      toast.success("Note Created Successfully");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      toast.error("Error to Create Note");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-700 hover:text-black mb-6"
      >
        <ArrowLeftIcon size={20} />
        <div className="text font-semibold">
          Back To Notes
        </div>
      </Link>

      {/* Form */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 ml-50">Create New Note</h1>

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
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
