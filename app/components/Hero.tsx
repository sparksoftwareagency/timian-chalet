"use client";

import Image from "next/image";
import { MotionValue, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const COLLAPSED_HEIGHT = "30vh";
const COLLAPSED_WIDTH = "46vw";
const COLLAPSED_TOP = "14vh";
const COLLAPSED_LEFT = "50vw";
const ANIMATION_DURATION = 1.9;
const TRIGGER_DOWN_DISTANCE = 120;
const TRIGGER_UP_DISTANCE = 590;
const SCROLL_JUMP_AMOUNT = 600;

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

export default function Hero({ data }: { data: HeroData }) {
  const progress = useMotionValue(0);
  const [phase, setPhase] = useState<Phase>("expanded");
  const isAnimating = useRef(false);
  const [heroFinished, setHeroFinished] = useState(false);

  const animateTo = useCallback(
    (target: 0 | 1) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      setPhase("animating");

      const currentScroll = window.scrollY;
      const targetScroll = target === 1 ? currentScroll + SCROLL_JUMP_AMOUNT : 0;

      animate(progress, target, {
        duration: ANIMATION_DURATION,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          isAnimating.current = false;
          setPhase(target === 1 ? "collapsed" : "expanded");
          setHeroFinished(true);
        },
      });

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
      if (phase === "expanded" && scrollY > TRIGGER_DOWN_DISTANCE) animateTo(1);
      if (phase === "collapsed" && scrollY < TRIGGER_UP_DISTANCE) animateTo(0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [phase, animateTo]);

  return (
    <div data-theme="light" style={{ height: "190vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh" }}>
        <HeroVisual progress={progress} data={data} />
      </div>

      <div className="flex items-center pl-10 pt-14 md:pl-40">
        <h2 className={`font-sans text-5xl md:text-8xl ${heroFinished ? "opacity-100" : "opacity-0"} transition-opacity`}>
          {data.heroCraftedLine}
        </h2>
      </div>

      <div className="absolute right-0 flex translate-y-10 items-center gap-10 pr-10 pt-20 md:pr-40 md:pt-30">
        <div className="relative h-[30vh] w-[52vw] flex-shrink-0 overflow-hidden">
          <Image
            src={data.heroSecondaryImage.url}
            alt={data.heroSecondaryImage.alt}
            fill
            className="object-cover"
            style={{ objectPosition: "50% 75%" }}
          />
        </div>
        <div>
          <h2 className={`font-sans text-5xl md:text-8xl ${heroFinished ? "opacity-100" : "opacity-0"} transition-opacity`}>
            {data.heroRootedLine}
          </h2>
          <h2 className={`font-sans text-5xl md:text-8xl ${heroFinished ? "opacity-100" : "opacity-0"} transition-opacity`}>
            {data.heroInNatureLine}
          </h2>
        </div>
      </div>
    </div>
  );
}

function HeroVisual({
  progress,
  data,
}: {
  progress: MotionValue<number>;
  data: HeroData;
}) {
  const width = useTransform(progress, [0, 1], ["100vw", COLLAPSED_WIDTH]);
  const height = useTransform(progress, [0, 1], ["100vh", COLLAPSED_HEIGHT]);
  const left = useTransform(progress, [0, 1], ["0vw", COLLAPSED_LEFT]);
  const top = useTransform(progress, [0, 1], ["0vh", COLLAPSED_TOP]);
  const opacity = useTransform(progress, [0, 0.4], [1, 0]);

  return (
    <motion.section
      data-theme="dark"
      style={{ position: "absolute", top, left, width, height, zIndex: 50, overflow: "hidden" }}
    >
      <div className="absolute inset-0 -z-10">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src={data.heroVideoUrl} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-black/40" />
      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="font-sans text-6xl uppercase tracking-[0.25em] md:text-8xl">{data.heroTitle}</h1>
        <p className="mt-6 text-xl italic font-sans">{data.heroSubtitle}</p>
      </motion.div>
    </motion.section>
  );
}
