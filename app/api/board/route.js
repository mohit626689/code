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

    // ✅ FIX: Handle both String and ObjectId session.user.id
    let userId;
    try {
      userId = new mongoose.Types.ObjectId(session.user.id);
    } catch (e) {
      // If it's already an ObjectId or invalid, use as is
      userId = session.user.id;
    }

    // ✅ FIX: Try to find user, if not exists create them
    let user = await User.findById(userId);

    if (!user) {
      console.log("Creating new user:", session.user.id);

      user = await User.create({
        _id: userId,
        name: session.user.name || "User",
        email: session.user.email,
        image: session.user.image,
        hasAccess: false,
        boards: [],
      });

      console.log("✅ User created:", user._id);
    }

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first" },
        { status: 403 },
      );
    }

    const board = await Board.create({
      userId: user._id,
      name: name.trim(),
    });

    // Add to user's boards array
    user.boards.push(board._id);
    await user.save();

    return NextResponse.json({ board });
  } catch (e) {
    console.error("Board creation error:", e);
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

    // ✅ FIX: Handle both String and ObjectId session.user.id
    let userId;
    try {
      userId = new mongoose.Types.ObjectId(session.user.id);
    } catch (e) {
      userId = session.user.id;
    }

    const user = await User.findById(userId);

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
      userId: userId,
    });

    user.boards = user.boards.filter((id) => id.toString() !== boardId);

    await user.save();

    return NextResponse.json({});
  } catch (e) {
    console.error("Board deletion error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
