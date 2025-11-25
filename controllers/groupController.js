import Grouping from "../models/grouping/GroupingSchema.js";

import { groupTopics } from "../data/topics.js";

// Auto assign student to a group
export const assignStudentToGroup = async (student) => {
  // 1. Find a group with less than 6 students
  let group = await Grouping.findOne({ "students.5": { $exists: false } });

  // 2. If no group exists → create a new one
  if (!group) {
    const totalGroups = await Grouping.countDocuments();
    const topicIndex = totalGroups % groupTopics.length;

    group = await Grouping.create({
      name: `Group ${totalGroups + 1}`,
      topic: groupTopics[topicIndex],
      students: [],
    });
  }

  // 3. Add student
  group.students.push(student);
  await group.save();

  return group;
};

// Get all groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Grouping.find().populate("students");
    res.status(200).json({ success: true, groups });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get the group of a specific student
export const getStudentGroup = async (req, res) => {
  try {
    const { studentId } = req.params;

    const group = await Grouping.findOne({ students: studentId }).populate(
      "students"
    );

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Student is not assigned to any group",
      });
    }

    res.status(200).json({ success: true, group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
