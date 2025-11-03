// models/Entry.js
import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: String, required: true },
  note: { type: String },
  emojis: [{ type: String }],
  color: { type: String },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.model("Entry", entrySchema);

