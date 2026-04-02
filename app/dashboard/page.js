import ButtonLogin from "@/components/ButtonLogin";
import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";

import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/libs/models/user";
import Board from "@/libs/models/boards";
import ButtonCheckout from "@/components/ButtonCheckout";
import ButtonPortal from "@/components/ButtonPortal";

async function getUser() {
  const session = await auth();
  await connectMongo();
  return await User.findOne({ email: session.user.email }).populate("boards");
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <main className="bg-base-200 min-h-screen">
      {/* HEADER */}
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto px-5 py-3 flex justify-between items-center">
          {user.hasAccess ? <ButtonPortal /> : <ButtonCheckout />}
          <ButtonLogout />
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-5 py-12 space-y-12">
        <div>
          <FormNewBoard />
        </div>

        <div className="max-w-5xl w-full max-w-md mx-auto">
          <h1 className="font-extrabold text-xl mb-4">
            {user.boards.length} Boards
          </h1>

          <ul className="grid grid-cols-1 gap-6">
            {user.boards.map((board) => (
              <div
                key={board._id}
                className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-md hover:text-red-400"
              >
                <Link href={`/dashboard/b/${board._id}`}>{board.name}</Link>
              </div>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
