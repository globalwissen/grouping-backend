import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMasterDB } from "./config/masterDb.js";
import StudentsRoutes from "./routes/students.js";

dotenv.config(); // ← must come first

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/students", StudentsRoutes);
// Connect Master DB
connectMasterDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
