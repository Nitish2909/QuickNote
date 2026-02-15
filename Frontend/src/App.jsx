import React from 'react'
import {BrowserRouter, Route, Routes } from "react-router-dom"
import CreatePage from './Pages/CreatePage'
import NoteDetailPage from './Pages/NoteDetailPage'
import HomePage from './Pages/HomePage'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
    <div>
      <BrowserRouter>
     <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
         <Route path="/create" element={<CreatePage/>} />
          <Route path="/note/:id" element={<NoteDetailPage/>} />
      </Routes>
      </BrowserRouter>
     
    </div>
    
    </>
  )
}

export default App
