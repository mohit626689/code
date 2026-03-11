import Link from "next/link";
import ButtonLogin from "@/components/ButtonLogin";

export default function Home() {
  return (
    <main>
      <section className="text-center p-6">
        <h1 className="font-extrabold p-6">Start our plan</h1>
        <div className="font-semibold p-3">Check your daily task</div>
        <h2>Hey</h2>

        <Link href="/dashboard"> </Link>

        <ButtonLogin />
      </section>
    </main>
  );
}
