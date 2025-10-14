"use client";

import { useState, useEffect } from "react";

export default function LoadingState() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading state after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-gray-200 border-t-[#C9A961] rounded-full animate-spin"></div>
        <h2 className="text-2xl font-bold tracking-wider text-[#6B4423] uppercase">
          TIMIAN
        </h2>
        <p className="text-sm text-[#6B5D53] mt-2">Loading your mountain retreat...</p>
      </div>
    </div>
  );
}
