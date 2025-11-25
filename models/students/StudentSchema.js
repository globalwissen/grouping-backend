import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(value);
      },
      message:
        "Password must be at least 6 characters long and include a symbol",
    },
  },
  university: {
    type: String,
    required: true,
    enum: ["cosmopolitan", "prime", "trinity"],
  },
  department: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["entrepreneur", "techpreneur", "intrapreneur"],
  },
  personalityTypes: { type: [String], required: true }, // validate in controller
});

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);
export default Student;
