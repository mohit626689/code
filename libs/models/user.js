import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => crypto.randomUUID(),
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
    hasAccess: {
      type: Boolean,
      default: false,
    },
    customerId: {
      type: String,
    },
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
  },
  { _id: false },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
