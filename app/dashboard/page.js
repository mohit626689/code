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

  if (!session?.user?.email) return null;

  await connectMongo();

  let user = await User.findOne({
    email: session.user.email,
  });

  if (!user) {
    // Create user record
    user = new User({
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    });
    await user.save();
  }

  user.boards = await Board.find({ userId: user._id.toString() });

  return user;
}

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    return <div className="text-center mt-10">Please login</div>;
  }

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
        {/* FORM */}
        <div className="flex justify-center">
          <FormNewBoard />
        </div>

        {/* BOARDS */}
        <div className="max-w-md mx-auto w-full">
          <h1 className="font-extrabold text-xl mb-4 text-center">
            {user.boards.length} Boards
          </h1>

          <ul className="grid grid-cols-1 gap-6">
            {user.boards.map((board) => (
              <li
                key={board._id}
                className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-md hover:text-red-400 transition-colors"
              >
                <Link
                  href={`/dashboard/b/${board._id}`}
                  className="block font-medium"
                >
                  {board.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
