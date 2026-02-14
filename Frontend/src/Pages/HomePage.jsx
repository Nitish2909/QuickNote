import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import toast from 'react-hot-toast';

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //call api in useEffect
    useEffect(()=>{
   const fetchNotes = async()=>{
    try {
         const response = await axios.get("http://localhost:5000/api/notes")
         setNotes(response.data);
         console.log(response.data)
    } catch (error) {
        toast.error("failed to load notes")   
    }
    finally{
        setIsLoading(false);
    }
   }
   fetchNotes();
    }, [])
  return (
    <div className="min-h-screen">
    <Navbar/>

    <div className="max-w-7xl mx-auto p-4 mt-6">
       {isLoading && <div className="text-center text-primary py-10"> Loading Notes...</div> } 

       {notes.length>0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 ls:grid-cols-3 gap-6">
         {notes.map((note)=>(
           <div>
            <NoteCard key={note._id}  note={note} />
             {/* {note.title} | {note.content} */}
            </div>
         ))}

        </div>

       )}
    </div>
      
    </div>
  )
}

export default HomePage
