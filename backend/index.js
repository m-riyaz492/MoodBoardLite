import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // ✅ Mount auth routes
app.use("/api/entry", entryRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port", process.env.PORT || 5000)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));