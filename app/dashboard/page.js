import ButtonLogin from "@/components/ButtonLogin";
import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import RandomCatImage from "@/components/RandomCatImage";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/libs/models/user";
import Board from "@/libs/models/boards";

async function getUser() {
  const session = await auth();
  await connectMongo();
  return await User.findOne({ email: session.user.email }).populate("boards");
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <main className="min-h-screen bg-base-200 px-6 py-10">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold">Dashboard 🚀</h1>
        <ButtonLogout />
      </div>
      <section className=" flex flex-col items-center gap-8 space-y-12">
        <div>
          <FormNewBoard />
        </div>
        <div className="max-w-5xl w-full max-w-md mx-auto">
          <h1 className="font-extrabold text-xl mb-4">
            {user.boards.length} Boards
          </h1>
          <ul className="grid grid-cols-1   gap-6">
            {user.boards.map((board) => {
              return (
                <div
                  key={board._id}
                  className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-md hover:text-red-400 "
                >
                  <Link href={`/b/${board._id}`}>{board.name}</Link>
                </div>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
