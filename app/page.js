import Link from "next/link";
import ButtonLogin from "../components/ButtonLogin";

export default function Home() {
  const Isloggedin = true;

  return (
    <section className="text-center py-16 p-6 max-w-72 mx-auto">
      <main>
        <h1 className="text-6xl font -extrabold mb-3">Suru kro</h1>

        <div className="text-2xl">do work</div>
        <h2>what happen</h2>

        <Link href="/dashboard">Dashboard</Link>

        <ButtonLogin Isloggedin={Isloggedin} />
      </main>
    </section>
  );
}
