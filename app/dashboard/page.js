"use client";

import ButtonLogin from "@/components/ButtonLogin";
import ButtonLogout from "@/components/ButtonLogout";
import RandomCatImage from "@/components/RandomCatImage";
import FormNewBoard from "@/components/FormNewBoard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-base-200 px-6 py-10">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold">Dashboard 🚀</h1>
        <ButtonLogout />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        <ButtonLogin />
        <FormNewBoard />
        <RandomCatImage />
      </div>
    </main>
  );
}
