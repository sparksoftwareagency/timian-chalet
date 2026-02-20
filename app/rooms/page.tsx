"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "../i18n/LanguageContext";
import { tr } from "../i18n/translations";
import { colors } from "../theme/colors";
import { ROOMS, roomImage } from "./roomData";

function useRevealOnScroll() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      refs.current[index] = el;
    },
    []
  );

  return addRef;
}

export default function RoomsPage() {
  const t = useT();
  const addRef = useRevealOnScroll();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

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
        .reveal-section-delay {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s;
        }
        .reveal-section.revealed .reveal-section-delay {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════ */}
      <section
        data-theme="dark"
        className="relative w-full min-h-[70vh] flex items-center justify-center"
        style={{ backgroundColor: colors.textPrimary }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32 sm:py-40">
          <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/rooms/rooms-thumbnail.jpg"
              alt="Rooms & Suites"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="mb-6">
                <div
                  className="w-3 h-3 border rotate-45 mx-auto"
                  style={{ borderColor: colors.cta }}
                />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-wide">
                {t(tr.rooms.overviewTitle)}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/80 font-light max-w-2xl">
                {t(tr.rooms.overviewSubtitle)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ROOMS GRID
          ═══════════════════════════════════════════════════ */}
      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div className="max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {ROOMS.map((room, i) => (
              <div
                key={room.slug}
                ref={addRef(i)}
                className="reveal-section"
              >
                <Link
                  href={`/rooms/${room.slug}`}
                  className="group block"
                >
                  <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={roomImage(room.slug, 1)}
                      alt={t(room.name)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl sm:text-3xl font-serif text-white mb-1">
                        {t(room.name)}
                      </h3>
                      <p className="text-sm text-white/70 italic">
                        {t(room.tagline)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
