import React from "react";
import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import axiosInatnce from "../utils/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note }) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString();

  const handleDelete = async (id) => {
    if (!window.confirm("Are You Sure You Want to Delete This Note?"))
    return;
    try {
      await axiosInatnce.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully");
      setTimeout(()=>{
        window.location.reload()
      },1000)
    } catch (error) {
      toast.error("Failed to Delete Note");
    }
  };

  return (
    <div className="bg-amber-100 p-5 rounded-lg shadow hover:shadow-lg transition">
      {/* Clickable Area */}
      <Link to={`/note/${note._id}`}>
        <h1 className="font-bold text-lg text-black mb-2">{note.title}</h1>
        <p className="text-gray-700 line-clamp-2">{note.content}</p>
      </Link>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500">{formattedDate}</span>

        <div className="flex gap-3">
          <PenSquareIcon className="w-5 h-5 text-blue-600 cursor-pointer hover:scale-110 transition" />

          <button  onClick={()=>{handleDelete(note._id)}}>
            <Trash2Icon className="w-5 h-5 text-red-600 cursor-pointer hover:scale-110 transition" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
