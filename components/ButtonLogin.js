"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, extraStyle }) => {
  const dashboardUrl = "/dashboard";
  if (session) {
    return (
      <Link
        href={dashboardUrl}
        className={`relative inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full font-semibold text-white 
        bg-gradient-to-r from-violet-600 to-indigo-600 
        shadow-lg hover:shadow-violet-500/40 
        transition-all duration-300 
        hover:scale-105 hover:from-indigo-600 hover:to-violet-600 
        ${extraStyle || ""}`}
      >
        👋 Welcome {session.user?.name || "Friend"}
      </Link>
    );
  }

  return (
    <button
      className={`relative inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full font-semibold text-white 
      bg-gradient-to-r from-gray-800 to-black 
      shadow-lg hover:shadow-gray-500/30 
      transition-all duration-300 
      hover:scale-105 hover:from-black hover:to-gray-800 
      ${extraStyle || ""}`}
      onClick={() => {
        signIn("undefined", { callbackUrl: dashboardUrl });
      }}
    >
      🚀 Get Started
    </button>
  );
};

export default ButtonLogin;
