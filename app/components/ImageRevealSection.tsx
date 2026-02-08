"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ImageRevealSectionProps {
  /** Path to the image */
  imageSrc: string;
  /** Alt text for accessibility */
  imageAlt?: string;
  /** Final width of image as fraction of viewport width (0–1). Default: 0.5 */
  scaleX?: number;
  /** Final height of image as fraction of viewport height (0–1). Default: 1 */
  scaleY?: number;
  /** Image focal point X (0–100, maps to object-position %). Default: 50 */
  offsetX?: number;
  /** Image focal point Y (0–100, maps to object-position %). Default: 50 */
  offsetY?: number;
  /** Content displayed alongside the image after the reveal */
  text: React.ReactNode;
  /** Which side the image lands on after shrinking. Default: 'imageLeft' */
  layout?: "imageLeft" | "imageRight";
}

/* Smooth deceleration curve — starts with momentum, settles gracefully */
const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ImageRevealSection({
  imageSrc,
  imageAlt = "",
  scaleX = 0.5,
  scaleY = 1,
  offsetX = 50,
  offsetY = 50,
  text,
  layout = "imageLeft",
}: ImageRevealSectionProps) {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── Trigger: detect the first scroll past this section ── */
  useEffect(() => {
    if (triggered) return;

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      if (el.getBoundingClientRect().top < -2) {
        setTriggered(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [triggered]);

  /* ── Scroll-lock while the animation plays ───────────── */
  useEffect(() => {
    if (!triggered) return;

    const el = sectionRef.current;
    if (!el) return;

    // Snap the section to exactly fill the viewport (imperceptible correction)
    const { top } = el.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + top, behavior: "auto" });

    // Compensate for scrollbar removal so the layout doesn't shift
    const scrollbarW =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarW}px`;

    // Unlock as soon as the main animation settles
    const unlock = setTimeout(() => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }, 1400);

    return () => {
      clearTimeout(unlock);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [triggered]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", backgroundColor: "#FFF8F0" }}
    >
      <div
        className="relative h-full w-full flex items-center"
        style={{
          flexDirection: layout === "imageRight" ? "row-reverse" : "row",
        }}
      >
        {/* ── Image container ─────────────────────────────── */}
        <motion.div
          className="relative shrink-0 overflow-hidden"
          initial={false}
          animate={{
            width: triggered ? `${scaleX * 100}%` : "100%",
            height: triggered ? `${scaleY * 100}%` : "100%",
          }}
          transition={{ duration: 1.4, ease: LUXURY_EASE }}
        >
          {/* Subtle Ken Burns zoom for cinematic depth */}
          <motion.div
            className="absolute inset-0 origin-center"
            initial={false}
            animate={{ scale: triggered ? 1.04 : 1 }}
            transition={{ duration: 2.5, ease: LUXURY_EASE }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
              style={{ objectPosition: `${offsetX}% ${offsetY}%` }}
            />
          </motion.div>
        </motion.div>

        {/* ── Text container ──────────────────────────────── */}
        <motion.div
          className="flex-1 flex items-center justify-center px-8 sm:px-12 lg:px-16 min-w-0 overflow-hidden"
          initial={false}
          animate={{
            opacity: triggered ? 1 : 0,
            y: triggered ? 0 : 30,
          }}
          transition={{ duration: 1, delay: 0.35, ease: LUXURY_EASE }}
        >
          <div className="max-w-lg w-full">{text}</div>
        </motion.div>
      </div>
    </section>
  );
}
