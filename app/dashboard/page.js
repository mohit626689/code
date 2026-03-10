import Link from "next/link";
import ButtonLogin from "@/components/ButtonLogin";

export default function Home() {
  return (
    <main>
      <h1>Start our plan</h1>
      <div>Check your daily task</div>
      <h2>Hey</h2>

      <Link href="/dashboard">welcome</Link>

      <ButtonLogin />
    </main>
  );
}
