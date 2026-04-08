import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/libs/models/user";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    // ✅ Handle both String and ObjectId session.user.id
    let userId;
    try {
      userId = new mongoose.Types.ObjectId(session.user.id);
    } catch (e) {
      userId = session.user.id;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { hasAccess: true },
      { new: true },
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "✅ Subscription activated!",
      hasAccess: true,
      user,
    });
  } catch (e) {
    console.error("Subscribe error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
