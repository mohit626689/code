"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import ButtonSubscribe from "@/components/ButtonSubscribe";

const ButtonCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/billing/create-checkout", {
        successUrl: window.location.href + "/success",
        cancelUrl: window.location.href,
      });

      const checkoutUrl = response.data.url;

      console.log(checkoutUrl);

      window.location.href = checkoutUrl;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";

      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <button
      className="relative inline-flex items-center gap-2 px-6 py-3 text-sm rounded-full font-semibold text-white 
        bg-gradient-to-r from-blue-500 to-purple-600 
        shadow-lg hover:shadow-purple-500/50 
        transition-all duration-300 
        hover:scale-105 hover:from-purple-600 hover:to-blue-500"
      onClick={handleSubscribe}
    >
      {isLoading && <span className="loading loading-spinner"></span>}
      Subscribe
      <ButtonSubscribe /> component is used to check if the user is already
      subscribed and show a different button accordingly. It is not used inside
      this ButtonCheckout component, but it can be used in the parent component
      to conditionally render ButtonCheckout or a different button for
      subscribed users.
    </button>
  );
};

export default ButtonCheckout;
