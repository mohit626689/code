import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Board from "@/libs/models/boards";
import User from "@/libs/models/user";
import mongoose from "mongoose";

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    if (!boardId) {
      return NextResponse.json(
        { error: "boardId is required" },
        { status: 400 },
      );
    }

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    // ✅ Find user by email
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Convert boardId to ObjectId
    let boardObjectId;
    try {
      boardObjectId = new mongoose.Types.ObjectId(boardId);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid board ID format" },
        { status: 400 },
      );
    }

    // ✅ Delete board (verify ownership)
    const board = await Board.findOneAndDelete({
      _id: boardObjectId,
      userId: user._id,
    });

    if (!board) {
      return NextResponse.json(
        { error: "Board not found or unauthorized" },
        { status: 404 },
      );
    }

    // ✅ Remove boardId from user's boards array
    await User.findByIdAndUpdate(
      user._id,
      { $pull: { boards: boardObjectId } },
      { new: true },
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE board error:", e);
    return NextResponse.json(
      { error: e.message || "Failed to delete board" },
      { status: 500 },
    );
  }
}
