import express from "express";
import {
  createStudent,
  LoginStudent,
  //   getAllStudents,
  //   getStudent,
} from "../controllers/studentcontroller.js";

const router = express.Router();

// Routes
router.post("/register", createStudent);
router.post("/login", LoginStudent);

export default router;
