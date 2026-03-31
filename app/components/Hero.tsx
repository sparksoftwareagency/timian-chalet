"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  HERO_SCROLL_VIEWPORT_MULT_LANDING,
  heroScrollStepPx,
} from "@/app/lib/heroScrollStep";
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
  heroRootedLine: string;
  heroInNatureLine: string;
};

const FLUID_HEADING = "clamp(1.5rem, 3vw + 0.75rem, 4.5rem)";
const MEDIA_ASPECT = "aspect-[5/2]";

export default function Hero({ data }: { data: HeroData }) {
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
              className="font-sans uppercase tracking-[0.25em]"
              style={{ fontSize: "clamp(2rem, 6vw + 0.5rem, 6rem)" }}
            >
              {data.heroTitle}
            </h1>
            <p
              className="mt-4 sm:mt-6 font-sans italic"
              style={{ fontSize: "clamp(1rem, 1.5vw + 0.5rem, 1.5rem)" }}
            >
              {data.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Grid content — in normal document flow below the sticky area.
          Scrolls into the viewport naturally as the page scrolls during animation. */}
      <motion.div style={{ opacity: contentOpacity }}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 ${pageShell} py-6 md:py-10`}>
          <div className="flex items-center order-2 md:order-1 py-6 md:py-12">
            <h2
              className="font-sans leading-tight"
              style={{ fontSize: FLUID_HEADING }}
            >
              {data.heroCraftedLine}
            </h2>
          </div>

          {/* Empty placeholder — the video in the sticky layer overlays this cell */}
          <div
            ref={videoCellRef}
            className={`order-1 md:order-2 ${MEDIA_ASPECT} md:aspect-auto`}
          />

          <div
            className={`relative w-full overflow-hidden order-3 ${MEDIA_ASPECT} md:aspect-auto`}
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

          <div className="flex items-center order-4 py-6 md:py-12">
            <div>
              <h2
                className="font-sans leading-tight"
                style={{ fontSize: FLUID_HEADING }}
              >
                {data.heroRootedLine}
              </h2>
              <h2
                className="font-sans leading-tight"
                style={{ fontSize: FLUID_HEADING }}
              >
                {data.heroInNatureLine}
              </h2>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
