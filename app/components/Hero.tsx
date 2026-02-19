"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";

type AnimationPhase = "initial" | "animating" | "complete" | "scrolling";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<AnimationPhase>("initial");
  const progress = useMotionValue(0);
  
  // Track scroll offset for "scrolling away" effect
  const scrollOffset = useMotionValue(0);
  const animationEndScrollY = useRef(0);
  
  // Lock to prevent multiple simultaneous scroll triggers
  const isAnimatingRef = useRef(false);
  const touchStartY = useRef(0);
  
  // Accumulated scroll delta for touchpad detection
  const accumulatedDelta = useRef(0);
  const deltaResetTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Animation configuration
  const ANIMATION_DURATION = 1.2; // seconds
  const SCROLL_THRESHOLD = 50; // accumulated pixels to trigger

  // Transform values based on progress (0 -> 1)
  // Final position: top-right area, smaller size
  // Use width/height percentages instead of scale to avoid stretching content
  const widthPercent = useTransform(progress, [0, 1], [100, 48]); // 100% -> 30% of viewport width
  const heightPercent = useTransform(progress, [0, 1], [100, 45]); // 100% -> 30% of viewport height
  const xPercent = useTransform(progress, [0, 1], [0, 50]); // Move to right (in % of viewport)
  const yPercent = useTransform(progress, [0, 1], [0, 9]); // Move down slightly from top
  const contentOpacity = useTransform(progress, [0, 0.4], [1, 0]);
  const borderRadius = useTransform(progress, [0, 1], [0, 0]);
  const borderFrameOpacity = useTransform(progress, [0.6, 1], [0, 1]);

  // Animate forward (scroll down)
  const animateForward = useCallback(() => {
    if (isAnimatingRef.current || phase === "complete" || phase === "scrolling") return;
    
    isAnimatingRef.current = true;
    setPhase("animating");

    const startScroll = window.scrollY;
    const targetScroll = window.innerHeight;

    animate(progress, 1, {
      duration: ANIMATION_DURATION,
      ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier
      onUpdate: (latest) => {
        // Synchronize scroll position with animation progress
        const newScroll = startScroll + (targetScroll - startScroll) * latest;
        window.scrollTo({ top: newScroll, behavior: "auto" });
      },
      onComplete: () => {
        setPhase("complete");
        isAnimatingRef.current = false;
        
        // Record scroll position when animation ends
        animationEndScrollY.current = window.scrollY;
        scrollOffset.set(0);
        
        // Brief pause, then allow normal scrolling
        setTimeout(() => {
          setPhase("scrolling");
        }, 150);
      },
    });
  }, [phase, progress, scrollOffset, ANIMATION_DURATION]);

  // Animate backward (scroll up)
  const animateBackward = useCallback(() => {
    if (isAnimatingRef.current || phase === "initial" || phase === "animating") return;
    
    isAnimatingRef.current = true;
    setPhase("animating");

    const currentScroll = window.scrollY;
    const targetEndScroll = animationEndScrollY.current;
    
    // First, if we've scrolled past the animation end point, scroll back to it
    // This resets the scrollOffset naturally before we animate
    if (currentScroll > targetEndScroll) {
      // Quick scroll back to animation end point
      animate(scrollOffset, 0, {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: () => {
          const newScroll = targetEndScroll + scrollOffset.get();
          window.scrollTo({ top: newScroll, behavior: "auto" });
        },
        onComplete: () => {
          // Now animate the hero back to full screen
          animateHeroBack(targetEndScroll);
        },
      });
    } else {
      // Already at or near the animation end point
      scrollOffset.set(0);
      animateHeroBack(currentScroll);
    }
    
    function animateHeroBack(startScroll: number) {
      animate(progress, 0, {
        duration: ANIMATION_DURATION,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (latest) => {
          // Synchronize scroll position with animation progress
          const newScroll = startScroll * latest;
          window.scrollTo({ top: newScroll, behavior: "auto" });
        },
        onComplete: () => {
          setPhase("initial");
          isAnimatingRef.current = false;
          scrollOffset.set(0);
          window.scrollTo({ top: 0, behavior: "auto" });
        },
      });
    }
  }, [phase, progress, scrollOffset, ANIMATION_DURATION]);

  // Handle wheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // During animation, prevent all scroll
      if (phase === "animating") {
        e.preventDefault();
        return;
      }
      
      // Accumulate delta for touchpad support
      accumulatedDelta.current += e.deltaY;
      
      // Reset accumulated delta after a short pause (end of scroll gesture)
      if (deltaResetTimeout.current) {
        clearTimeout(deltaResetTimeout.current);
      }
      deltaResetTimeout.current = setTimeout(() => {
        accumulatedDelta.current = 0;
      }, 150);
      
      // In initial phase, prevent default and trigger forward animation
      if (phase === "initial") {
        e.preventDefault();
        if (accumulatedDelta.current > SCROLL_THRESHOLD) {
          accumulatedDelta.current = 0;
          animateForward();
        }
        return;
      }
      
      // In scrolling phase, check if we should reverse when near the top
      if (phase === "scrolling" && window.scrollY <= window.innerHeight * 1.2) {
        if (accumulatedDelta.current < -SCROLL_THRESHOLD) {
          e.preventDefault();
          accumulatedDelta.current = 0;
          animateBackward();
          return;
        }
      }
      
      // In complete phase, prevent scroll
      if (phase === "complete") {
        e.preventDefault();
        return;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (deltaResetTimeout.current) {
        clearTimeout(deltaResetTimeout.current);
      }
    };
  }, [phase, animateForward, animateBackward]);

  // Handle touch events
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;

      // In initial phase, trigger forward animation on swipe up
      if (phase === "initial" && deltaY > SCROLL_THRESHOLD) {
        e.preventDefault();
        animateForward();
        touchStartY.current = touchY;
        return;
      }

      // In scrolling phase, check if we should reverse
      if (phase === "scrolling" && window.scrollY <= window.innerHeight * 1.1) {
        if (deltaY < -SCROLL_THRESHOLD) {
          e.preventDefault();
          animateBackward();
          touchStartY.current = touchY;
          return;
        }
      }

      // During animation, prevent scroll
      if (phase === "animating") {
        e.preventDefault();
        return;
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [phase, animateForward, animateBackward]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollDownKeys = ["ArrowDown", "PageDown", "Space", " "];
      const scrollUpKeys = ["ArrowUp", "PageUp"];
      
      // In initial phase, trigger forward animation on down keys
      if (phase === "initial" && scrollDownKeys.includes(e.key)) {
        e.preventDefault();
        animateForward();
        return;
      }

      // In scrolling phase, check if we should reverse
      if (phase === "scrolling" && window.scrollY <= window.innerHeight * 1.1) {
        if (scrollUpKeys.includes(e.key)) {
          e.preventDefault();
          animateBackward();
          return;
        }
      }

      // During animation, prevent all scroll keys
      if (phase === "animating") {
        if ([...scrollDownKeys, ...scrollUpKeys].includes(e.key)) {
          e.preventDefault();
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, animateForward, animateBackward]);

  // Prevent default scroll in initial and complete phases
  useEffect(() => {
    if (phase !== "initial" && phase !== "complete") return;
    
    const handleScroll = () => {
      if (phase === "initial" && window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      if (phase === "complete") {
        // Keep scroll at the animation end position
        window.scrollTo({ top: animationEndScrollY.current, behavior: "auto" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [phase]);

  // Track scroll offset in scrolling phase to make hero scroll away
  useEffect(() => {
    if (phase !== "scrolling") return;

    const handleScroll = () => {
      // Calculate how much we've scrolled past the animation end point
      const offset = window.scrollY - animationEndScrollY.current;
      scrollOffset.set(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [phase, scrollOffset]);

  return (
    <>
      {/* Spacer div - always present to maintain document flow */}
      <div style={{ height: "100vh" }} />
      
      <HeroVisual
        containerRef={containerRef}
        widthPercent={widthPercent}
        heightPercent={heightPercent}
        xPercent={xPercent}
        yPercent={yPercent}
        scrollOffset={scrollOffset}
        contentOpacity={contentOpacity}
        borderRadius={borderRadius}
        borderFrameOpacity={borderFrameOpacity}
      />
    </>
  );
}

interface HeroVisualProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  widthPercent: MotionValue<number>;
  heightPercent: MotionValue<number>;
  xPercent: MotionValue<number>;
  yPercent: MotionValue<number>;
  scrollOffset: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  borderRadius: MotionValue<number>;
  borderFrameOpacity: MotionValue<number>;
}

function HeroVisual({
  containerRef,
  widthPercent,
  heightPercent,
  xPercent,
  yPercent,
  scrollOffset,
  contentOpacity,
  borderRadius,
  borderFrameOpacity,
}: HeroVisualProps) {
  // Transform motion values to CSS values
  const width = useTransform(widthPercent, (v) => `${v}vw`);
  const height = useTransform(heightPercent, (v) => `${v}vh`);
  const left = useTransform(xPercent, (v) => `${v}vw`);
  
  // Combine yPercent with scrollOffset for the scroll-away effect
  const top = useTransform(
    [yPercent, scrollOffset] as MotionValue[],
    ([yPct, offset]: number[]) => `calc(${yPct}vh - ${offset}px)`
  );

  return (
    <motion.section
      data-theme="dark"
      ref={containerRef}
      id="top"
      className="overflow-hidden"
      style={{
        position: "fixed",
        top,
        left,
        width,
        height,
        borderRadius,
        zIndex: 40,
      }}
    >
        <VideoBackground/>

        <div className="absolute inset-0 bg-black/40" />

        {/* Decorative inset border frame (Ritz-Carlton style) */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{
            opacity: borderFrameOpacity,
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
            border: "1px solid #D4C4A0",
          }}
        />

        <motion.div
          className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center"
          style={{ opacity: contentOpacity }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-9xl tracking-[0.35em] text-white uppercase">
            TIMIAN
          </h1>

          <div className="flex items-center justify-center mt-4">
            <div className="w-32 h-0.5" style={{ backgroundColor: "#C9A961" }}></div>
            <h2 className="mx-4 text-2xl sm:text-3xl tracking-[0.35em] text-white uppercase">
              CHALET
            </h2>
            <div className="w-32 h-0.5" style={{ backgroundColor: "#C9A961" }}></div>
          </div>
        </motion.div>

        <motion.div style={{ opacity: contentOpacity }}>
          <ScrollCue />
        </motion.div>
      </motion.section>
  );
}

function VideoBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <video
        className="absolute inset-0 min-h-full min-w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/nature-optimized.jpg"
        style={{ minHeight: "100%", minWidth: "100%" }}
      >
        <source src="/Timian2.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}

function ScrollCue() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white text-xs flex flex-col items-center">
      <span className="tracking-wider uppercase font-semibold">DISCOVER</span>
      <span className="mt-2 inline-flex h-6 w-[2px] overflow-hidden rounded-full bg-white/30">
        <span className="animate-bounceSlow h-3 w-full bg-white" />
      </span>
    </div>
  );
}
