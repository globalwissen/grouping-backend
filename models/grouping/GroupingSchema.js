import mongoose from "mongoose";

const groupingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  topic: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure exactly 6 students per group max
groupingSchema.pre("save", function (next) {
  if (this.students.length > 6) {
    return next(new Error("A group cannot have more than 6 students"));
  }
  next();
});

const Grouping = mongoose.model("Grouping", groupingSchema);
export default Grouping;
