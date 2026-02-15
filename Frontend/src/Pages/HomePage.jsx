import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import axiosInatnce from "../utils/axios";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete
  const handleDelete = async () =>{
     try {
    


      
     } catch (error) {
      
     }
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axiosInatnce.get("/notes");
        setNotes(response.data);
      } catch (error) {
        toast.error("Failed to load notes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10">
            Loading Notes...
          </div>
        )}

        {!isLoading && notes.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No notes found. Create your first note!
          </div>
        )}

        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note}  />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
