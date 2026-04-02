import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Board from "@/libs/models/boards";
import User from "@/libs/models/user";
import mongoose from "mongoose";

export async function POST(req) {
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

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Access check (from screenshot)
    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first" },
        { status: 403 },
      );
    }

    // ✅ Convert boardId
    let boardObjectId;
    try {
      boardObjectId = new mongoose.Types.ObjectId(boardId);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid board ID format" },
        { status: 400 },
      );
    }

    // ✅ Delete board (same as screenshot style)
    await Board.deleteOne({
      _id: boardObjectId,
      userId: session.user.id,
    });

    // ✅ Screenshot logic (IMPORTANT CHANGE)
    user.boards = user.boards.filter((id) => id.toString() !== boardId);

    await user.save();

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
