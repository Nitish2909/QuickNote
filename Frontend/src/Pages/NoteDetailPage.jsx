import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import axiosInatnce from "../utils/axios";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axiosInatnce.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        toast.error("Failed to load note");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-700 hover:text-black mb-6"
      >
        <ArrowLeftIcon size={20} />
        Back
      </Link>

      {/* Note Card */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>

        <p className="text-gray-700 whitespace-pre-line">{note.content}</p>

        <p className="text-sm text-gray-400 mt-6">
          Created on: {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailPage;
