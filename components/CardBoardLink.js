"use client";

import toast from "react-hot-toast";

const CardBoardLink = ({ boardId }) => {
  const boardLink = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://codefastsaas.com"
  }/b/${boardId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(boardLink);
    toast.success("Link copied!");
  };

  return (
    <div className="bg-base-100 rounded-3xl text-sm px-4 py-2.5 flex items-center justify-between gap-2">
      <p className="truncate">{boardLink}</p>

      <button
        onClick={copyToClipboard}
        className="btn btn-sm btn-neutral btn-square"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125H6.375A1.125 1.125 0 0 1 5.25 20.625V10.125c0-.621.504-1.125 1.125-1.125H9.75m6 8.25H17.25a1.125 1.125 0 0 0 1.125-1.125V5.625A1.125 1.125 0 0 0 17.25 4.5H9.75A1.125 1.125 0 0 0 8.625 5.625V7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default CardBoardLink;
