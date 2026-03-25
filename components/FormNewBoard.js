"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const FormNewBoard = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await axios.post("/api/board", { name });
      setName("");
      toast.succss("board create");

      router.refresh();

      // 2. Redirect to dedicated board page
    } catch (error) {
      const errorMessage =
        error.response.data || error.Message || "something went wrong";
      toast.error("something went wrong");
      // 1. Display error message
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-base-100 p-8 rounded-3xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create a new feedback board
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text font-semibold">Board name</span>
          </label>

          <input
            required
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered border-2 border-gray-300
            focus:border-purple-500 w-full max-w-md
            focus:ring-2 focus:ring-purple-300 w-full"
          />
        </div>

        <button
          className="px-8 py-3 rounded-full text-white font-semibold text-lg
          bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg
          hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          type="submit"
        >
          {isLoading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {isLoading ? "Creating..." : "Create Board"}
        </button>
      </form>
    </div>
  );
};

export default FormNewBoard;
