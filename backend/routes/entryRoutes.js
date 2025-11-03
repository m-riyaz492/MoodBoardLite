import express from "express";
import {
  createEntry,
  getTodayEntry,
  getEntryHistory,
  deleteEntry, // ✅ Make sure this is here
} from "../controllers/entryController.js";

const router = express.Router();

router.post("/", createEntry);
router.get("/today", getTodayEntry);
router.get("/history", getEntryHistory);
router.delete("/:id", deleteEntry); // ✅ Now this will work

export default router;