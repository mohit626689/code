"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ButtonBoardDelete({ boardId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this board?")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/board?boardId=${boardId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete board");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("DELETE board error:", error);
      alert(error.message);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="btn btn-error"
    >
      {isDeleting ? "Deleting..." : "Delete Board"}
    </button>
  );
}
