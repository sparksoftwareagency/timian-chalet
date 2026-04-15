"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  HERO_SCROLL_VIEWPORT_MULT_LANDING,
  heroScrollStepPx,
} from "@/app/lib/heroScrollStep";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";

const ANIMATION_DURATION = 1.9;
const TRIGGER_DOWN_DISTANCE = 1;
/** Shrink the “collapsed” scroll threshold slightly below the snap distance to avoid expand/collapse thrashing. */
const TRIGGER_UP_OFFSET = 10;

function triggerUpThreshold(): number {
  return Math.max(
    TRIGGER_DOWN_DISTANCE,
    heroScrollStepPx(HERO_SCROLL_VIEWPORT_MULT_LANDING) - TRIGGER_UP_OFFSET,
  );
}

type Phase = "expanded" | "collapsed" | "animating";

type HeroData = {
  heroTitle: string;
  heroSubtitle: string;
  heroVideoUrl: string;
  heroSecondaryImage: { url: string; alt: string };
  heroCraftedLine: string;
  heroCraftedLineSmall: string;
  heroRootedLine: string;
  heroInNatureLine: string;
};

const MEDIA_ASPECT = "aspect-[5/2]";
const SVG_HEADING_TINT = "rgba(118, 109, 103, 0.45)";

function splitPrimaryAndSecondary(line: string): { primary: string; secondary: string } {
  const clean = line.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();
  const words = clean.split(" ").filter(Boolean);

  if (words.length >= 3) {
    return {
      primary: words.slice(0, -1).join(" "),
      secondary: words.slice(-1).join(" "),
    };
  }

  return { primary: clean, secondary: "" };
}

function SvgWordmarkHeading({
  primary,
  secondary,
  height,
  shouldAnimate,
}: {
  primary: string;
  secondary: string;
  height: string;
  shouldAnimate: boolean;
}) {
  return (
    <svg
      aria-label={`${primary}${secondary ? ` ${secondary}` : ""}`}
      role="img"
      width="100%"
      height={height}
      viewBox="0 0 1200 510"
      preserveAspectRatio="xMinYMid meet"
      className="block overflow-visible"
    >
      <motion.text
        x="0"
        y="100"
        className="font-sans uppercase leading-none"
        initial={{ y: 240, opacity: 0 }}
        animate={shouldAnimate ? { y: 160, opacity: 1 } : { y: 240, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fill: SVG_HEADING_TINT,
          fontSize: "240px",
          fontWeight: 300,
          letterSpacing: "0.00em",
        }}
      >
        {primary}
      </motion.text>
      {secondary ? (
        <motion.text
          x="990"
          y="160"
          className="font-sans uppercase leading-none"
          initial={{ y: 260, opacity: 0 }}
          animate={shouldAnimate ? { y: 200, opacity: 1 } : { y: 260, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fill: colors.accent,
            fontSize: "82px",
            fontWeight: 500,
            letterSpacing: "0.03em",
          }}
        >
          {secondary}
        </motion.text>
      ) : null}
    </svg>
  );
}

function SvgTextHeading({
  lines,
  height,
  stretchToWidth = false,
  shouldAnimate,
  baseDelay = 0.1,
  singleLineFontSize = "400px",
  x = 0,
}: {
  lines: string[];
  height: string;
  stretchToWidth?: boolean;
  shouldAnimate: boolean;
  baseDelay?: number;
  singleLineFontSize?: string;
  x?: number | string;
}) {
  const cleanLines = lines.map((line) => line.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim());
  const viewBoxHeight = cleanLines.length > 1 ? 220 : 220;
  const firstLineY = cleanLines.length > 1 ? 120 : 130;
  const lineGap = 136;

  return (
    <svg
      aria-label={cleanLines.join(" ")}
      role="img"
      width="100%"
      height={height}
      viewBox={`0 0 1200 ${viewBoxHeight}`}
      preserveAspectRatio="xMinYMid meet"
      className="block overflow-visible"
    >
      {cleanLines.map((line, index) => (
        <motion.text
          key={`${line}-${index}`}
          x={x}
          y={firstLineY + index * lineGap}
          {...(stretchToWidth
            ? {
                textLength: "1120",
                lengthAdjust: "spacing" as const,
              }
            : {})}
          className="font-sans uppercase leading-none"
          initial={{ y: firstLineY + index * lineGap + 72, opacity: 0 }}
          animate={
            shouldAnimate
              ? { y: firstLineY + index * lineGap, opacity: 1 }
              : { y: firstLineY + index * lineGap + 72, opacity: 0 }
          }
          transition={{
            duration: 0.9,
            delay: baseDelay + index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            fill: SVG_HEADING_TINT,
            fontSize: cleanLines.length > 1 ? "138px" : singleLineFontSize,
            fontWeight: 300,
            letterSpacing: cleanLines.length > 1 ? "0.035em" : "0.005em",
          }}
        >
          {line}
        </motion.text>
      ))}
    </svg>
  );
}

export default function Hero({ data }: { data: HeroData }) {
  const craftedPrimary = data.heroCraftedLine.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();
  const craftedSecondary = data.heroCraftedLineSmall?.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();
  const fallbackCraftedParts = splitPrimaryAndSecondary(data.heroCraftedLine);
  const craftedParts = {
    primary: craftedPrimary || fallbackCraftedParts.primary,
    secondary: craftedSecondary || fallbackCraftedParts.secondary,
  };
  const liveLine = data.heroRootedLine.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();
  const inNatureLine = data.heroInNatureLine.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();

  const progress = useMotionValue(0);
  const [phase, setPhase] = useState<Phase>("expanded");
  const isAnimating = useRef(false);

  const stickyRef = useRef<HTMLDivElement>(null);
  const videoCellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  // On every frame, position the video between fullscreen and
  // the grid cell's *current* viewport rect (which moves as the page scrolls).
  useEffect(() => {
    let raf: number;
    const sync = () => {
      const p = progress.get();
      const video = videoRef.current;
      const sticky = stickyRef.current;
      const cell = videoCellRef.current;

      if (video && sticky && cell) {
        const s = sticky.getBoundingClientRect();
        const c = cell.getBoundingClientRect();
        const tLeft = c.left - s.left;
        const tTop = c.top - s.top;

        video.style.left = `${p * tLeft}px`;
        video.style.top = `${p * tTop}px`;
        video.style.width = `${s.width + p * (c.width - s.width)}px`;
        video.style.height = `${s.height + p * (c.height - s.height)}px`;

      }
      raf = requestAnimationFrame(sync);
    };
    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  const animateTo = useCallback(
    (target: 0 | 1) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      setPhase("animating");

      const currentScroll = window.scrollY;
      const targetScroll =
        target === 1
          ? currentScroll + heroScrollStepPx(HERO_SCROLL_VIEWPORT_MULT_LANDING)
          : 0;

      animate(progress, target, {
        duration: ANIMATION_DURATION,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          isAnimating.current = false;
          setPhase(target === 1 ? "collapsed" : "expanded");
        },
      });

      animate(currentScroll, targetScroll, {
        duration: ANIMATION_DURATION,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => window.scrollTo(0, v),
      });
    },
    [progress],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (isAnimating.current) return;
      const scrollY = window.scrollY;
      if (phase === "expanded" && scrollY > TRIGGER_DOWN_DISTANCE)
        animateTo(1);
      if (phase === "collapsed" && scrollY < triggerUpThreshold())
        animateTo(0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [phase, animateTo]);

  const contentOpacity = useTransform(progress, [0.4, 1], [0, 1]);
  const titleOpacity = useTransform(progress, [0, 0.4], [1, 0]);
  const showFlowingHeadings = phase === "collapsed";

  return (
    <div data-theme="light" style={{ height: "200vh", position: "relative" }}>
      {/* Sticky layer — pinned to viewport top while inside the 190vh container */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Video overlay — rAF loop sets its position/size */}
        <div
          ref={videoRef}
          data-theme="dark"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          <video
            ref={videoElementRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={data.heroVideoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            style={{ opacity: titleOpacity }}
            className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4"
          >
            <h1
              className="font-serif font-light uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(2.5rem, 5.2vw + 0.75rem, 6rem)" }}
            >
              {data.heroTitle}
            </h1>
            <p
              className="mt-4 max-w-2xl font-light leading-relaxed text-white/80 sm:mt-6"
              style={{ fontSize: "clamp(1.05rem, 1.25vw + 0.55rem, 1.5rem)" }}
            >
              {data.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Grid content — in normal document flow below the sticky area.
          Scrolls into the viewport naturally as the page scrolls during animation. */}
      <motion.div style={{ opacity: contentOpacity }}>
        <div className={`grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-6 lg:gap-8 ${pageShell} py-4 md:py-10`}>
          <div className="flex items-center order-2 md:order-none md:col-span-5">
            <SvgWordmarkHeading
              primary={craftedParts.primary} // the timian
              secondary={craftedParts.secondary} // feeling
              height="clamp(8rem, 18vw, 16rem)"
              shouldAnimate={showFlowingHeadings}
            />
          </div>

          {/* Empty placeholder — the video in the sticky layer overlays this cell */}
          <div
            ref={videoCellRef}
            className={`order-1 md:order-none md:col-span-5 ${MEDIA_ASPECT} md:aspect-auto md:self-start md:h-[clamp(12rem,10vw,15rem)]`}
          />

          <div
            className={`relative w-full overflow-hidden order-3 md:col-span-7 ${MEDIA_ASPECT} md:aspect-auto`}
          >
            <Image
              src={data.heroSecondaryImage.url}
              alt={data.heroSecondaryImage.alt}
              fill
              className="object-cover"
              style={{ objectPosition: "50% 75%" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex items-center order-4 md:col-span-3 py-4 md:py-6">
            <SvgTextHeading
              lines={[liveLine]} // where
              height="clamp(7rem, 9vw, 13rem)"
              stretchToWidth
              shouldAnimate={showFlowingHeadings}
              singleLineFontSize="280px"
            />
          </div>

          <div className="flex items-center order-5 md:col-span-10 -mt-14 md:-mt-16">
            <SvgTextHeading
              lines={[inNatureLine]} // the heart finds home
              height="clamp(7rem, 7vw, 16rem)"
              shouldAnimate={showFlowingHeadings}
              baseDelay={0.2}
              singleLineFontSize="170px"
              x="180"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
