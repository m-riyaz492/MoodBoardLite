import Entry from "../models/Entry.js";
import jwt from "jsonwebtoken";

// Helper to extract user ID from token
const getUserIdFromToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
};

// POST /api/entry → Create a new mood entry
export const createEntry = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { mood, note, imageUrl, emojis, color } = req.body;
  if (!mood) return res.status(400).json({ message: "Mood is required" });

  try {
    const newEntry = await Entry.create({
      user: userId,
      mood,
      note,
      emojis,
      color,
      imageUrl,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: "Failed to create entry", error: err.message });
  }
};

// GET /api/entry/today → Fetch today's entry
export const getTodayEntry = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const entries = await Entry.find({
      user: userId,
      createdAt: { $gte: today },
    }).sort({ createdAt: -1 }); // newest first
    res.json(entries); // ✅ return array
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch today's entries", error: err.message });
  }
};

// GET /api/entry/history → Fetch all past entries
export const getEntryHistory = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const entries = await Entry.find({ user: userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history", error: err.message });
  }
};

export const deleteEntry = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const entry = await Entry.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete entry", error: err.message });
  }
};

