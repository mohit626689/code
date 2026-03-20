"use client";

import { signOut } from "next-auth/react";

const ButtonLogout = () => {
  return (
    <button
      className="px-5 py-2 rounded-full text-white font-semibold
      bg-gradient-to-r from-red-500 to-pink-500
      hover:scale-105 active:scale-95
      transition-all duration-300 shadow-md"
      onClick={() => signOut()}
    >
      🚪 Logout
    </button>
  );
};

export default ButtonLogout;
