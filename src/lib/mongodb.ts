import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env file");
}

let cachedConnection: typeof mongoose | null = null;

export default async function connectDb() {
  if (cachedConnection) {
    console.log("Using cached MongoDB connection");
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
      dbName: "JustKitchen", // Replace with your actual database name
    });
    cachedConnection = connection;
    console.log(
      "MongoDB connected successfully to database:",
      connection.connection.db?.databaseName || "unknown"
    );
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
