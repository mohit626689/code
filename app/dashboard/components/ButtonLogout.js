"use client";

import { signOut } from "next-auth/react";

const ButtonLogout = () => {
  return (
    <button
      className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full font-semibold text-white 
      bg-gradient-to-r from-red-500 to-pink-500 
      shadow-lg hover:shadow-red-500/40 
      transition-all duration-300 
      hover:scale-105 hover:from-pink-500 hover:to-red-500 
      active:scale-95"
      onClick={() => signOut()}
    >
      🚪 Logout
    </button>
  );
};

export default ButtonLogout;
