"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const ButtonDeletePost = ({ postId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePost = async () => {
    const isUserSure = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!isUserSure) return;

    setIsDeleting(true);

    try {
      await axios.delete(`/api/post?postId=${postId}`);

      toast.success("Post deleted!");

      router.refresh();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className="btn btn-ghost flex items-center gap-2"
      onClick={handleDeletePost}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M8.75 3.75a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 .75.75V5h3.25a.75.75 0 0 1 0 1.5h-.638l-.72 9.447A2.25 2.25 0 0 1 10.9 18H9.1a2.25 2.25 0 0 1-2.242-2.053L6.138 6.5H5.5a.75.75 0 0 1 0-1.5H8.75V3.75Zm1.5 0V5h-1.5V3.75h1.5ZM8.22 6.5l.67 9.25a.75.75 0 0 0 .748.75h.724a.75.75 0 0 0 .748-.75l.67-9.25H8.22Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      Delete
    </button>
  );
};

export default ButtonDeletePost;
