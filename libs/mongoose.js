import mongoose from "mongoose";

let isConnected = false;

const connectMongo = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected");
  } catch (e) {
    console.error("❌ Mongoose Error: " + e.message);
  }
};

export default connectMongo;
