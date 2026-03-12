"use client";

import { useState } from "react";

const FAQListItem = ({ qa }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li>
      {/* Question */}
      <button
        className="py-5 font-semibold border-b w-full text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{qa.question}</p>

        {isOpen ? "-" : "+"}
      </button>

      {/* Answer */}
      <div className={`${isOpen ? "block" : "hidden"} mt-3 mb-6`}>
        {qa.answer}
      </div>
    </li>
  );
};

export default FAQListItem;
