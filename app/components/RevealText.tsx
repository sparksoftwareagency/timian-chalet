"use client";

import {
  motion,
  Variants,
} from "framer-motion";

type RevealMode = "all" | "word" | "char";

interface RevealTextProps {
  text: string;
  className?: string;
  mode?: RevealMode;
  enabled: boolean; // ✅ v11-safe typing
}

export default function RevealText({
  text,
  className = "text-6xl",
  mode = "all",
  enabled,
}: RevealTextProps) {
  const getContainerVariants = (): Variants => {
    let staggerValue = 0;
    if (mode === "word") staggerValue = 0.05;
    if (mode === "char") staggerValue = 0.02;

    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerValue,
        },
      },
    };
  };

  const childVariants: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const renderContent = () => {
    if (mode === "all") {
      return (
        <span className="block overflow-hidden py-2">
          <motion.span variants={childVariants} className="block">
            {text}
          </motion.span>
        </span>
      );
    }

    if (mode === "word") {
      return text.split(" ").map((word, index, array) => (
        <span key={index} className="inline-block">
          <span className="inline-block overflow-hidden py-1 align-bottom">
            <motion.span variants={childVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
          {index < array.length - 1 && " "}
        </span>
      ));
    }

    if (mode === "char") {
      return text.split("").map((char, index) =>
        char === " " ? (
          <span key={index}> </span>
        ) : (
          <span
            key={index}
            className="inline-block overflow-hidden py-1 align-bottom"
          >
            <motion.span variants={childVariants} className="inline-block">
              {char}
            </motion.span>
          </span>
        )
      );
    }
  };

  return (
    <motion.h1
        key={text}
        variants={getContainerVariants()}
        initial="hidden"
        whileInView={enabled ? "visible" : undefined}
        viewport={{ once: false, amount: 0.3 }}
        className={`font-sans ${className}`}
    >
      {renderContent()}
    </motion.h1>
  );
}