import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import connectMongo from "@/libs/mongoose";
import Board from "@/libs/models/boards";
import Post from "@/libs/models/post";

const FormAddPost = dynamic(() => import("@/components/FormAddPost"), {
  ssr: false,
});

import { auth } from "@/auth";

const getData = async (boardId) => {
  await connectMongo();

  const session = await auth();

  const board = await Board.findOne({
    _id: boardId,
    userId: session?.user?.id,
  });
  const posts = await Post.find({ boardId }).sort({ votesCounter: -1 });

  if (!board) {
    notFound();
  }

  return { board, posts };
};

export default async function DashboardBoardPage({ params }) {
  const { boardId } = params;

  const { board, posts } = await getData(boardId);

  return (
    <main className="min-h-screen bg-base-200">
      <section className="max-w-5xl mx-auto p-5">
        <h1 className="text-lg font-bold">{board.name}</h1>
      </section>

      <section className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row gap-8">
        <FormAddPost boardId={boardId} />

        <ul className="space-y-4"></ul>
      </section>
    </main>
  );
}
