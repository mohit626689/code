"use client";

import ButtonLogin from "@/components/ButtonLogin";
import ButtonLogout from "@/components/ButtonLogout";
import RandomCatImage from "@/components/RandomCatImage";

export default function DashboardPage() {
  return (
    <main className="text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard 🚀</h1>

      <div className="mt-4">
        <ButtonLogin />
      </div>

      <div className="mt-4">
        <ButtonLogout />
      </div>

      <div className="mt-6">
        <RandomCatImage />
      </div>
    </main>
  );
}
