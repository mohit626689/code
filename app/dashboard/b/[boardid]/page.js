import { redirect } from "next/navigation";
import Link from "next/link";
import connectMongo from "@/libs/mongoose";
import Board from "@/libs/models/boards";
import CardBoardLink from "@/components/CardBoardLink";
import ButtonBoardDelete from "@/components/ButtonBoardDelete";

async function getBoard(boardId) {
  await connectMongo();
  return await Board.findById(boardId);
}

export default async function FeedbackBoard({ params }) {
  const { boardid } = params;

  const board = await getBoard(boardid);

  if (!board) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-base-200 min-h-screen">
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="btn btn-ghost">
            ← Back
          </Link>
          <ButtonBoardDelete boardId={board._id.toString()} />
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-5 py-12 space-y-12">
        <h1 className="font-extrabold text-xl mb-4">{board.name}</h1>
        <CardBoardLink boardId={board._id} />
      </section>
    </main>
  );
}
