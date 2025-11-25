import express from "express";

import { getGroups, getStudentGroup } from "../controllers/groupController.js";

const router = express.Router();

router.get("/all", getGroups);
router.get("/:studentId", getStudentGroup);

export default router;
