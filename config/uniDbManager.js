// config/uniDbManager.js
import mongoose from "mongoose";

const universityConnections = {};

export const getUniversityDB = (universityName) => {
  if (universityConnections[universityName]) {
    return universityConnections[universityName];
  }

  try {
    const db = mongoose.createConnection(
      `${process.env.UNI_DB_URI_PREFIX}${universityName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    universityConnections[universityName] = db;

    console.log(`University DB connected: ${universityName}`);

    return db;
  } catch (error) {
    console.error("University DB Connection Error:", error.message);
  }
};
