import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Board from "@/libs/models/boards";

export async function POST(req) {
  try {
    await connectMongo();

    const body = await req.json();
    const { name } = body;

    console.log("Received:", name);

    const board = await Board.create({
      name,
    });

    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { message: "Error creating board" },
      { status: 500 },
    );
  }
}
