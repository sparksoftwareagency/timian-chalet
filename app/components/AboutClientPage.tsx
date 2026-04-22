"use client";

import Image from "next/image";
import Link from "next/link";
import { animate } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

import FullBleedParallaxDivider from "@/app/components/FullBleedParallaxDivider";
import {
  HERO_SCROLL_VIEWPORT_MULT_SUBPAGE,
  heroScrollStepPx,
} from "@/app/lib/heroScrollStep";
import { localizeHref, type SiteLocale } from "@/app/lib/locale";
import { colors } from "@/app/theme/colors";
import { pageGutterX, pageShell } from "@/app/theme/pageShell";
import type { AboutPageData } from "@/sanity/lib/queries";

const TRIGGER_DOWN_DISTANCE = 1;
const JUMP_DURATION = 1.9;

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
    // Only enable the jump behavior when the user is at the very top.
    // This prevents auto-jump after refresh/restore in the middle of the page.
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
        ease: [0.22, 1, 0.36, 1],
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

export default function AboutClientPage({
  lang,
  data,
}: {
  lang: SiteLocale;
  data: AboutPageData;
}) {
  const addRef = useRevealOnScroll();
  const animalsBreakImages = data.animalsBreakImages.filter((image) => image?.url).slice(0, 5);

  useScrollSnapJump();

  return (
    <main className="w-full">
      <style>{`
        .reveal-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .reveal-section.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .flash-on-reveal {
          filter: brightness(0.9) saturate(0.92);
        }
        .reveal-section.revealed .flash-on-reveal {
          animation: section-flash 0.9s ease-out both;
        }
        .reveal-quote {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.85s ease-out, transform 0.85s ease-out;
        }
        .revealed .reveal-quote {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes section-flash {
          0% {
            filter: brightness(0.95) saturate(0.9);
          }
          45% {
            filter: brightness(1.18) saturate(1.1);
          }
          100% {
            filter: brightness(1) saturate(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-quote {
            transform: translateY(0);
            transition: opacity 0.35s ease-out;
          }
        }
      `}</style>

      <section data-theme="dark" className="relative h-screen w-full overflow-hidden">
        <Image data-theme="dark" src={data.heroImage.url} alt={data.heroImage.alt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-5xl font-light uppercase tracking-[0.2em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {data.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/80 sm:text-xl">
            {data.heroSubtitle}
          </p>
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(0)}
          className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
        >
          <div className="mb-16 text-center flash-on-reveal">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.originEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.originTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="flash-on-reveal mx-auto max-w-2xl space-y-6 text-center lg:col-span-5">
              {data.originParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl">
                <Image data-theme="dark"
                  src={data.originPrimaryImage.url}
                  alt={data.originPrimaryImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {animalsBreakImages.length === 5 ? (
        <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
          <div className="w-full pb-8 sm:pb-12">
            <div className="grid grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {animalsBreakImages.map((image, index) => (
                <div key={`${image.url}-${index}`} className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image data-theme="dark" src={image.url} alt={image.alt} fill className="object-cover" sizes="20vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(1)}
          className={`reveal-section ${pageShell} grid grid-cols-1 items-center gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-14 lg:py-32`}
        >
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="relative aspect-[3/4] w-full max-h-[550px] overflow-hidden rounded-lg shadow-xl">
              <Image data-theme="dark"
                src={data.transformImage.url}
                alt={data.transformImage.alt}
                fill
                className="flash-on-reveal object-cover"
              />
            </div>
          </div>
          <div className="flash-on-reveal order-1 mx-auto max-w-3xl text-center lg:order-2 lg:col-span-6">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.transformEyebrow}
            </span>
            <h2 className="mb-6 whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.transformTitle}
            </h2>
            {data.transformParagraphs.map((paragraph) => (
              <p key={paragraph} className="mb-4 text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section data-theme="dark" style={{ backgroundColor: colors.primaryBg }}>
        <div ref={addRef(2)} className={`mx-auto max-w-4xl ${pageGutterX} py-20 sm:py-28`}>
          <blockquote
            className="reveal-quote text-center font-serif text-2xl font-light italic leading-snug sm:text-3xl lg:text-4xl"
            style={{ color: colors.accent }}
          >
            &ldquo;{data.quote}&rdquo;
          </blockquote>
        </div>
      </section>

      <section style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(3)}
          className={`reveal-section ${pageShell} py-20 sm:py-28 lg:py-32`}
        >
          <div className="mb-16 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.farmEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.farmTitle}
            </h2>
          </div>
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.farmImages.map((image) => (
              <div key={image.url} className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                <Image data-theme="dark" src={image.url} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          {data.farmParagraphs.map((paragraph) => (
            <p key={paragraph} className="mx-auto mb-6 max-w-3xl text-center text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: colors.primaryBg }}>
        <FullBleedParallaxDivider height="h-[95vh]" image={data.roomsImage} />
        <div className={`${pageShell} py-20 sm:py-28 lg:py-32`}>
          <div className="mb-6 text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em]" style={{ color: colors.cta }}>
              {data.roomsEyebrow}
            </span>
            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl lg:text-5xl" style={{ color: colors.accent }}>
              {data.roomsTitle}
            </h2>
            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed sm:text-lg" style={{ color: colors.textSecondary }}>
              {data.roomsIntro}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {data.roomFloors.map((floor) => (
              <div key={floor.title} className="rounded-lg p-8 text-center" style={{ backgroundColor: colors.primaryBg }}>
                <h3 className="mb-4 font-serif text-lg sm:text-xl" style={{ color: colors.accent }}>
                  {floor.title}
                </h3>
                <p className="text-sm leading-relaxed sm:text-base" style={{ color: colors.textSecondary }}>
                  {floor.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={localizeHref(lang, data.roomsLink.href)} className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em]" style={{ color: colors.cta }}>
              {data.roomsLink.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
