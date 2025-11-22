import express from "express";
import {
  createStudent,
  //   getAllStudents,
  //   getStudent,
} from "../controllers/studentcontroller.js";

const router = express.Router();

// Routes
router.post("/createStudent", createStudent); // Create
// router.get("/", getAllStudents); // Get all
// router.get("/:id", getStudent); // Get one

export default router;
