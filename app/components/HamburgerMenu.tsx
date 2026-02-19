"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { colors } from "../theme/colors";

const COLORS = {
  line: "#FFFFFF",
  lineHover: colors.textPrimary,
  hoverCircle: "#FFFFFF",
};

const LINE_WIDTH = 50;
const LINE_HEIGHT = 1;
const LINE_GAP = 5;
const LINE_BORDER_RADIUS = 2;
const LINE_DELAYS = [0, 0.08, 0.16];

export default function HamburgerMenu() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      aria-label="Open menu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-5 left-5 z-[100] flex items-center justify-center cursor-pointer md:top-8 md:left-8"
      style={{
        width: 55,
        height: 55,
        background: "none",
        border: "none",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Hover circle — desktop only */}
      <motion.span
        className="absolute rounded-full pointer-events-none hidden md:block"
        style={{ width: 70, height: 70, backgroundColor: COLORS.hoverCircle }}
        initial={false}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Lines */}
      <span
        className="relative flex flex-col items-center justify-center"
        style={{ gap: LINE_GAP }}
      >
        {LINE_DELAYS.map((delay, i) => (
          <motion.span
            key={i}
            initial={{ width: 0 }}
            animate={{ width: LINE_WIDTH }}
            transition={{
              duration: 0.5,
              delay: 4.3 + delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              width: LINE_WIDTH,
              height: LINE_HEIGHT,
              borderRadius: LINE_BORDER_RADIUS,
              backgroundColor: isHovered ? COLORS.lineHover : COLORS.line,
              transformOrigin: "center",
              display: "block",
              transition: "background-color 0.25s ease",
            }}
          />
        ))}
      </span>
    </button>
  );
}
