// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env file");
}

let cachedConnection: typeof mongoose | null = null;

export default async function connectDb() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
