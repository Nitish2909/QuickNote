import Note from "../models/Note.js";
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controllers", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        message: "Note Not Found",
      });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNotById controllers", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNotes = new Note({
      title,
      content,
    });
    res.status(201).json({
      message: "Note Created Successfully",
    });
    await newNotes.save();
  } catch (error) {
    console.error("Error in createNote controllers", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!updateNote) {
      return res.status(404).json({
        message: "Note Not Found",
      });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controllers", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    // const {title,content} = req.body;
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({
        message: "Note Not Found",
      });
    }
    res.status(200).json({
      message: "Note Deleted Successfully",
    });
  } catch (error) {
    console.error("Error in deleteNote controllers", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
