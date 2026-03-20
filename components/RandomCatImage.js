"use client";

import { useState } from "react";

const RandomCatImage = () => {
  const [status, setStatus] = useState("Idle");
  const [imageUrl, setImageUrl] = useState(
    "https://cdn2.thecatapi.com/images/b5f.gif",
  );

  const getNewImage = async () => {
    setStatus("Loading");
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search",
      );

      const data = await response.json();

      setImageUrl(data[0].url);
      setStatus("Success ✅");
    } catch (error) {
      setStatus("Oops 😅");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <img src={imageUrl} className="w-64 rounded-xl" />
      <p>Status: {status}</p>

      <button
        onClick={getNewImage}
        className="mt-4 px-6 py-2.5 rounded-full text-white font-semibold
  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
  shadow-md hover:shadow-xl
  hover:scale-105 active:scale-95
  transition-all duration-300 ease-in-out"
      >
        🐱 Get New Cat
      </button>
    </div>
  );
};

export default RandomCatImage;
