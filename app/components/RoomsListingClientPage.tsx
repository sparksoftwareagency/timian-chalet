"use client";

import Image from "next/image";
import Link from "next/link";
import { animate } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

import { localizeHref, type SiteLocale } from "@/app/lib/locale";
import {
  HERO_SCROLL_VIEWPORT_MULT_SUBPAGE,
  heroScrollStepPx,
} from "@/app/lib/heroScrollStep";
import { colors } from "@/app/theme/colors";
import { pageShell } from "@/app/theme/pageShell";
import type { RoomCardData, RoomsPageData } from "@/sanity/lib/queries";

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

type Props = {
  lang: SiteLocale;
  page: RoomsPageData;
  rooms: RoomCardData[];
};

export default function RoomsListingClientPage({ lang, page, rooms }: Props) {
  const addRef = useRevealOnScroll();
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
        .hero-image-enter {
          opacity: 0;
          transform: scale(1.05);
          animation: hero-enter 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes hero-enter {
          0% {
            opacity: 0;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
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
          .hero-image-enter {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section data-theme="dark" className="relative h-screen w-full overflow-hidden">
        <Image data-theme="dark"
          src={page.heroImage.url}
          alt={page.heroImage.alt}
          fill
          priority
          className="hero-image-enter object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {page.heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-light text-white/80 sm:text-lg">
            {page.heroSubtitle}
          </p>
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(0)}
          className={`reveal-section ${pageShell} py-20 sm:py-28`}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {rooms.map((room) => (
              <Link
                key={room.slug}
                href={localizeHref(lang, `/rooms/${room.slug}`)}
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-lg">
                  <Image data-theme="dark"
                    src={room.heroImage.url}
                    alt={room.heroImage.alt}
                    fill
                    className="flash-on-reveal object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="mb-1 font-serif text-2xl text-white sm:text-3xl">
                      {room.title}
                    </h3>
                    <p className="text-sm italic text-white/70">{room.tagline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
