"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const THEMES = {
  light: {
    background: "#1a1a1a", // Dark button for light sections
    text: "#FFFFFF",
    accent: "#C5A059",
  },
  dark: {
    background: "#FFFFFF", // Light button for dark sections
    text: "#1a1a1a",
    accent: "#C5A059",
  },
};

export default function BookNowButton() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const updateThemeFromButtonPosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
    const containing: Array<{ theme: "light" | "dark"; area: number }> = [];

    sections.forEach((section) => {
      const themeAttr = section.getAttribute("data-theme");
      if (themeAttr !== "light" && themeAttr !== "dark") return;

      const sectionRect = section.getBoundingClientRect();
      const inX = centerX >= sectionRect.left && centerX <= sectionRect.right;
      const inY = centerY >= sectionRect.top && centerY <= sectionRect.bottom;
      if (!inX || !inY) return;

      containing.push({ theme: themeAttr, area: sectionRect.width * sectionRect.height });
    });

    if (containing.length > 0) {
      const best = containing.reduce((a, b) => (a.area < b.area ? a : b));
      setTheme(best.theme);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => updateThemeFromButtonPosition(),
      { rootMargin: "0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("[data-theme]");
    sections.forEach((section) => observer.observe(section));

    updateThemeFromButtonPosition();

    window.addEventListener("scroll", updateThemeFromButtonPosition, { passive: true });
    window.addEventListener("resize", updateThemeFromButtonPosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateThemeFromButtonPosition);
      window.removeEventListener("resize", updateThemeFromButtonPosition);
    };
  }, [updateThemeFromButtonPosition]);

  const currentColors = THEMES[theme];


  return (
    <motion.a
      ref={buttonRef}
      href="#book"
      className="fixed top-5 right-5 z-[100] flex items-center justify-center overflow-hidden rounded-full px-2 py-2 text-sm font-medium tracking-[0.15em] shadow-lg transition-colors hover:bg-neutral-50 md:top-8 md:right-8"
      animate={{
        backgroundColor: currentColors.background,
        color: currentColors.text,
      }}
      transition={{ duration: 0.01, ease: "easeInOut" }}
      style={{ textDecoration: "none", WebkitTapHighlightColor: "transparent" }}
      initial="rest"
      whileHover="hover"
    >
      {/* The Animated Arrow Container */}
      <motion.div
        variants={{
          rest: { x: -20, opacity: 0 },
          hover: { x: 0, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mr-2"
      >
        <ArrowRight size={16} color={currentColors.accent} strokeWidth={2} />
      </motion.div>

      {/* The Text Label */}
      <motion.span
        variants={{
          rest: { x: -10 }, // Pull slightly left when no arrow is present
          hover: { x: 0 },
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        book now
      </motion.span>

      {/* Subtle border shine effect */}
      <motion.div
        className="absolute inset-0 rounded-full border border-neutral-200"
        variants={{
          rest: { opacity: 0.5 },
          hover: { opacity: 1, scale: 1.02 },
        }}
      />
    </motion.a>
  );
}