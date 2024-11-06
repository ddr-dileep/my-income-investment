import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const dbConnectionString = process.env.DB_CONNECTION_STRING;
    await mongoose.connect(dbConnectionString!, {
      dbName: "mgmt",
    });
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default dbConnection;
