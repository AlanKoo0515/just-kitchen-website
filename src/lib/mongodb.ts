import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI as string;
const mongodbName = process.env.MONGODB_NAME as string;

if (!mongodbUri) {
  throw new Error("MONGODB_URI is not set");
}

if (!mongodbName) {
  throw new Error("MONGODB_NAME is not set");
}

export default async function connectDb() {
  try {
    mongoose.connect(mongodbUri, { dbName: mongodbName });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}
