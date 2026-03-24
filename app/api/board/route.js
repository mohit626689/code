import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/libs/models/user";
import Board from "@/libs/models/boards";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate input
    if (!body.name) {
      return NextResponse.json(
        { error: "Board name is required" },
        { status: 400 },
      );
    }

    // Check auth
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    // Connect DB
    await connectMongo();

    // Get user (ONLY ONCE ✅)
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create board
    const board = await Board.create({
      userId: user._id,
      name: body.name,
    });

    // Link board to user
    user.boards.push(board._id);
    await user.save();

    return NextResponse.json(board, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
