"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";

/** Visible height of the parallax strip (Tailwind height utility). */
const FULL_BLEED_PARALLAX_DIVIDER_HEIGHT_CLASS = "h-[80vh]";

/** Share of viewport height used as max upward travel (stronger, consistent across breakpoints). */
const PARALLAX_LIFT_VH_RATIO = 0.35;
const PARALLAX_LIFT_MIN_PX = 280;
const PARALLAX_LIFT_MAX_PX = 520;

export type FullBleedParallaxDividerImage = {
  url: string;
  alt: string;
};

export type FullBleedParallaxDividerProps = {
  gradientTop: string;
  gradientBottom: string;
  /** When `children` is not set, a single full-bleed image is rendered. */
  image?: FullBleedParallaxDividerImage;
  sizes?: string;
  /** For custom media (e.g. `ImageShow`); takes precedence over `image`. */
  children?: ReactNode;
  className?: string;
};

export default function FullBleedParallaxDivider({
  gradientTop,
  gradientBottom,
  image,
  sizes = "100vw",
  children,
  className = "",
}: FullBleedParallaxDividerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const maxLiftPxRef = useRef(220);

  function resolveMaxLiftPx() {
    const vh = window.innerHeight || 1;
    return Math.min(
      PARALLAX_LIFT_MAX_PX,
      Math.max(PARALLAX_LIFT_MIN_PX, Math.round(vh * PARALLAX_LIFT_VH_RATIO)),
    );
  }

  useEffect(() => {
    const dividerEl = rootRef.current;
    const imageLayerEl = layerRef.current;
    if (!dividerEl || !imageLayerEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      imageLayerEl.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let rafId = 0;

    const syncLayerBleed = () => {
      const maxLiftPx = resolveMaxLiftPx();
      maxLiftPxRef.current = maxLiftPx;
      // Bleed must be ≥ max upward translate or the clip reveals empty edges.
      imageLayerEl.style.top = `${-maxLiftPx}px`;
      imageLayerEl.style.bottom = `${-maxLiftPx}px`;
      imageLayerEl.style.left = "0";
      imageLayerEl.style.right = "0";
    };

    const updateParallax = () => {
      const rect = dividerEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const maxLiftPx = maxLiftPxRef.current;
      const translateYPx = -maxLiftPx * clampedProgress;

      imageLayerEl.style.transform = `translate3d(0, ${translateYPx}px, 0)`;
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    const onResize = () => {
      syncLayerBleed();
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    syncLayerBleed();
    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative ${FULL_BLEED_PARALLAX_DIVIDER_HEIGHT_CLASS} w-full overflow-hidden ${className}`.trim()}
    >
      <div
        ref={layerRef}
        className="absolute left-0 right-0 will-change-transform"
        style={{
          // Fallback until effect runs; replaced by syncLayerBleed to match parallax travel.
          top: "-220px",
          bottom: "-220px",
        }}
      >
        {children ??
          (image ? (
            <Image src={image.url} alt={image.alt} fill className="object-cover" sizes={sizes} />
          ) : null)}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${gradientTop} 0%, transparent 15%, transparent 85%, ${gradientBottom} 100%)`,
        }}
      />
    </div>
  );
}
