import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMasterDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_MASTER_URI);
    console.log("✅ Master DB Connected Successfully");
  } catch (error) {
    console.error("❌ Master DB Connection Error:", error.message);
  }
};
