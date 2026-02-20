"use client";

import { useEffect, useRef, useCallback } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useT } from "../../i18n/LanguageContext";
import { tr } from "../../i18n/translations";
import { colors } from "../../theme/colors";
import { getRoomBySlug, roomImage, ROOMS } from "../roomData";

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
      { threshold: 0.15 }
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

function SectionDivider({
  src,
  bgTop,
  bgBottom,
}: {
  src: string;
  bgTop: string;
  bgBottom: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("divider-revealed");
        } else {
          el.classList.remove("divider-revealed");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative h-32 sm:h-40 md:h-48 overflow-visible"
      style={{
        background: `linear-gradient(to bottom, ${bgTop} 50%, ${bgBottom} 50%)`,
      }}
    >
      <div
        ref={containerRef}
        className="absolute top-1/2 -translate-y-1/2 right-10 sm:right-16 lg:right-24"
      >
        <div className="relative mr-16 w-36 h-24 sm:w-48 sm:h-32 md:w-56 md:h-36 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, 224px"
          />
          <div
            className="divider-veil absolute inset-0 rounded-lg"
            style={{ backgroundColor: bgTop }}
          />
        </div>
      </div>
    </div>
  );
}

function SectionLink({
  href,
  label,
  color,
}: {
  href: string;
  label: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium group mt-6 transition-opacity hover:opacity-80"
      style={{ color }}
    >
      {label}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:translate-x-1"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export default function RoomPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const room = getRoomBySlug(slug);
  const t = useT();
  const addRef = useRevealOnScroll();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  if (!room) {
    notFound();
  }

  const currentIndex = ROOMS.findIndex((r) => r.slug === slug);
  const nextRoom = ROOMS[(currentIndex + 1) % ROOMS.length];
  const prevRoom = ROOMS[(currentIndex - 1 + ROOMS.length) % ROOMS.length];

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
        .divider-veil {
          transform-origin: top center;
          transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scaleY(1);
        }
        .divider-revealed .divider-veil {
          transform: scaleY(0);
          transform-origin: bottom center;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════ */}
      <section
        data-theme="dark"
        className="relative w-full min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.textPrimary }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32 sm:py-40">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={roomImage(slug, 1)}
              alt={t(room.name)}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="mb-6">
                <div
                  className="w-3 h-3 border rotate-45 mx-auto"
                  style={{ borderColor: colors.cta }}
                />
              </div>
              <span
                className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                style={{ color: colors.cta }}
              >
                {t(tr.rooms.label)}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-wide">
                {t(room.name)}
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-white/80 font-light italic">
                {t(room.tagline)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <SectionDivider
        src={roomImage(slug, 2)}
        bgTop={colors.textPrimary}
        bgBottom={colors.primaryBg}
      />

      {/* ═══════════════════════════════════════════════════
          INTRODUCTION SECTION
          ═══════════════════════════════════════════════════ */}
      <section
        data-theme="light"
        className="w-full"
        style={{ backgroundColor: colors.primaryBg }}
      >
        <div
          ref={addRef(0)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-28 lg:py-32"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 min-w-0 reveal-section-delay">
              <span
                className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                style={{ color: colors.cta }}
              >
                {t(tr.rooms.label)}
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight mb-3"
                style={{ color: colors.accent }}
              >
                {t(room.name)}
              </h2>
              <div className="w-16 h-0.5 mb-8" style={{ backgroundColor: colors.cta }} />
              <p
                className="text-lg sm:text-xl font-serif italic mb-6"
                style={{ color: colors.accent }}
              >
                {t(room.tagline)}
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                {t(room.desc)}
              </p>
              <SectionLink
                href="#book"
                label={t(tr.rooms.bookThisRoom)}
                color={colors.cta}
              />
            </div>

            <div className="flex-1 min-w-0 w-full lg:w-auto">
              <div className="relative w-full aspect-[3/4] max-h-[600px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={roomImage(slug, 2)}
                  alt={t(room.name)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <SectionDivider
        src={roomImage(slug, 3)}
        bgTop={colors.primaryBg}
        bgBottom={colors.secondaryBg}
      />

      {/* ═══════════════════════════════════════════════════
          GALLERY SECTION
          ═══════════════════════════════════════════════════ */}
      <section
        data-theme="light"
        style={{ backgroundColor: colors.secondaryBg }}
      >
        <div
          ref={addRef(1)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-24"
        >
          <div className="text-center mb-12">
            <span
              className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
              style={{ color: colors.cta }}
            >
              {t(tr.rooms.discoverSpace)}
            </span>
            <h3
              className="text-3xl sm:text-4xl font-serif"
              style={{ color: colors.accent }}
            >
              {t(tr.rooms.galleryTitle)}
            </h3>
            <div
              className="w-12 h-[1px] mx-auto mt-6"
              style={{ backgroundColor: colors.cta }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
            <div className="md:col-span-7">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={roomImage(slug, 3)}
                  alt={`${t(room.name)} detail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={roomImage(slug, 4)}
                  alt={`${t(room.name)} detail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative w-full aspect-[1/1] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={roomImage(slug, 5)}
                  alt={`${t(room.name)} detail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={roomImage(slug, 6)}
                  alt={`${t(room.name)} detail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <SectionDivider
        src={roomImage(slug, 7)}
        bgTop={colors.secondaryBg}
        bgBottom={colors.accent}
      />

      {/* ═══════════════════════════════════════════════════
          FEATURE SECTION (dark)
          ═══════════════════════════════════════════════════ */}
      <section data-theme="dark" style={{ backgroundColor: colors.accent }}>
        <div
          ref={addRef(2)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-24"
        >
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 min-w-0 w-full lg:w-auto">
              <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={roomImage(slug, 7)}
                  alt={`${t(room.name)} feature`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0 reveal-section-delay">
              <span
                className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                style={{ color: colors.cta }}
              >
                {t(tr.rooms.label)}
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-6 text-white">
                {t(room.name)}
              </h3>
              <div
                className="w-12 h-[1px] mb-6"
                style={{ backgroundColor: colors.cta }}
              />
              <p className="text-base sm:text-lg leading-relaxed mb-2 text-white/80">
                {t(room.tagline)}
              </p>
              <SectionLink
                href="#book"
                label={t(tr.rooms.bookThisRoom)}
                color={colors.cta}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <SectionDivider
        src={roomImage(slug, 4)}
        bgTop={colors.accent}
        bgBottom={colors.primaryBg}
      />

      {/* ═══════════════════════════════════════════════════
          NAVIGATION SECTION
          ═══════════════════════════════════════════════════ */}
      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(3)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-24"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <Link
              href={`/rooms/${prevRoom.slug}`}
              className="group flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.cta}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:-translate-x-1"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span
                className="text-sm uppercase tracking-[0.2em] font-medium"
                style={{ color: colors.cta }}
              >
                {t(prevRoom.name)}
              </span>
            </Link>

            <Link
              href="/rooms"
              className="text-sm uppercase tracking-[0.2em] font-medium transition-opacity hover:opacity-80"
              style={{ color: colors.textSecondary }}
            >
              {t(tr.rooms.backToRooms)}
            </Link>

            <Link
              href={`/rooms/${nextRoom.slug}`}
              className="group flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <span
                className="text-sm uppercase tracking-[0.2em] font-medium"
                style={{ color: colors.cta }}
              >
                {t(nextRoom.name)}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.cta}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
