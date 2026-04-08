import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ✅ REMOVED custom _id - now uses MongoDB's default ObjectId
    // This fixes findById() queries

    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
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
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
