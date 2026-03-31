"use client";

import Image from "next/image";
import { animate } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

import {
  HERO_SCROLL_VIEWPORT_MULT_SUBPAGE,
  heroScrollStepPx,
} from "@/app/lib/heroScrollStep";
import { colors } from "@/app/theme/colors";
import { pageGutterX, pageShell } from "@/app/theme/pageShell";
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

  const firstActivities = data.activities.slice(0, 2);
  const remainingActivities = data.activities.slice(2);

  const renderActivity = (activity: ExperiencesPageData["activities"][number], index: number) => (
    <article key={activity._key} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-7 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl">
          <Image src={activity.image.url} alt={activity.image.alt} fill className="image-lift object-cover" />
        </div>
      </div>
      <div className={`lg:col-span-5 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
        <h3 className="mb-4 font-serif text-2xl sm:text-3xl" style={{ color: colors.accent }}>
          {activity.title}
        </h3>
        <p className="text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
          {activity.description}
        </p>
      </div>
    </article>
  );

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
        .image-lift {
          transform: scale(1.05);
          transition: transform 1.2s ease-out;
        }
        .reveal-section.revealed .image-lift {
          transform: scale(1);
        }
        .reveal-quote {
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 0.9s ease-out, opacity 0.6s ease-out;
        }
        .revealed .reveal-quote {
          opacity: 1;
          clip-path: inset(0 0 0 0);
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

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(0)}
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

      <section style={{ backgroundColor: colors.secondaryBg }}>
        <div
          ref={addRef(1)}
          className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
        >
          <div className="mb-16 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.activitiesEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.activitiesTitle}
            </h2>
          </div>

          <div className="space-y-16">
            {firstActivities.map((activity, index) => renderActivity(activity, index))}
          </div>
        </div>
      </section>

      <section data-theme="dark" style={{ backgroundColor: colors.accent }}>
        <div ref={addRef(2)} className={`mx-auto max-w-5xl ${pageGutterX} py-20 text-center sm:py-28`}>
          <blockquote className="reveal-quote font-serif text-2xl font-light italic leading-snug text-white sm:text-3xl lg:text-4xl">
            &ldquo;{data.closingQuote}&rdquo;
          </blockquote>
        </div>
      </section>

      {remainingActivities.length > 0 ? (
        <section style={{ backgroundColor: colors.secondaryBg }}>
          <div
            ref={addRef(3)}
            className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
          >
            <div className="space-y-16">
              {remainingActivities.map((activity, index) => renderActivity(activity, index + firstActivities.length))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
