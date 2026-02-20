"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
  useAnimation,
} from "framer-motion";
import { useT } from "../i18n/LanguageContext";
import { tr } from "../i18n/translations";
import RevealText from "./RevealText";  

// ==========================================
// ANIMATION & LAYOUT CONFIGURATION
// ==========================================

// 1. Collapsed Video Dimensions (Tweak these to easily change the final size/position)
const COLLAPSED_HEIGHT = "32vh"; // <-- Changed from 45vh to make it less tall
const COLLAPSED_WIDTH = "32vw";
const COLLAPSED_TOP = "42vh";    // <-- You may want to adjust this as you change the height
const COLLAPSED_LEFT = "60vw";

// 2. Scroll Triggers
const ANIMATION_DURATION = 1.9;
const TRIGGER_DOWN_DISTANCE = 120;
const TRIGGER_UP_DISTANCE = 580; 
const SCROLL_JUMP_AMOUNT = 600;

type Phase = "expanded" | "collapsed" | "animating";

export default function Hero() {
  const progress = useMotionValue(0);
  const [phase, setPhase] = useState<Phase>("expanded");
  const isAnimating = useRef(false);
  const t = useT();

  const [heroFinished, setHeroFinished] = useState(false);

  const animateTo = useCallback(
    (target: 0 | 1) => {
      if (isAnimating.current) return;

      isAnimating.current = true;
      setPhase("animating");

      const currentScroll = window.scrollY;
      // If targeting 1 (shrinking), scroll down 300px from current position.
      // If targeting 0 (expanding), push them all the way back to the top (0).
      const targetScroll = target === 1 ? currentScroll + SCROLL_JUMP_AMOUNT : 0;

      // 1. Animate the visual shrinking/expanding
      animate(progress, target, {
        duration: ANIMATION_DURATION,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          isAnimating.current = false;
          setPhase(target === 1 ? "collapsed" : "expanded");
          if (target === 1) {
            setHeroFinished(true); // ✅ unlock text animations
          }
          if (target === 0) {
            setHeroFinished(true); // ✅ lock text animations
          }
        },
      });

      // 2. Animate the window scroll simultaneously
      animate(currentScroll, targetScroll, {
        duration: ANIMATION_DURATION,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => window.scrollTo(0, latest),
      });
    },
    [progress]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (isAnimating.current) return;

      const scrollY = window.scrollY;

      // Scroll down trigger
      if (phase === "expanded" && scrollY > TRIGGER_DOWN_DISTANCE) {
        animateTo(1);
      }

      // Scroll up trigger
      if (phase === "collapsed" && scrollY < TRIGGER_UP_DISTANCE) {
        animateTo(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [phase, animateTo]);

  return (
    <>
      {/* The relative wrapper determines how far the user has to scroll 
        before the video unsticks and scrolls off the screen. 
        150vh gives enough room for the 300px jump plus some scrolling room.
      */}
      <div data-theme="light" style={{ height: "200vh", position: "relative" }}>
        {/* The sticky container pins the video to the screen until the wrapper ends */}
        <div style={{ position: "sticky", top: 0, height: "100vh" }}>
          <HeroVisual progress={progress} />
        </div>

        <div className="flex justify-center items-center" >
          <RevealText text={t(tr.hero.craftedForEscape)} className="text-8xl" mode="word" enabled={heroFinished}/>
        </div>

        <div className="flex justify-center items-center" >
          <RevealText text={t(tr.hero.rootedInNature)} mode="char" enabled={heroFinished}></RevealText>
        </div>
        
        


        <div className="overflow-hidden">
    </div>  

      </div>
    </>
  );
}

function HeroVisual({ progress }: { progress: MotionValue<number> }) {
  // Utilizing the configuration variables directly in the transform hooks
  const width = useTransform(progress, [0, 1], ["100vw", COLLAPSED_WIDTH]);
  const height = useTransform(progress, [0, 1], ["100vh", COLLAPSED_HEIGHT]);
  const left = useTransform(progress, [0, 1], ["0vw", COLLAPSED_LEFT]);
  const top = useTransform(progress, [0, 1], ["0vh", COLLAPSED_TOP]);
  
  const opacity = useTransform(progress, [0, 0.4], [1, 0]);
  const borderFrameOpacity = useTransform(progress, [0.6, 1], [0, 1]);

  return (
    <motion.section
      data-theme="dark"
      style={{
        position: "absolute",
        top,
        left,
        width,
        height,
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      <VideoBackground />

      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        style={{
          opacity: borderFrameOpacity,
        }}
        className="absolute top-2 left-2 right-2 bottom-2 border border-[#D4C4A0] pointer-events-none"
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center"
      >
        <h1 className="text-8xl tracking-[0.35em] uppercase">
          TIMIAN
        </h1>
        <p className="mt-6 text-xl italic">
          Transylvanian Mountain Retreat
        </p>
      </motion.div>
    </motion.section>
  );
}

function VideoBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Timian2.mp4" type="video/mp4" />
      </video>
    </div>
  );
}