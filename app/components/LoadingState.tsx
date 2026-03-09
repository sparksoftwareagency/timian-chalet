"use client";

import { useEffect, useState } from "react";

import { colors } from "@/app/theme/colors";

export default function LoadingState({
  brand,
  text,
}: {
  brand: string;
  text: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: colors.primaryBg }}
    >
      <div className="text-center">
        <div
          className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4"
          style={{ borderColor: colors.border, borderTopColor: colors.cta }}
        />
        <h2
          className="text-2xl font-bold uppercase tracking-wider"
          style={{ color: colors.accent }}
        >
          {brand}
        </h2>
        <p className="mt-2 text-sm" style={{ color: colors.textSecondary }}>
          {text}
        </p>
      </div>
    </div>
  );
}
