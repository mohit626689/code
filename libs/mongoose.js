import mongoose from "mongoose";

let isConnected = false;

const connectMongo = async () => {
  if (isConnected) return;

  try {
    // ✅ Validate environment variable exists
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI environment variable is not set. Check your .env.local file",
      );
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
    });

    // ✅ Check connection state properly
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");

    return db;
  } catch (e) {
    console.error("❌ MongoDB Error:", e.message);
    isConnected = false;
    throw e; // ✅ Throw error so API knows connection failed
  }
};

export default connectMongo;
