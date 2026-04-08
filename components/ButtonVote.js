"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ButtonVote({ postId, initialVotesCounter = 0 }) {
  const localStorageKeyName = `codefastSaas-hasVoted-${postId}`;

  const [hasVoted, setHasVoted] = useState(false);
  const [votesCounter, setVotesCounter] = useState(initialVotesCounter);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ FIX: localStorage inside useEffect (client only)
  useEffect(() => {
    const storedVote = localStorage.getItem(localStorageKeyName);
    setHasVoted(storedVote === "true");
  }, [localStorageKeyName]);

  const handleVote = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (hasVoted) {
        await axios.delete(`/api/vote?postId=${postId}`);

        setHasVoted(false);
        setVotesCounter(votesCounter - 1);

        localStorage.removeItem(localStorageKeyName);
      } else {
        await axios.post(`/api/vote?postId=${postId}`);

        setHasVoted(true);
        setVotesCounter(votesCounter + 1);

        localStorage.setItem(localStorageKeyName, "true");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`group border px-4 py-2 rounded-xl text-lg flex flex-col items-center ${
        hasVoted
          ? "bg-primary text-primary-content border-transparent"
          : "bg-base-100 text-base-content hover:bg-gray-100"
      }`}
      onClick={handleVote}
    >
      {/* Arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={hasVoted ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 transition-transform group-hover:-translate-y-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75 12 7.5l7.5 8.25"
        />
      </svg>

      <div className="text-sm font-semibold">{votesCounter}</div>
    </button>
  );
}
