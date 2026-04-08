"use client";

import Image from "next/image";
import { animate } from "framer-motion";
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import {
  HERO_SCROLL_VIEWPORT_MULT_SUBPAGE,
  heroScrollStepPx,
} from "@/app/lib/heroScrollStep";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";
import type { ExperiencesPageData } from "@/sanity/lib/queries";

const TRIGGER_DOWN_DISTANCE = 1;
const JUMP_DURATION = 1.15;

function useRevealOnScroll() {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          } else {
            entry.target.classList.remove("revealed");
          }
        });
      },
      { threshold: 0.15 },
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      refs.current[index] = el;
    },
    [],
  );

  return addRef;
}

function useScrollSnapJump() {
  const hasJumped = useRef(false);
  const isAnimating = useRef(false);
  const canTriggerJump = useRef(false);

  useEffect(() => {
    // Enable jump only when page is loaded at the very top.
    // This prevents auto-jump after refresh or restored mid-page positions.
    canTriggerJump.current = window.scrollY <= TRIGGER_DOWN_DISTANCE;

    const onScroll = () => {
      if (!canTriggerJump.current) {
        if (window.scrollY <= TRIGGER_DOWN_DISTANCE) {
          canTriggerJump.current = true;
        }
        return;
      }

      if (hasJumped.current || isAnimating.current) {
        return;
      }

      if (window.scrollY <= TRIGGER_DOWN_DISTANCE) {
        return;
      }

      isAnimating.current = true;
      hasJumped.current = true;

      const currentScroll = window.scrollY;
      const targetScroll =
        currentScroll + heroScrollStepPx(HERO_SCROLL_VIEWPORT_MULT_SUBPAGE);

      animate(currentScroll, targetScroll, {
        duration: JUMP_DURATION,
        ease: [0.25, 1, 0.5, 1],
        onUpdate: (value) => window.scrollTo(0, value),
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

export default function ExperiencesClientPage({ data }: { data: ExperiencesPageData }) {
  const addRef = useRevealOnScroll();
  useScrollSnapJump();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(data.activities.length > 1);
  const videoCopyByLanguage: Record<string, { title: string; description: string }> = {
    en: {
      title: "Savour the Journey",
      description: "Experience Timian through moving moments. A glimpse of the atmosphere that awaits.",
    },
    ro: {
      title: "Savurează călătoria",
      description: "Descoperă Timian prin momente autentice. O privire asupra atmosferei care te așteaptă.",
    },
    hu: {
      title: "Ízleld meg az utazást",
      description: "Éld át Timian hangulatát mozgó pillanatokon keresztül. Egy ízelítő abból, ami rád vár.",
    },
  };
  const videoCopy = videoCopyByLanguage[data.language] ?? videoCopyByLanguage.en;
  const videoSideImageLeft = data.experienceVideoSideImageLeft?.url ? data.experienceVideoSideImageLeft : null;
  const videoSideImageRight = data.experienceVideoSideImageRight?.url ? data.experienceVideoSideImageRight : null;

  const updateScrollControls = useCallback(() => {
    const element = carouselRef.current;
    if (!element) return;

    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    setCanScrollPrev(element.scrollLeft > 4);
    setCanScrollNext(element.scrollLeft < maxScrollLeft - 4);
  }, []);

  const scrollByCard = useCallback((direction: "prev" | "next") => {
    const element = carouselRef.current;
    if (!element) return;

    const firstCard = element.querySelector<HTMLElement>("[data-activity-card]");
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : element.clientWidth * 0.8;
    const gap = 24;
    const delta = direction === "next" ? cardWidth + gap : -(cardWidth + gap);

    element.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  const snapToNearestCard = useCallback(() => {
    const element = carouselRef.current;
    if (!element) return;

    const cards = Array.from(element.querySelectorAll<HTMLElement>("[data-activity-card]"));
    if (cards.length === 0) return;

    const currentScrollLeft = element.scrollLeft;
    let nearestOffset = cards[0].offsetLeft;
    let nearestDistance = Math.abs(nearestOffset - currentScrollLeft);

    for (let i = 1; i < cards.length; i += 1) {
      const offset = cards[i].offsetLeft;
      const distance = Math.abs(offset - currentScrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestOffset = offset;
      }
    }

    element.scrollTo({ left: nearestOffset, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;

    updateScrollControls();

    const onScroll = () => updateScrollControls();
    const onResize = () => updateScrollControls();

    element.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      element.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [updateScrollControls]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = carouselRef.current;
    if (!element) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = element.scrollLeft;
    element.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = carouselRef.current;
    if (!element || !isDraggingRef.current) return;

    event.preventDefault();
    const deltaX = event.clientX - dragStartXRef.current;
    element.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = carouselRef.current;
    if (!element) return;

    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
    snapToNearestCard();
    updateScrollControls();
  };

  return (
    <main className="w-full">
      <style>{`
        .reveal-section {
          opacity: 0;
          transform: translateY(38px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .reveal-section.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section data-theme="dark" className="relative h-screen w-full overflow-hidden">
        <Image src={data.heroImage.url} alt={data.heroImage.alt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-5xl font-light uppercase tracking-[0.2em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {data.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/85 sm:text-xl">{data.heroSubtitle}</p>
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.secondaryBg }}>
        <div
          ref={addRef(0)}
          className={`reveal-section ${pageShell} py-14 sm:py-16 lg:py-20`}
        >
          <div className="mb-8 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.activitiesEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-3xl lg:text-4xl" style={{ color: colors.accent }}>
              {data.activitiesTitle}
            </h2>
          </div>

          {data.activities.length > 0 ? (
            <div className="mx-auto max-w-[76rem]">
              <div className="rounded-[2rem] border border-white/25 bg-white/40 p-4 shadow-xl backdrop-blur-sm sm:p-6">
                <div
                  ref={carouselRef}
                  className="flex snap-x gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  style={{
                    touchAction: "pan-y",
                    cursor: isDragging ? "grabbing" : "grab",
                    scrollSnapType: isDragging ? "none" : "x mandatory",
                  }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onDragStart={(event) => event.preventDefault()}
                >
                  {data.activities.map((activity, index) => (
                    <article
                      key={activity._key}
                      data-activity-card
                      className="shrink-0 snap-start select-none rounded-2xl bg-white/75 p-4 shadow-md sm:w-[68%] lg:w-[24rem]"
                    >
                      <div className="relative mb-5 aspect-[16/11] w-full overflow-hidden rounded-l">
                        <Image
                          src={activity.image.url}
                          alt={activity.image.alt}
                          fill
                          className="object-cover"
                          priority={index === 0}
                          draggable={false}
                        />
                      </div>
                      <h3 className="mb-3 font-serif text-xl leading-tight sm:text-xl" style={{ color: colors.accent }}>
                        {activity.title}
                      </h3>
                      <p className="text-sm leading-relaxed sm:text-base" style={{ color: colors.textSecondary }}>
                        {activity.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              {data.activities.length > 1 ? (
                <div className="mt-4 flex justify-end gap-3 sm:mt-5">
                  <button
                    type="button"
                    onClick={() => scrollByCard("prev")}
                    disabled={!canScrollPrev}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-35 hover:bg-white/60"
                    style={{ borderColor: colors.accent, color: colors.accent }}
                    aria-label="Previous experiences"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollByCard("next")}
                    disabled={!canScrollNext}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-35 hover:bg-white/60"
                    style={{ borderColor: colors.accent, color: colors.accent }}
                    aria-label="Next experiences"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(1)}
          className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
        >
          <div className="mb-16 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.introEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.introTitle}
            </h2>
          </div>
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            {data.introParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {data.experienceVideoUrl ? (
        <section style={{ backgroundColor: colors.primaryBg }}>
          <div
            ref={addRef(2)}
            className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
          >
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
                {videoCopy.title}
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
                {videoCopy.description}
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
              <div className="grid items-center gap-5 md:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)_minmax(0,0.45fr)]">
                {videoSideImageLeft ? (
                  <div className="relative hidden aspect-[5/4] overflow-hidden rounded-[1.4rem] border border-white/30 shadow-xl md:block">
                    <Image
                      src={videoSideImageLeft.url}
                      alt={videoSideImageLeft.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}

                <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/35 bg-black/20 p-3 shadow-2xl sm:p-4">
                  <video
                    src={data.experienceVideoUrl}
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                    className="h-full w-full rounded-[1.2rem] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setIsVideoMuted((prev) => !prev)}
                    className="absolute bottom-7 right-7 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition hover:bg-black/75 group-hover:opacity-100"
                    aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                  >
                    {isVideoMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>

                {videoSideImageRight ? (
                  <div className="relative hidden aspect-[5/4] overflow-hidden rounded-[1.4rem] border border-white/30 shadow-xl md:block">
                    <Image
                      src={videoSideImageRight.url}
                      alt={videoSideImageRight.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}
              </div>

              {videoSideImageLeft || videoSideImageRight ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2 md:hidden">
                  {videoSideImageLeft ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-white/30 shadow-lg">
                      <Image
                        src={videoSideImageLeft.url}
                        alt={videoSideImageLeft.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  {videoSideImageRight ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-white/30 shadow-lg">
                      <Image
                        src={videoSideImageRight.url}
                        alt={videoSideImageRight.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
