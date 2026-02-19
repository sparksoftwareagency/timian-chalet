"use client";

import { useState, useEffect } from "react";
import { useT } from "../i18n/LanguageContext";
import { tr } from "../i18n/translations";
import { colors } from "../theme/colors";

export default function LoadingState() {
  const t = useT();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: colors.primaryBg }}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full animate-spin" style={{ borderColor: colors.border, borderTopColor: colors.cta }}></div>
        <h2 className="text-2xl font-bold tracking-wider uppercase" style={{ color: colors.accent }}>
          TIMIAN
        </h2>
        <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>{t(tr.loading.text)}</p>
      </div>
    </div>
  );
}
