"use client";

import { animate } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import SanityImage from "@/app/components/SanityImage";
import {
  HERO_SCROLL_VIEWPORT_MULT_SUBPAGE,
  heroScrollStepPx,
} from "@/app/lib/heroScrollStep";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";
import type { ExperiencesPageData } from "@/sanity/lib/queries";

const TRIGGER_DOWN_DISTANCE = 1;
const JUMP_DURATION = 1.15;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

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
  const activitiesChapterRef = useRef<HTMLElement | null>(null);
  const activitiesTrackViewportRef = useRef<HTMLDivElement | null>(null);
  const activitiesTrackRef = useRef<HTMLDivElement | null>(null);
  const activitiesAnimationFrameRef = useRef<number | null>(null);
  const activitiesIsDraggingRef = useRef(false);
  const activitiesDragStartXRef = useRef(0);
  const activitiesDragStartProgressRef = useRef(0);
  const activitiesTargetProgressRef = useRef(0);
  const activitiesDisplayProgressRef = useRef(0);
  const [activitiesProgress, setActivitiesProgress] = useState(0);
  const [maxTrackTranslate, setMaxTrackTranslate] = useState(0);
  const [isDraggingActivities, setIsDraggingActivities] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
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
  const experienceDividerImages = data.experienceDividerImages.filter((image) => image?.url).slice(0, 4);
  const moreExperiences = data.moreExperiences.filter((experience) => experience.image?.url);
  const nearbyAttractions = data.nearbyAttractions.filter((experience) => experience.image?.url);
  const chapterHeightVh = Math.max(data.activities.length * 90, 320);
  const revealWindow = 0.2;
  const chapterRevealProgress = clamp(activitiesProgress / revealWindow, 0, 1);
  const chapterCardsProgress = clamp((activitiesProgress - revealWindow) / (1 - revealWindow), 0, 1);
  const chapterTranslateX = -(maxTrackTranslate * chapterCardsProgress);

  const updateTrackMetrics = useCallback(() => {
    const viewport = activitiesTrackViewportRef.current;
    const track = activitiesTrackRef.current;
    if (!viewport || !track) return;

    const maxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0);
    setMaxTrackTranslate(maxTranslate);
  }, []);

  useEffect(() => {
    updateTrackMetrics();
    const onResize = () => updateTrackMetrics();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateTrackMetrics]);

  useEffect(() => {
    const onScrollOrResize = () => {
      const chapter = activitiesChapterRef.current;
      if (!chapter) return;

      const sectionHeight = chapter.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollWindow = Math.max(sectionHeight - viewportHeight, 1);
      const sectionTopInViewport = chapter.getBoundingClientRect().top;
      const progressedPixels = clamp(-sectionTopInViewport, 0, scrollWindow);
      activitiesTargetProgressRef.current = clamp(progressedPixels / scrollWindow, 0, 1);

      if (activitiesAnimationFrameRef.current !== null) return;

      const step = () => {
        const target = activitiesTargetProgressRef.current;
        const current = activitiesDisplayProgressRef.current;
        const next = current + (target - current) * 0.18;

        if (Math.abs(target - next) < 0.001) {
          activitiesDisplayProgressRef.current = target;
          setActivitiesProgress(target);
          activitiesAnimationFrameRef.current = null;
          return;
        }

        activitiesDisplayProgressRef.current = next;
        setActivitiesProgress(next);
        activitiesAnimationFrameRef.current = window.requestAnimationFrame(step);
      };

      activitiesAnimationFrameRef.current = window.requestAnimationFrame(step);
    };
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    onScrollOrResize();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (activitiesAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(activitiesAnimationFrameRef.current);
        activitiesAnimationFrameRef.current = null;
      }
    };
  }, []);

  const scrollActivitiesChapterToProgress = useCallback((progress: number) => {
    const chapter = activitiesChapterRef.current;
    if (!chapter) return;

    const viewportHeight = window.innerHeight;
    const scrollWindow = Math.max(chapter.offsetHeight - viewportHeight, 1);
    const chapterTop = window.scrollY + chapter.getBoundingClientRect().top;
    const clampedProgress = clamp(progress, 0, 1);
    const nextScrollTop = chapterTop + scrollWindow * clampedProgress;

    activitiesTargetProgressRef.current = clampedProgress;
    activitiesDisplayProgressRef.current = clampedProgress;
    setActivitiesProgress(clampedProgress);
    window.scrollTo({ top: nextScrollTop, behavior: "auto" });
  }, []);

  const handleActivitiesPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (maxTrackTranslate <= 0) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      activitiesIsDraggingRef.current = true;
      setIsDraggingActivities(true);
      activitiesDragStartXRef.current = event.clientX;
      activitiesDragStartProgressRef.current = activitiesProgress;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.preventDefault();
    },
    [activitiesProgress, maxTrackTranslate],
  );

  const handleActivitiesPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!activitiesIsDraggingRef.current || maxTrackTranslate <= 0) return;

      const deltaX = event.clientX - activitiesDragStartXRef.current;
      const startCardsProgress = clamp(
        (activitiesDragStartProgressRef.current - revealWindow) / (1 - revealWindow),
        0,
        1,
      );
      const nextCardsProgress = clamp(startCardsProgress - deltaX / maxTrackTranslate, 0, 1);
      const nextProgress = revealWindow + nextCardsProgress * (1 - revealWindow);
      scrollActivitiesChapterToProgress(nextProgress);
      event.preventDefault();
    },
    [maxTrackTranslate, revealWindow, scrollActivitiesChapterToProgress],
  );

  const handleActivitiesPointerEnd = useCallback(() => {
    activitiesIsDraggingRef.current = false;
    setIsDraggingActivities(false);
  }, []);

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
        <SanityImage data-theme="dark" image={data.heroImage} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-5xl font-light uppercase tracking-[0.2em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {data.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/85 sm:text-xl">{data.heroSubtitle}</p>
        </div>
      </section>

      <section
        ref={activitiesChapterRef}
        data-theme="light"
        style={{ backgroundColor: colors.primaryBg, height: `${chapterHeightVh}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className={`${pageShell} flex h-full flex-col justify-center py-12 sm:py-16`}>
            <div className="mb-8 text-center sm:mb-10">
              <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
                {data.activitiesEyebrow}
              </span>
              <h2 className="whitespace-pre-line font-serif text-3xl sm:text-3xl lg:text-4xl" style={{ color: colors.accent }}>
                {data.activitiesTitle}
              </h2>
            </div>

            {data.activities.length > 0 ? (
              <div className="mx-auto w-full max-w-[88rem]">
                <div
                  className="rounded-[2rem] border border-white/25 bg-white/40 p-4 shadow-xl backdrop-blur-sm sm:p-6"
                  style={{
                    transform: `scale(${0.92 + chapterRevealProgress * 0.08})`,
                    opacity: 0.72 + chapterRevealProgress * 0.28,
                  }}
                >
                  <div
                    ref={activitiesTrackViewportRef}
                    className={`overflow-hidden ${isDraggingActivities ? "cursor-grabbing select-none" : "cursor-grab"}`}
                    onPointerDown={handleActivitiesPointerDown}
                    onPointerMove={handleActivitiesPointerMove}
                    onPointerUp={handleActivitiesPointerEnd}
                    onPointerCancel={handleActivitiesPointerEnd}
                    onLostPointerCapture={handleActivitiesPointerEnd}
                  >
                    <div
                      ref={activitiesTrackRef}
                      className="flex gap-6 will-change-transform"
                      style={{ transform: `translate3d(${chapterTranslateX}px, 0, 0)` }}
                    >
                      {data.activities.map((activity, index) => (
                        <article
                          key={activity._key}
                          data-activity-card
                          className="shrink-0 rounded-2xl bg-white/75 p-4 shadow-md sm:w-[68%] lg:w-[24rem]"
                        >
                          <div className="relative mb-5 aspect-[16/11] w-full overflow-hidden rounded-l">
                            <SanityImage
                              data-theme="dark"
                              image={activity.image}
                              fill
                              className="object-cover"
                              priority={index === 0}
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
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section data-theme="dark" style={{ backgroundColor: colors.primaryBg }}>
        <div className={`${pageShell} py-20 sm:py-24 lg:py-28`}>
          <blockquote
            className="mx-auto max-w-4xl text-center font-serif text-2xl font-light italic leading-snug sm:text-3xl lg:text-4xl"
            style={{ color: colors.accent }}
          >
            &ldquo;{data.closingQuote}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* {data.experienceVideoUrl ? (
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
                    <SanityImage
                      image={videoSideImageLeft}
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
                    <SanityImage
                      image={videoSideImageRight}
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
                      <SanityImage
                        image={videoSideImageLeft}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  {videoSideImageRight ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] border border-white/30 shadow-lg">
                      <SanityImage
                        image={videoSideImageRight}
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
      ) : null} */}

      {/* <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
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
      </section> */}

      {experienceDividerImages.length === 4 ? (
        <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
          <div className="w-full pb-8 sm:pb-12">
            <div className="grid grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {experienceDividerImages.map((image, index) => (
                <div key={`${image.url}-${index}`} className="relative aspect-[3/4] w-full overflow-hidden">
                  <SanityImage data-theme="dark" image={image} fill className="object-cover" sizes="20vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        id="more-experiences"
        data-theme="light"
        style={{ backgroundColor: colors.primaryBg }}
        className="scroll-mt-24"
      >
        <div className={`${pageShell} py-20 sm:py-24 lg:py-28`}>
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.moreExperiencesTitle}
            </h2>
          </div>
          <div className="grid gap-x-6 gap-y-36 sm:grid-cols-2 lg:grid-cols-3">
            {moreExperiences.map((experience, index) => (
              <article
                key={experience._key}
                className={`mx-auto w-full max-w-[19rem] overflow-hidden ${
                  index === moreExperiences.length - 1 && moreExperiences.length % 3 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <SanityImage
                    data-theme="dark"
                    image={experience.image}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mt-4 font-serif text-xl leading-tight sm:text-2xl" style={{ color: colors.accent }}>
                  {experience.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                  {experience.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {nearbyAttractions.length > 0 ? (
        <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
          <div
            className={`${pageShell} py-20 sm:py-24 lg:py-28`}
          >
            <div className="mb-14 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
                {data.nearbyAttractionsTitle}
              </h2>
            </div>

            <div className="space-y-12 sm:space-y-14">
              {nearbyAttractions.map((item, index) => {
                const isImageLeft = index % 2 === 0;

                return (
                  <article
                    key={item._key}
                    className={`flex flex-col overflow-hidden rounded-2xl border border-white/35 bg-white/55 shadow-lg ${
                      isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div className="w-full lg:w-1/2">
                      <div className="relative aspect-[3/4] w-full">
                        <SanityImage
                          data-theme="dark"
                          image={item.image}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>

                    <div className="flex min-h-[18rem] w-full items-center justify-center p-8 text-center sm:p-10 lg:w-1/2 lg:p-12">
                      <div className="max-w-xl">
                        <h3 className="font-serif text-2xl leading-tight sm:text-3xl" style={{ color: colors.accent }}>
                          {item.title}
                        </h3>
                        <p className="mx-auto mt-4 text-sm leading-relaxed sm:text-base" style={{ color: colors.textSecondary }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
