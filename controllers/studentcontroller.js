import Student from "../models/students/StudentSchema.js";

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ sucess: true, student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
