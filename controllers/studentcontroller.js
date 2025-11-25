import Student from "../models/students/StudentSchema.js";
import { assignStudentToGroup } from "./groupController.js";

const allowedPersonality = {
  entrepreneur: ["ENTJ", "ENTP", "ESTP", "ESFP", "ESTJ"],
  techpreneur: ["INTJ", "INTP", "ISTP", "ISFP", "ISTJ"],
  intrapreneur: ["ENFJ", "ENFP", "INFJ", "INFP", "ISFJ"],
};

export const createStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      university,
      department,
      category,
      personalityTypes,
    } = req.body;

    // Validate category exists
    if (!allowedPersonality[category]) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });
    }

    // Validate personality types
    const invalid = personalityTypes.filter(
      (p) => !allowedPersonality[category].includes(p)
    );
    if (invalid.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid personality type(s) for category "${category}": ${invalid.join(
          ","
        )}`,
      });
    }

    // Create student
    const student = await Student.create({
      fullName,
      email,
      password,
      university,
      department,
      category,
      personalityTypes,
    });

    // Auto-assign to group
    const group = await assignStudentToGroup(student._id);

    res.status(201).json({
      success: true,
      student,
      group,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const LoginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    const isMatch = await student.matchPassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    // return clean student object
    const studentData = student.toObject();
    delete studentData.password;

    res.status(200).json({ success: true, student: studentData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
