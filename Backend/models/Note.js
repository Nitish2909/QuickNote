import mongoose from "mongoose";

// 1st Step: You need to create Schema
//2nd Step : yu would create a model based off of the Schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
},
{
    timestamps:true  // createdAt, updatedAt
}
);

const Note = mongoose.model("Note", noteSchema);
export default Note
