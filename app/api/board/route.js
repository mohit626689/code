import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Board from "@/libs/models/boards";
import User from "@/libs/models/user";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Board name is required" },
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

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first" },
        { status: 403 },
      );
    }

    const board = await Board.create({
      userId: session.user.id,
      name: name.trim(),
    });

    // Add to user's boards array
    user.boards.push(board._id);
    await user.save();

    return NextResponse.json({ board });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

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

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first" },
        { status: 403 },
      );
    }

    let boardObjectId;
    try {
      boardObjectId = new mongoose.Types.ObjectId(boardId);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid board ID format" },
        { status: 400 },
      );
    }

    await Board.deleteOne({
      _id: boardObjectId,
      userId: session.user.id,
    });

    user.boards = user.boards.filter((id) => id.toString() !== boardId);

    await user.save();

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
