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
const ROOT_FONT_SIZE_PX = 16;
const WORDMARK_MIN_REM = 12;
const WORDMARK_MAX_REM = 15;
const WORDMARK_VW_FACTOR = 0.12;
const WORDMARK_PROBE_FONT_SIZE_PX = 100;
const TEXT_HEADING_PROBE_FONT_SIZE_PX = 100;
const TEXT_HEADING_WIDTH_FIT_RATIO = 0.9;
const TEXT_HEADING_HEIGHT_FIT_RATIO = 0.9;

function clampWordmarkBoundPx(viewportWidth: number, containerHeight: number): number {
  const minPx = WORDMARK_MIN_REM * ROOT_FONT_SIZE_PX;
  const preferredPx = viewportWidth * WORDMARK_VW_FACTOR;
  const maxPx = WORDMARK_MAX_REM * ROOT_FONT_SIZE_PX;
  const clampPx = Math.min(Math.max(preferredPx, minPx), maxPx);
  return Math.min(clampPx, containerHeight / 2);
}

function fitFontSizeToWidthPx(
  availableWidth: number,
  measuredWidthAtProbe: number,
  maxBoundPx: number,
): number {
  if (availableWidth <= 0 || measuredWidthAtProbe <= 0 || maxBoundPx <= 0) {
    return Math.max(1, maxBoundPx);
  }

  const widthLimitedPx = (availableWidth / measuredWidthAtProbe) * WORDMARK_PROBE_FONT_SIZE_PX;
  return Math.max(1, Math.min(maxBoundPx, widthLimitedPx));
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryMeasureRef = useRef<HTMLSpanElement>(null);
  const secondaryMeasureRef = useRef<HTMLSpanElement>(null);
  const [wordmarkFontSizePx, setWordmarkFontSizePx] = useState(100);

  const recalculateWordmarkFontSize = useCallback(() => {
    const container = containerRef.current;
    const primaryMeasure = primaryMeasureRef.current;
    const secondaryMeasure = secondaryMeasureRef.current;
    if (!container || !primaryMeasure) return;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width <= 0 || containerRect.height <= 0) return;

    const viewportWidth = typeof window === "undefined" ? 0 : window.innerWidth;
    const boundByClampAndHeight = clampWordmarkBoundPx(viewportWidth, containerRect.height);

    const primaryProbeWidth = primaryMeasure.getBoundingClientRect().width;
    const secondaryProbeWidth = secondary
      ? (secondaryMeasure?.getBoundingClientRect().width ?? 0)
      : 0;
    const widestProbeWidth = Math.max(primaryProbeWidth, secondaryProbeWidth);

    const nextFontSizePx = fitFontSizeToWidthPx(
      containerRect.width,
      widestProbeWidth,
      boundByClampAndHeight,
    );
    setWordmarkFontSizePx(nextFontSizePx);
  }, [secondary]);

  useEffect(() => {
    recalculateWordmarkFontSize();
  }, [recalculateWordmarkFontSize, primary, secondary, height]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      recalculateWordmarkFontSize();
    });
    resizeObserver.observe(container);

    window.addEventListener("resize", recalculateWordmarkFontSize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", recalculateWordmarkFontSize);
    };
  }, [recalculateWordmarkFontSize]);

  return (
    <div
      ref={containerRef}
      aria-label={`${primary}${secondary ? ` ${secondary}` : ""}`}
      role="img"
      className="relative flex w-full flex-col items-end justify-evenly overflow-visible text-right"
      style={{ height }}
    >
      <motion.div
        className="whitespace-nowrap font-sans uppercase leading-none"
        initial={{ y: 48, opacity: 0 }}
        animate={
          shouldAnimate ? { y: 0, opacity: 1 } : { y: 48, opacity: 0 }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          color: colors.accent,
          fontSize: `${wordmarkFontSizePx}px`,
          fontWeight: 200,
          letterSpacing: "0.00em",
        }}
      >
        {primary}
      </motion.div>
      {secondary ? (
        <motion.div
          className="whitespace-nowrap font-sans uppercase leading-none"
          initial={{ y: 48, opacity: 0 }}
          animate={
            shouldAnimate ? { y: 0, opacity: 1 } : { y: 48, opacity: 0 }
          }
          transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: colors.accent,
            fontSize: `${wordmarkFontSizePx}px`,
            fontWeight: 150,
            letterSpacing: "0.03em",
          }}
        >
          {secondary}
        </motion.div>
      ) : null}

      <span
        ref={primaryMeasureRef}
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 whitespace-nowrap opacity-0"
        style={{
          fontSize: `${WORDMARK_PROBE_FONT_SIZE_PX}px`,
          fontWeight: 200,
          letterSpacing: "0.00em",
        }}
      >
        {primary}
      </span>
      {secondary ? (
        <span
          ref={secondaryMeasureRef}
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 whitespace-nowrap opacity-0"
          style={{
            fontSize: `${WORDMARK_PROBE_FONT_SIZE_PX}px`,
            fontWeight: 150,
            letterSpacing: "0.03em",
          }}
        >
          {secondary}
        </span>
      ) : null}
    </div>
  );
}

function SvgTextHeading({
  lines,
  height,
  shouldAnimate,
  baseDelay = 0.1,
  align = "left",
}: {
  lines: string[];
  height: string;
  shouldAnimate: boolean;
  baseDelay?: number;
  align?: "left" | "center";
}) {
  const cleanLines = lines.map((line) => line.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim());
  const containerRef = useRef<HTMLDivElement>(null);
  const [textHeadingFontSizePx, setTextHeadingFontSizePx] = useState(100);

  const recalculateTextHeadingFontSize = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width <= 0 || containerRect.height <= 0 || cleanLines.length === 0) return;

    const probeFont = `${TEXT_HEADING_PROBE_FONT_SIZE_PX}px "Inter", "Helvetica Neue", Arial, sans-serif`;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;
    context.font = probeFont;

    const widestProbeWidth = cleanLines.reduce((maxWidth, line) => {
      const width = context.measureText(line).width;
      return Math.max(maxWidth, width);
    }, 0);

    const availableWidth = containerRect.width * TEXT_HEADING_WIDTH_FIT_RATIO;
    const widthLimitedPx =
      widestProbeWidth > 0
        ? (availableWidth / widestProbeWidth) * TEXT_HEADING_PROBE_FONT_SIZE_PX
        : containerRect.height;
    const perLineHeight = containerRect.height / cleanLines.length;
    const heightLimitedPx = perLineHeight * TEXT_HEADING_HEIGHT_FIT_RATIO;
    const nextSize = Math.max(1, Math.min(widthLimitedPx, heightLimitedPx));
    setTextHeadingFontSizePx(nextSize);
  }, [cleanLines]);

  useEffect(() => {
    recalculateTextHeadingFontSize();
  }, [recalculateTextHeadingFontSize, height]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      recalculateTextHeadingFontSize();
    });
    resizeObserver.observe(container);

    window.addEventListener("resize", recalculateTextHeadingFontSize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", recalculateTextHeadingFontSize);
    };
  }, [recalculateTextHeadingFontSize]);

  return (
    <div
      ref={containerRef}
      aria-label={cleanLines.join(" ")}
      role="img"
      className={`flex h-full w-full flex-col justify-evenly overflow-visible ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
      style={{ height }}
    >
      {cleanLines.map((line, index) => (
        <motion.div
          key={`${line}-${index}`}
          className="whitespace-nowrap font-sans uppercase leading-none"
          initial={{ y: 72, opacity: 0 }}
          animate={
            shouldAnimate
              ? { y: 0, opacity: 1 }
              : { y: 72, opacity: 0 }
          }
          transition={{
            duration: 0.9,
            delay: baseDelay + index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            color: SVG_HEADING_TINT,
            fontSize: `${textHeadingFontSizePx}px`,
            fontWeight: 300,
            letterSpacing: cleanLines.length > 1 ? "0.035em" : "0.005em",
            maxWidth: `${TEXT_HEADING_WIDTH_FIT_RATIO * 100}%`,
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
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
    <div data-theme="light" style={{ height: "190vh", position: "relative" }}>
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
          <div className="flex items-center justify-end md:col-start-2 md:col-span-4 md:h-[clamp(12rem,12vw,15rem)]">
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
            className={`md:col-span-5 ${MEDIA_ASPECT} md:aspect-auto md:self-start md:h-[clamp(12rem,12vw,15rem)]`}
          />

          <div
            className={`relative w-full overflow-hidden md:col-span-7`}
          >
            <Image data-theme="dark"
              src={data.heroSecondaryImage.url}
              alt={data.heroSecondaryImage.alt}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex items-center order-4 md:col-span-3 py-4 md:py-6">
            <SvgTextHeading
              lines={[liveLine]} // where
              height="clamp(7rem, 9vw, 13rem)"
              shouldAnimate={showFlowingHeadings}
              align="left"
            />
          </div>

          <div className="flex items-center order-5 md:col-span-10">
            <SvgTextHeading
              lines={[inNatureLine]} // the heart finds home
              height="clamp(7rem, 7vw, 16rem)"
              shouldAnimate={showFlowingHeadings}
              baseDelay={0.2}
              align="center"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
