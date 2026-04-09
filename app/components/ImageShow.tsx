"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { CmsImage } from "@/sanity/lib/queries";

type ImageShowProps = {
  images: CmsImage[];
  sizes?: string;
  aspectRatioClassName?: string;
  className?: string;
  frameClassName?: string;
  priorityFirstImage?: boolean;
};

export function mergeImageShowImages(primaryImage?: CmsImage | null, galleryImages?: CmsImage[] | null) {
  const validGallery = (galleryImages ?? []).filter((image) => image?.url);
  if (validGallery.length > 0) {
    return validGallery;
  }

  if (primaryImage?.url) {
    return [primaryImage];
  }

  return [];
}

export default function ImageShow({
  images,
  sizes = "100vw",
  aspectRatioClassName = "aspect-[4/3]",
  className = "",
  frameClassName = "",
  priorityFirstImage = true,
}: ImageShowProps) {
  const slides = useMemo(() => images.filter((image) => image?.url), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  if (slides.length === 0) {
    return null;
  }

  const hasControls = slides.length > 1;
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (!hasControls || shouldReduceMotion || hasUserInteracted) return;

    const timeoutId = window.setTimeout(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, hasControls, hasUserInteracted, shouldReduceMotion, slides.length]);

  const goToIndex = (nextIndex: number) => {
    if (!hasControls || nextIndex === activeIndex) return;
    setHasUserInteracted(true);
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const showNext = () => {
    if (!hasControls) return;
    setHasUserInteracted(true);
    setDirection(1);
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const showPrev = () => {
    if (!hasControls) return;
    setHasUserInteracted(true);
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  return (
    <div className={className}>
      <div className={`relative w-full overflow-hidden rounded-lg ${aspectRatioClassName} ${frameClassName}`}>
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={`${activeSlide.url}-${activeIndex}`}
            custom={direction}
            variants={{
              enter: (slideDirection: 1 | -1) => ({
                x: shouldReduceMotion ? 0 : slideDirection > 0 ? "100%" : "-100%",
                opacity: 1,
              }),
              center: { x: 0, opacity: 1 },
              exit: (slideDirection: 1 | -1) => ({
                x: shouldReduceMotion ? 0 : slideDirection > 0 ? "-100%" : "100%",
                opacity: 1,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: shouldReduceMotion ? 0 : 0.46, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.url}
              alt={activeSlide.alt || ""}
              fill
              sizes={sizes}
              className="object-cover"
              priority={priorityFirstImage && activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {hasControls ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={showPrev}
              className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/55"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={showNext}
              className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/55"
            >
              <ChevronRight size={18} />
            </button>
          </>
        ) : null}
      </div>

      {hasControls ? (
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${slide.url}-${index}`}
                type="button"
                aria-label={`Go to image ${index + 1}`}
                aria-current={isActive}
                onClick={() => goToIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  isActive ? "bg-black/70" : "bg-black/30 hover:bg-black/45"
                }`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
