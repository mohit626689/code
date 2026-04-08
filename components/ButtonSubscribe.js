"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ButtonSubscribe = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/subscribe");

      toast.success("✅ Subscription activated! You can now create boards");

      // ✅ Refresh the page to show new boards
      router.refresh();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";

      if (error?.response?.status === 401) {
        toast.error("Please login first!");
      } else {
        toast.error(errorMessage);
      }

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <button
        onClick={handleSubscribe}
        disabled={isLoading}
        className="btn btn-primary rounded-full px-8 font-semibold"
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-xs"></span>
            Processing...
          </>
        ) : (
          "Subscribe"
        )}
      </button>
    </>
  );
};

export default ButtonSubscribe;
