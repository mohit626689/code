import { NextResponse } from "next/server";
import { Filter } from "bad-words";
import connectMongo from "@/libs/mongoose";
import Post from "@/libs/models/post"; // ✅ FIX PATH
import user from "@/libs/models/user"; // ✅ FIX PATH
import { auth } from "@/auth";

const BadWordsFilter = new Filter();

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description } = body;

    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    if (!boardId) {
      return NextResponse.json(
        { error: "boardId is required" },
        { status: 400 },
      );
    }

    // ✅ sanitize AFTER getting values
    const sanitizedTitle = BadWordsFilter.clean(title || "");
    const sanitizedDescription = BadWordsFilter.clean(description || "");

    // ✅ validation
    if (!sanitizedTitle) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const session = await auth();

    await connectMongo();

    const post = await Post.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      boardId,
      userId: session?.user?.id,
    });

    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
export async fundtion delete(req) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 },
      );
    }

    await connectMongo();

    await Post.findByIdAndDelete(postId);