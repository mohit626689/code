"use client";

import ButtonLogin from "@/components/ButtonLogin";
import ButtonLogout from "@/components/ButtonLogout";
import RandomCatImage from "@/components/RandomCatImage";
import FromNewBoard from "@/components/FromNewBoard";

export default function DashboardPage() {
  return (
    <main className="text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard 🚀</h1>

      <div className="mt-4 bg-base-200 min-h-screen">
        <ButtonLogin />
        <FromNewBoard />
      </div>
      <section>
        <div className="mt-4 max-w-5 mx-auto  bg-base-100 px-5 py-3 flex justify-end">
          <ButtonLogout />
        </div>
      </section>
      <section className="max-w-5 mx-auto px-5 py-12">
        <FromNewBoard />
      </section>
      <div className="mt-6">
        <RandomCatImage />
      </div>
    </main>
  );
}
