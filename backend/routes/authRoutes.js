import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login); // ✅ This is the route your frontend is calling
router.delete("/:id", deleteEntry);

export default router;