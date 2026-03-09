"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { localizeHref, type SiteLocale } from "@/app/lib/locale";
import { colors } from "@/app/theme/colors";
import type { HomePageData } from "@/sanity/lib/queries";

import Hero from "./Hero";
import LoadingState from "./LoadingState";

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

function SectionLink({ href, label, color }: { href: string; label: string; color: string }) {
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

function SectionDivider({
  image,
  bgTop,
  bgBottom,
}: {
  image: { url: string; alt: string };
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
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, 224px"
          />
          <div className="divider-veil absolute inset-0 rounded-lg" style={{ backgroundColor: bgTop }} />
        </div>
      </div>
    </div>
  );
}

export default function ClientPage({
  locale,
  data,
  loadingBrand,
  loadingText,
}: {
  locale: SiteLocale;
  data: HomePageData;
  loadingBrand: string;
  loadingText: string;
}) {
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

      <LoadingState brand={loadingBrand} text={loadingText} />
      <section data-theme="dark">
        <Hero data={data} />
      </section>

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
            <div className="flex-1 min-w-0">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight mb-3"
                style={{ color: colors.accent }}
              >
                {data.welcomeTitle}
              </h2>
              <div className="w-16 h-0.5 mb-8" style={{ backgroundColor: colors.cta }} />
              <div className="space-y-5">
                {data.welcomeParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base sm:text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex-1 min-w-0 w-full lg:w-auto">
              <div className="relative w-full aspect-[3/4] max-h-[600px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={data.welcomeImage.url}
                  alt={data.welcomeImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-theme="light"
        className="py-16 px-10 sm:px-12 lg:px-16"
        style={{
          background: `linear-gradient(to bottom, ${colors.primaryBg}, ${colors.secondaryBg})`,
        }}
      >
        <div
          ref={addRef(1)}
          className="reveal-section max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {data.stats.map((stat) => (
            <div key={`${stat.value}-${stat.label}`} className="text-center">
              <div
                className="w-14 h-14 mx-auto mb-4 border-2 flex items-center justify-center"
                style={{ borderColor: colors.cta }}
              >
                <div className="w-10 h-10 border" style={{ borderColor: colors.cta }} />
              </div>
              <div className="text-3xl sm:text-4xl font-light mb-2" style={{ color: colors.accent }}>
                {stat.value}
              </div>
              <div className="text-xs font-medium uppercase tracking-widest" style={{ color: colors.textSecondary }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-theme="light" style={{ backgroundColor: colors.secondaryBg }}>
        <div
          ref={addRef(2)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-14 sm:py-16"
        >
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 min-w-0 w-full lg:w-auto">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={data.hotelSection.image.url}
                  alt={data.hotelSection.image.alt}
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
                {data.hotelSection.eyebrow}
              </span>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-6 whitespace-pre-line"
                style={{ color: colors.accent }}
              >
                {data.hotelSection.title}
              </h3>
              <div className="w-12 h-[1px] mb-6" style={{ backgroundColor: colors.cta }} />
              <p className="text-base sm:text-lg leading-relaxed mb-2" style={{ color: colors.textSecondary }}>
                {data.hotelSection.description}
              </p>
              <SectionLink
                href={localizeHref(locale, data.hotelSection.link.href)}
                label={data.hotelSection.link.label}
                color={colors.cta}
              />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider
        image={data.roomsDividerImage}
        bgTop={colors.secondaryBg}
        bgBottom={colors.primaryBg}
      />

      <section data-theme="light" style={{ backgroundColor: colors.primaryBg }}>
        <div
          ref={addRef(3)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-24"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 min-w-0 reveal-section-delay">
              <span
                className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                style={{ color: colors.cta }}
              >
                {data.roomsSection.eyebrow}
              </span>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-6 whitespace-pre-line"
                style={{ color: colors.accent }}
              >
                {data.roomsSection.title}
              </h3>
              <div className="w-12 h-[1px] mb-6" style={{ backgroundColor: colors.cta }} />
              <p className="text-base sm:text-lg leading-relaxed mb-2" style={{ color: colors.textSecondary }}>
                {data.roomsSection.description}
              </p>
              <SectionLink
                href={localizeHref(locale, data.roomsSection.link.href)}
                label={data.roomsSection.link.label}
                color={colors.cta}
              />
            </div>

            <div className="flex-1 min-w-0 w-full lg:w-auto">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={data.roomsSection.image.url}
                  alt={data.roomsSection.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider
        image={data.culinaryDividerImage}
        bgTop={colors.primaryBg}
        bgBottom={colors.accent}
      />

      <section data-theme="dark" style={{ backgroundColor: colors.accent }}>
        <div
          ref={addRef(4)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-24"
        >
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 min-w-0 w-full lg:w-auto">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={data.culinarySection.image.url}
                  alt={data.culinarySection.image.alt}
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
                {data.culinarySection.eyebrow}
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-6 whitespace-pre-line text-white">
                {data.culinarySection.title}
              </h3>
              <div className="w-12 h-[1px] mb-6" style={{ backgroundColor: colors.cta }} />
              <p className="text-base sm:text-lg leading-relaxed mb-2 text-white/80">
                {data.culinarySection.description}
              </p>
              <SectionLink
                href={localizeHref(locale, data.culinarySection.link.href)}
                label={data.culinarySection.link.label}
                color={colors.cta}
              />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider
        image={data.experiencesDividerImage}
        bgTop={colors.accent}
        bgBottom={colors.secondaryBg}
      />

      <section data-theme="light" style={{ backgroundColor: colors.secondaryBg }}>
        <div
          ref={addRef(5)}
          className="reveal-section max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 py-20 sm:py-24"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 min-w-0 reveal-section-delay">
              <span
                className="block text-xs uppercase tracking-[0.3em] mb-4 font-medium"
                style={{ color: colors.cta }}
              >
                {data.experiencesSection.eyebrow}
              </span>
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-6 whitespace-pre-line"
                style={{ color: colors.accent }}
              >
                {data.experiencesSection.title}
              </h3>
              <div className="w-12 h-[1px] mb-6" style={{ backgroundColor: colors.cta }} />
              <p className="text-base sm:text-lg leading-relaxed mb-2" style={{ color: colors.textSecondary }}>
                {data.experiencesSection.description}
              </p>
              <SectionLink
                href={localizeHref(locale, data.experiencesSection.link.href)}
                label={data.experiencesSection.link.label}
                color={colors.cta}
              />
            </div>

            <div className="flex-1 min-w-0 w-full lg:w-auto">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={data.experiencesSection.image.url}
                  alt={data.experiencesSection.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
