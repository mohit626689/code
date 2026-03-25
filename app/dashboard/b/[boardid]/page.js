import connectMongo from "@/libs/mongoose";
import { redirect } from "next/navigation";
import Board from "@/libs/models/boards";
import { auth } from "@/auth";

const getBoard = async (boardId) => {
  const session = await auth();

  await connectMongo();

  const board = await Board.findOne({
    _id: boardId,
    userId: session?.user?.id,
  });

  return board;
};

export default async function FeedbackBoard({ params }) {
  const { boardId } = params;

  const board = await getBoard(boardId);

  return <main>{board.name}</main>;
}
