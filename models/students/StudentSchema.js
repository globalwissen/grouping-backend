import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  // university: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "University",
  //   required: true,
  // },
  department: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["entrepreneur", "techpreneur", "intrapreneur"],
  },
  // personalityTypes: {
  //   type: [String],
  //   required: true,
  //   validate: {
  //     validator: function (arr) {
  //       const categoryPersonalityMap = {
  //         entrepreneur: ["ENTJ", "ENTP", "ESTP", "ESFP", "ESTJ"],
  //         techpreneur: ["INTJ", "INTP", "ISTP", "ISFP", "ISTJ"],
  //         intrapreneur: ["ENFJ", "ENFP", "INFJ", "INFP", "ISFJ"],
  //       };
  //       return arr.every((val) =>
  //         categoryPersonalityMap[this.category].includes(val)
  //       );
  //     },
  //     message: (props) =>
  //       `Invalid personality type(s) for category "${props.instance.category}"`,
  //   },
  // },
});

// Model
const Student = mongoose.model("Student", studentSchema);

export default Student;
